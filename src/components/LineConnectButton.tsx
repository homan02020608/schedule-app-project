"use client"
import { useUser } from '@clerk/nextjs'
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';
import { Button } from './ui/button';


const LineConnectButton = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [lineConnected, setLineConnected] = useState(false);
    const [loading, setLoading] = useState(true);

    //LINE連携状態をFirebaseに確認
    useEffect(() => {
        if (isLoaded && isSignedIn && user) {
            const checkLineStatus = async () => {
                try {
                    const userDocRef = doc(db, 'users', user.id);
                    const userDocSnap = await getDoc(userDocRef);
                    if (userDocSnap.exists() && userDocSnap.data().lineUserId) {
                        setLineConnected(true);
                    } else {
                        setLineConnected(false);
                    }
                } catch (error) {
                    console.error("Error checking LINE status:", error);
                    setLineConnected(false)
                } finally {
                    setLoading(false)
                }
            };
            checkLineStatus();
        } else if (isLoaded && !isSignedIn) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn, user])

    const handleLineConnect = () => {
        if (!isSignedIn) {
            alert("LINE連携にはログインが必要です");
            return;
        }
        const state = `${user.id}-${generateRandomString(16)}`;
        localStorage.setItem(`line_auth_state_${user.id}`, state);

        const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/line-callback&state=${state}&scope=profile%20openid&nonce=${generateRandomString(16)}`;
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: `${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID}`,
            redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}`,
            state: state,
            scope: 'profile%20openid',
            nonce: generateRandomString(16),
        });
        window.location.href = lineLoginUrl 
        //+ params.toString()
    };

    const generateRandomString = (length: number) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    if (!isLoaded || loading) {
        return <p>LINE連携状態を確認中...</p>
    }

    if (!isSignedIn) {
        return <p>ログインしてLINEと連携してください。</p>
    }

    return (
        <div className='flexCenter bg-green-400 text-white rounded-xl p-4'>
            {lineConnected ? (
                <p>LINE連携済み</p>
            ) : (
                <Button
                    onClick={handleLineConnect}
                >
                    LINEと連携
                </Button>
            )}
        </div>
    )
}

export default LineConnectButton