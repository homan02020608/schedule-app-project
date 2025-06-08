"use client"
import LineConnectButton from '@/components/LineConnectButton'
import LineSendMessage from '@/components/LineSendMessage'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flexCenter flex-col border-2 border-gray-300 rounded-xl m-4 p-4 gap-4'>
        <h1>setting page</h1>
        <LineConnectButton />
        <LineSendMessage/>
        <Link href="/" className='bg-gray-200 border-2 rounded-xl p-2 shadow-xl hover:scale-105 transition-transform'>HOME</Link>
    </div>
  )
}

export default page