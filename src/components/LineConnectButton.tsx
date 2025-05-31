"use client"
import { useUser } from '@clerk/nextjs'
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';

const LineConnectButton = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [lineConnected, setLineConnected] = useState(false);
    const [loading, setLoading] = useState(true);
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
                }finally{
                    setLoading(false)
                }
            };
            checkLineStatus();
        }else if (isLoaded && !isSignedIn){
            setLoading(false);
        }
    }, [isLoaded, isSignedIn, user])

    const handleLineConnect = () => {
        if(!isSignedIn){
            alert("LINE連携にはログインが必要です");
            return;
        }
        const state = `clerk_user_id=${user.id}&random=${Math.random().toString(36).substring(2,18)}`;
        const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?`;
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: `${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID}`,
            redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/line-callback`,
            state: state,
            scope: 'profile openid',
            nonce: Math.random().toString(36).substring(2, 18),
        })
        window.location.href = lineLoginUrl + params.toString()
    }
    return (
        <div>LineConnectButton</div>
    )
}

export default LineConnectButton