"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'

type FilterStatus = 'interested' | 'in_progress' | 'completed';

const FilterButtons = () => {
    const router = useRouter();
    const searchParams = useSearchParams()


    const handleFilterClick = (status : FilterStatus) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('status' , status)
        router.push(`?${params.toString()}`);
    }


    return (
        <div className='flex gap-10'>
            <Button
                variant="secondary"
                className='text-xl font-light px-4 py-2 hover:cursor-pointer '
                onClick={() => handleFilterClick('interested')}
            >
                気になる
            </Button>
            <Button
                variant="secondary"
                className='text-xl font-light px-4 py-2 hover:cursor-pointer'
                onClick={() => handleFilterClick('in_progress')}
            >
                選考中
            </Button>
            <Button
                variant="secondary"
                className='text-xl font-light px-4 py-2 hover:cursor-pointer'
                onClick={() => handleFilterClick('completed')}
            >
                選考終了
            </Button>
        </div>
    )
}

export default FilterButtons