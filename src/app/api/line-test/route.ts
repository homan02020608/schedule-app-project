import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, state, error, error_description, } = req.query;

    if (error) {
        console.error(`LINE Login Error (callback):`, error, error_description);
        return res.redirect(`/settings?lineError=true`);
    };

    const [clerkUserIdFromState, randomStringFromState] = String(state).split("-");
    if(!clerkUserIdFromState){
        console.error('State parameter is invalid or missing Clerk User Id');
        return res.redirect('/settings?lineError=true&reason=invalid_state');
    }

    try {
        const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token',{
            method : 'POST',
            headers : {'Content-Type': 'application/x-www-form-urlencoded'},
            body : new URLSearchParams({
                grant_type : 'authorization_code',
                code : `${code}`,
                redirect_uri : `${process.env.NEXT_PUBLIC_SITE_URL}/api/line-test`
            }),
        });
        const tokenData = await tokenResponse.json();

        if(tokenData.error) {
            console.error(`LINE Token Exchange Error:`,tokenData);
            return res.redirect(`/settings?lineError=true&reason=${tokenData.error}`)
        }

        const idToken = tokenData.id_token;
        const accessToken = tokenData.access_token;

        const verifyResponse = await fetch('https://api.line.me/oauth2/v2.1/verify',{
            method : 'POST',
            headers : { 'Content-Type': 'application/x-www-form-urlencoded'},
            body : new URLSearchParams({
                id_token : idToken,
                client_id : `${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID}`,
            })
        });
        const profileData = await verifyResponse.json();

        if(profileData.error || profileData.aud !== process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID){
            console.error('LINE ID Token Verification Error:',profileData);
            return res.redirect(`/settings?lineError=true&reason=id_token_verification_failed`);
        }

        if(profileData.error || profileData.aud !== process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID){
            console.error('LINE ID Token Verification Error:',profileData);
            return res.redirect('/settings?lineError=true&reason=id_token_verification_failed')
        }

        const lineUserId = profileData.sub;
        console.log(`LINE User ID : ${lineUserId}`)

        res.redirect(`/settings?lineConnected=true`)

    } catch (error) {
        console.error('LINE login Callback Processing Error:',error);
        res.redirect('/settings?lineError=true&reason=server_error');
    }
}  