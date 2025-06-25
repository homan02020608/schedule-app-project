import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flexCenter h-[80vh]'>
        <SignUp/>
    </div>
  )
}

export default page