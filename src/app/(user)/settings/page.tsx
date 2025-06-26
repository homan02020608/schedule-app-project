import BackButton from '@/components/BackButton'
import LineConnectButton from '@/components/LineConnectButton'
import React from 'react'


const page = async () => {

  return (
    <div className='flexCenter flex-col  rounded-xl m-4 p-4 gap-4'>
      <h1 className='text-3xl font-light'>Settings</h1>
      <div className='w-full flexBetween'>
        <BackButton />
        <LineConnectButton />
      </div>
    
      
      {/* <LineSendMessage/> */}
    </div>
  )
}

export default page