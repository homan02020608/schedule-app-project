// pages/api/auth/line-callback.js
import { doc, setDoc } from 'firebase/firestore';
import { getAuth as getClerkAuth } from '@clerk/nextjs/server'; // Clerkのサーバーサイド認証
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../firebase/firebase';

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  const { code, state, error, error_description } = req.query;

  // 1. エラーハンドリング
  if (error) {
    console.error('LINE Login Error (callback):', error, error_description);
    return res.redirect('/settings?lineError=true'); // エラーページにリダイレクト
  }


  const [clerkUserIdFromState, randomStringFromState] = String(state).split('-');
  if (!clerkUserIdFromState) {
    console.error('State parameter is invalid or missing Clerk User ID.');
    return res.redirect('/settings?lineError=true&reason=invalid_state');
  }

  try {
    const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type : 'authorization_code',
        code : `${code}`,
        redirect_uri : `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/line-callback`,
        client_id : `${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID}`,
        client_secret : `${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_SECRET}`
      }),
    });
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('LINE Token Exchange Error:', tokenData);
      return res.redirect(`/settings?lineError=true&reason=${tokenData.error}`);
    }

    const idToken = tokenData.id_token;
    const accessToken = tokenData.access_token; // 必要であればアクセストークンも利用

    // 4. IDトークンを検証し、LINE User ID (sub) を取得
    // LINEの公式ドキュメントに従い、公開鍵を取得してJWTを検証するのが理想ですが、
    // 簡単な方法は、LINEの検証エンドポイントを利用することです。
    const verifyResponse = await fetch('https://api.line.me/oauth2/v2.1/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        id_token : idToken,
        client_id : `${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID}`
      }),
    });
    const profileData = await verifyResponse.json();

    if (profileData.error || profileData.aud !== process.env.LINE_LOGIN_CHANNEL_ID) {
      console.error('LINE ID Token Verification Error:', profileData);
      return res.redirect('/settings?lineError=true&reason=id_token_verification_failed');
    }

    const lineUserId = profileData.sub; // LINE User ID (Uxxxxxxxxxxxxxxxxx 形式)

    // 5. ログイン中のClerkユーザーIDをAPI Routeで取得
    //    Clerkのサーバーサイド認証（getAuth）を使って、リクエスト元のClerkユーザーIDを取得
    const { userId: clerkUserId } = getClerkAuth(req); // ClerkのuserIdを取得

    if (!clerkUserId || clerkUserId !== clerkUserIdFromState) {
        // CSRF stateのClerkUserIdと、現在のClerkログインユーザーIDが一致しない場合
        // あるいは、そもそもClerkにログインしていない場合
        console.error('Mismatched Clerk User ID or not logged in:', {
            currentClerkUserId: clerkUserId,
            clerkUserIdFromState: clerkUserIdFromState,
        });
        return res.redirect('/settings?lineError=true&reason=clerk_user_mismatch');
    }

    // 6. FirebaseにLINE User IDを保存
    const userDocRef = doc(db, 'users', clerkUserId); // ClerkユーザーIDをドキュメントIDとする
    await setDoc(userDocRef, { lineUserId: lineUserId }, { merge: true }); // merge: true で既存フィールドを上書きせずに更新

    console.log(`LINE User ID ${lineUserId} saved for Clerk user ${clerkUserId} in Firebase.`);

    // 7. 成功メッセージと共に設定ページへリダイレクト
    res.redirect('/settings?lineConnected=true');

  } catch (error) {
    console.error('LINE Login Callback Processing Error:', error);
    res.redirect('/settings?lineError=true&reason=server_error');
  }
}