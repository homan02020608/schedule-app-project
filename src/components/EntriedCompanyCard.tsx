"use client"
import React from 'react'
import { CompanyCard } from '@/app/Types'
import Link from 'next/link'
import { Calendar } from "@/components/ui/calendar"


const EntriedCompanyCard = ({ company_id, company_name, created_at, deadline, details, occupation, status }: CompanyCard) => {
    //const [companyListData, setCompanyListData] = useState<CompanyList[]>();

    return (
        <div className='flexCenter flex-row p-4 m-4 border gap-10 border-gray-300 shadow-xl rounded-xl  '>
            <div className='flexCenter flex-col gap-4 '>
                <Link href={`/company/${company_id}`} className='flexCenter whitespace-nowrap rounded-2xl hover:scale-105 hover:transition-transform hover:cursor-pointer'>{company_name}</Link>
                <p className='text-sm font-light text-wrap'>#{details}</p>
                <p className='text-sm font-light text-wrap'>#{occupation}</p>
            </div>
            <div className='flexCenter flex-col border-l-2 border-gray-400 pl-6'>
                {status === "completed" ?
                    <p>選考終了</p>
                    :
                    <div className='flexCenter flex-col gap-4 '>
                        <p className='font-semibold text-red-500'>締切:{deadline?.toLocaleDateString('ja-JP')}</p>
                        <Calendar
                            mode='single'
                            selected={deadline}
                            className='rounded-md border'
                        />
                    </div>
                }


            </div>
        </div>
    )
}

export default EntriedCompanyCard