"use client"
import { useRouter } from 'next/navigation'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from 'react'

const BackButton = () => {
  const router = useRouter()
  return (
    <div>
      <div onClick={() => router.back()} className='hover:underline hover:cursor-pointer' >
        <ArrowBackIosNewIcon className='scale-75'/>
        Back
      </div>
    </div>
  )
}

export default BackButton