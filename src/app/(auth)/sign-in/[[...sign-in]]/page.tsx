import { SignIn } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flexCenter h-[80vh]'>
        <SignIn/>
    </div>
    
  )
}

export default page