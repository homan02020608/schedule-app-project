"use client"
import { useUser } from '@clerk/nextjs'
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';

const LineSendMessage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [lineUserId, setLineUserId] = useState<string | null>(null);
    const [loadingLineId, setLoadingLineId] = useState<boolean>(true);
    const [messageStatus, setMessageStatus] = useState<string>('');
    const [isSending, setIsSending] = useState<boolean>(false);

    useEffect(() => {
        async function fetchLineUserId() {
            if (isLoaded && isSignedIn && user) {
                try {
                    const userDocRef = doc(db, 'users', user.id);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        if (userData.lineUserId) {
                            setLineUserId(userData.lineUserId);
                        } else {
                            setLineUserId(null);
                        }
                    } else {
                        setLineUserId(null);
                    }
                } catch (error) {
                    console.error("Error fetching LINE User ID from Firebase:", error);
                    setLineUserId(null);
                } finally {
                    setLoadingLineId(false);
                }
            } else if (isLoaded && !isSignedIn) {
                setLoadingLineId(false)
            }
        }
        fetchLineUserId();
    }, [isLoaded, isSignedIn, user])

    const handleSendMessage = async () => {
        if (!isSignedIn) {
            setMessageStatus('エラー:ログインしていません');
            return;
        }
        if (!lineUserId) {
            setMessageStatus('エラー:LINEが連携されていません');
            return
        }
        if (isSending) {
            return
        }
        setIsSending(true);
        setMessageStatus('メッセージをLINEに送信中...');

        try {
            const response = await fetch('/api/auth/send-line-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    lineUserId: lineUserId,
                    messageText: `テストメッセージ from ${lineUserId}`
                }),
            });

            const data = await response.json()

            if (response.ok) {
                setMessageStatus('メッセージが正常に送信されました！');
                console.log('API response:', data);
            } else {
                setMessageStatus(`メッセージ送信失敗: ${data.error || '不明エラー'}`);
                console.error('API response error:', data);
            }
        } catch (error) {
            setMessageStatus('ネットワークエラーが発生しました。');
            console.error('Network or API call error:', error);
        } finally {
            setIsSending(false);
        }
    }

    if (!isLoaded || loadingLineId) {
        return <p>LINE連携状態を確認中...</p>;
    }

    if (!isSignedIn) {
        return <p>LINEテストメッセージを送信するにはログインが必要です。</p>;
    }

    return (
        <div className="p-4 border rounded-lg shadow-md max-w-sm mx-auto my-4">
            <h2 className="text-xl font-semibold mb-3">LINEテストメッセージ送信</h2>
            {lineUserId ? (
                <>
                    <p className="mb-2">LINE連携済みです。</p>
                    <button
                        onClick={handleSendMessage}
                        disabled={isSending} // 送信中はボタンを無効化
                        className={`w-full px-4 py-2 rounded ${isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                    >
                        {isSending ? '送信中...' : 'テストメッセージを送信'}
                    </button>
                </>
            ) : (
                <p className="text-red-600">LINEが連携されていません。連携してからお試しください。</p>
            )}
            {messageStatus && <p className="mt-3 text-sm text-gray-700">{messageStatus}</p>}
        </div>
    )
}

export default LineSendMessage