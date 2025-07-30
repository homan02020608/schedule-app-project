"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import AnimationHover from './AnimationHover';

type FilterStatus = 'interested' | 'in_progress' | 'completed';

const FilterButtons = (props: { currentStatus: string }) => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const currentStatus = props.currentStatus;

    const handleFilterClick = (status: FilterStatus) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('status', status)
        router.push(`?${params.toString()}`);
    }


    return (
        <div className='flexCenter gap-10'>
            <AnimationHover>
                <Button
                    variant="ghost"
                    className={`text-xl font-extralight px-4 py-2 hover:cursor-pointer rounded-none ${currentStatus === 'interested' && 'bg-cyan-50'}`}
                    onClick={() => handleFilterClick('interested')}
                >
                    気になる

                </Button>
            </AnimationHover>
            <AnimationHover>
                <Button
                    variant="ghost"
                    className={`text-xl font-extralight px-4 py-2 hover:cursor-pointer rounded-none ${currentStatus === 'in_progress' && 'bg-cyan-50'}`}
                    onClick={() => handleFilterClick('in_progress')}

                >
                    選考中
                </Button>
            </AnimationHover>
            <AnimationHover>
                <Button
                    variant="ghost"
                    className={`text-xl font-extralight px-4 py-2 hover:cursor-pointer rounded-none ${currentStatus === 'completed' && 'bg-cyan-50'}`}
                    onClick={() => handleFilterClick('completed')}
                >
                    選考終了
                </Button>
            </AnimationHover>
        </div>
    )
}

export default FilterButtons