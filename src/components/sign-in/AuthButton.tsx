"use client"
import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

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
                    <button className='flexCenter p-2 rounded-3xl gap-2 hover:cursor-pointer hover:bg-gray-200'>
                        <div>ログアウト</div>
                        <LogoutIcon/>
                    </button>
                </SignOutButton>
                <Link href={"/settings"} className='m-2'><SettingsIcon/></Link>        
            </SignedIn>
        </div>
    )
}

export default AuthButton