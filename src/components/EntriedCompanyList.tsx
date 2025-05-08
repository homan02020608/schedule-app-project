"use client"
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { CompanyList } from '@/app/Types'
import Link from 'next/link'
import { Calendar } from "@/components/ui/calendar"


const EntriedCompanyList = () => {
    const [companyListData, setCompanyListData] = useState<CompanyList[]>();
    const [date, setDate] = useState<Date | undefined>(new Date());

    const fetchCompanyList = async () => {
        try {
            const companySnapshot = await getDocs((collection(db, "company")))
            const companyListInfo = companySnapshot.docs.map((doc) => ({
                ...doc.data(), id: doc.id
            }))
            setCompanyListData(companyListInfo)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchCompanyList()
    }, [])
    //console.log(companyListData)
    return (
        <div className='flexCenter flex-col border-4 m-4 gap-10'>
            <h1>EntriedCompanyList</h1>
            <div className='flexCenter flex-col'>
                {companyListData?.map((data) => (
                    <div key={data.id} className='flex flex-row p-4 m-4 border-2 gap-24 border-gray-400 rounded-3xl  '>
                        <Link href={`/company/${data.company_id}`} className='flexCenter  p-2 rounded-2xl  hover:scale-105 hover:transition-transform hover:cursor-pointer'>{data.company_name}</Link>
                       
                        <div className='flexCenter flex-col'>
                            <p>エントリーシート締切:2025/5/6</p>
                            <Calendar
                                mode='single'
                                selected={data.deadline?.toDate()}
                                className='rounded-md border'
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EntriedCompanyList