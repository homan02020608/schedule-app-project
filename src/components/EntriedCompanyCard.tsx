"use client"
import React from 'react'
import { CompanyCard } from '@/app/Types'
import Link from 'next/link'
import { Calendar } from "@/components/ui/calendar"


const EntriedCompanyCard = ({ company_id ,company_name , created_at, deadline , id}: CompanyCard) => {
    //const [companyListData, setCompanyListData] = useState<CompanyList[]>();

    return (
        <div className='flexCenter flex-row p-4 m-4 border gap-10 border-gray-300 shadow-xl rounded-xl  '>
            <Link href={`/company/${company_id}`} className='flexCenter whitespace-nowrap rounded-2xl hover:scale-105 hover:transition-transform hover:cursor-pointer'>{company_name}</Link>
            <div className='flexCenter flex-col'>
                <p>エントリーシート締切:{deadline?.toLocaleDateString('ja-JP')}</p>
                <Calendar
                    mode='single'
                    selected={deadline}
                    className='rounded-md border'
                />
            </div>
        </div>
    )
}

export default EntriedCompanyCard