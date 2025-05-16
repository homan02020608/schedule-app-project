"use client"
import React, { useEffect } from 'react'
import AuthButton from './sign-in/AuthButton'
import { useAppDispatch } from '@/redux/store'
import { useUser } from '@clerk/nextjs'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { signIn, signOut } from '@/features/counter/userSlice'

const Navbar = () => {

    const dispatch = useAppDispatch();

    const { isSignedIn, user } = useUser();

    const fetchUser = async () => {
        /* databaseに存在かどうかをチェック */
        const userSnapShot = await getDoc(doc(db, 'users', `${user?.id}`))
        if (!userSnapShot.exists()) {
            await setDoc(doc(db, 'users', `${user?.id}`), {
                user_id: user?.id,
                first_name: user?.firstName,
                last_name: user?.lastName,
                email: user?.primaryEmailAddress?.emailAddress,
                created_at: new Date(),
                updated_at: new Date(),
            })
        }
        /* reduxに入れて管理される */
        dispatch(signIn({
            id: user?.id,
            first_name: user?.firstName,
            last_name: user?.lastName,
            email: user?.primaryEmailAddress?.emailAddress,
        }))
    }

    useEffect(() => {
        if (isSignedIn) {
            fetchUser()
        } else {
            dispatch(signOut())
        }
    }, [isSignedIn])
    
    return (
        <div className=''>
            <AuthButton />
        </div>
    )
}

export default Navbar