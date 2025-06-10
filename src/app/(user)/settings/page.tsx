"use client"
import BackButton from '@/components/BackButton'
import LineConnectButton from '@/components/LineConnectButton'
import React from 'react'

const page = () => {
  return (
    <div className='flexCenter flex-col border-2 border-gray-300 rounded-xl m-4 p-4 gap-4'>
      <h1 className='text-3xl font-light'>Settings</h1>
      <div className='w-full flexStart'>
        <BackButton />
      </div>
      <div className='rounded-xl p-4 px-8 border bg-white hover:bg-gray-100 hover:cursor-pointer'>Testing</div>
      <div className='rounded-xl p-4 px-8 border bg-white hover:bg-gray-100 hover:cursor-pointer'>Testing</div>
      <div className='rounded-xl p-4 px-8 border bg-white hover:bg-gray-100 hover:cursor-pointer'>Testing</div>
      <div className='rounded-xl p-4 px-8 border bg-white hover:bg-gray-100 hover:cursor-pointer'>Testing</div>
      
      <LineConnectButton />
      {/* <LineSendMessage/> */}
      
    </div>
  )
}

export default page