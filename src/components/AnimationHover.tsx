"use client"
import React, { useState } from 'react'

const AnimationHover = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {children}
            <div className='flexCenter relative'
            >
                <span
                    style={{ transform: open ? "scaleX(1)" : "scaleX(0)" }}
                    className='absolute -bottom-1 -left-2 -right-2 h-[2px] origin-center rounded-full bg-slate-300 transition-transform duration-300 ease-out'
                />
            </div>
        </div>
    )
}

export default AnimationHover