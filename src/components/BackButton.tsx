"use client"
import { useRouter } from 'next/navigation'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from 'react'

const BackButton = () => {
    const router = useRouter()
  return (
    <button onClick={() => router.back()} className='flex w-full left-0  hover:underline hover:cursor-pointer'>
        <ArrowBackIosNewIcon/>
        Back
    </button>
  )
}

export default BackButton