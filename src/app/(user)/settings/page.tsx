"use client"
import LineConnectButton from '@/components/LineConnectButton'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flexCenter flex-col border-2 border-gray-300 rounded-xl m-4 p-4 gap-4'>
        <h1>setting page</h1>
        <LineConnectButton />
        <Link href={`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_LINE_LOGIN_CHANNEL_ID}&redirect_uri=${process.env.NEXT_PUBLIC_SITE_URL}&state=12345abcde&scope=profile%20openid%20email`}>連携</Link>
    </div>
  )
}

export default page