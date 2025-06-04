// app/api/auth/line-callback/route.js
import { doc, setDoc } from 'firebase/firestore';

import { NextResponse } from 'next/server'; // App RouterのAPI Routeで推奨されるレスポンスオブジェクト
import { db } from '../../../../../firebase/firebase';


// LINEからのリダイレクトはGETリクエストで来るため、GETハンドラを定義
export async function GET(req: Request) {
    // App Routerではreq.queryではなく、req.urlからURLSearchParamsでクエリを取得
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const error_description = searchParams.get('error_description');

    // 1. LINE側でエラーが発生した場合のハンドリング
    if (error) {
        console.error('LINE Login Error (callback):', error, error_description);
        return NextResponse.redirect(new URL('/settings?lineError=true&reason=line_error', req.url));
    }

    // 2. CSRF対策（簡易版）：stateからClerkユーザーIDとランダムな文字列を分離
    // stateの形式は "user_xxxxxxxxxxxxxxxxx-random_string_yyyyyyyyyy" を想定
    const stateParts = state ? state.split('-') : [];
    const clerkUserIdFromState = stateParts[0];
    //const randomStringFromState = stateParts[1]; // 今回は検証に使いませんが、取得しておく

    if (!clerkUserIdFromState) {
        console.error('CSRF Alert: Clerk User ID missing or invalid state format.');
        return NextResponse.redirect(new URL('/settings?lineError=true&reason=invalid_state_format', req.url));
    }

    const currentClerkUserId: string = clerkUserIdFromState;

    // 3. 認可コードをアクセストークンとIDトークンに交換（LINE APIへのPOSTリクエスト）
    try {
        const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: `${code}`,
                redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/line-callback`,
                client_id: `${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID}`,
                client_secret: `${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_SECRET}`
            }),
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.json();
            console.error('LINE Token Exchange HTTP Error:', tokenResponse.status, errorData);
            return NextResponse.redirect(new URL(`/settings?lineError=true&reason=token_exchange_http_error&status=${tokenResponse.status}&details=${errorData.error || 'unknown'}`, req.url));
        }

        const tokenData = await tokenResponse.json();
        console.log('LINE Token Data:', tokenData);

        if (tokenData.error) {
            console.error('LINE Token Exchange API Error (from LINE):', tokenData);
            return NextResponse.redirect(new URL(`/settings?lineError=true&reason=line_api_error&details=${tokenData.error}`, req.url));
        }

        const idToken = tokenData.id_token;

        const verifyIdTokenResponse = await fetch('https://api.line.me/oauth2/v2.1/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                id_token: idToken,
                client_id: process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID as string,
            }),
        });

        if (!verifyIdTokenResponse.ok) {
            const errorData = await verifyIdTokenResponse.json();
            console.error('LINE ID Token Verification HTTP Error:', verifyIdTokenResponse.status, errorData);
            return NextResponse.redirect(new URL(`/settings?lineError=true&reason=id_token_verify_http_error&status=${verifyIdTokenResponse.status}&details=${errorData.error || 'unknown'}`, req.url));
        }
        const profileData: { sub?: string; iss?: string; aud?: string; exp?: number; nonce?: string; } = await verifyIdTokenResponse.json();
        console.log('LINE ID Token Verification Data:', profileData); // デバッグ用にログ出力
        const lineUserId = profileData.sub;
        // 4. IDトークンからLINE User ID (sub) を取得（簡易版：デコードのみ）
        if (!lineUserId) {
            console.error('LINE User ID (sub) not found in verified ID Token or invalid.');
            return NextResponse.redirect(new URL('/settings?lineError=true&reason=id_token_invalid_sub', req.url));
        }

        // 5. FirebaseにLINE User IDを保存
        const userDocRef = doc(db, 'users', currentClerkUserId);
        await setDoc(userDocRef, { lineUserId: lineUserId }, { merge: true });

        console.log(`LINE User ID ${lineUserId} saved for Clerk user ${currentClerkUserId} in Firebase.`);

        // 6. 成功メッセージと共に設定ページへリダイレクト
        return NextResponse.redirect(new URL('/settings?lineConnected=true', req.url));

    } catch (error) {
        console.error('LINE Login Callback Processing Error:', error);
        return NextResponse.redirect(new URL('/settings?lineError=true&reason=server_exception', req.url));
    }
}