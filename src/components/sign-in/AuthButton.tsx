"use client"
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

const AuthButton = () => {
    return (
        <div className='flexEnd p-2'>
            <SignedOut>
                <SignInButton mode='modal'>
                    <button className='flexCenter p-2 rounded-3xl hover:cursor-pointer hover:bg-gray-200'>
                        <PersonIcon />
                        <div>ログイン</div>
                    </button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
                <SignOutButton>
                    <button className='flexCenter p-2 rounded-3xl hover:cursor-pointer hover:bg-gray-200'>
                        <PersonIcon />
                        <div>ログアウト</div>
                    </button>
                </SignOutButton>
            </SignedIn>
        </div>
    )
}

export default AuthButton