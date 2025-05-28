'use client'
import React from 'react'

const LineSendMessage = () => {
    const sendPushMessage = async() => {
        try {
            const response = await fetch('/api/line-test/',{
                "method" : "POST",
                "headers" : {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({message: 'Hello Line!'}),
            })

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error || '送信失敗')
            }
            alert("LINEでメッセージを送信しました");
        } catch (e : unknown) {
            console.error(e);
            const errorMessage = e instanceof Error ? e.message : "Unknown error occurred"
            alert(`実行エラー:${errorMessage}`)
        }
    }
    return (
        <div>
            <button type='button' onClick={(sendPushMessage)}>ブロードキャストメッセージ送信</button>
        </div>
    )
}

export default LineSendMessage