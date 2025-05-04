"use client"
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { CompanyList } from '@/app/Types'

const EntriedCompanyList = () => {
    const [companyListData, setCompanyListData] = useState<CompanyList[]>();

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
                    <div key={data.id} className='flex flex-row p-4 m-4 border-2 gap-6 border-gray-400 rounded-3xl cursor-pointer hover:scale-105 hover:transition-transform '>
                        <h1>{data.company_name}</h1>
                        <p>Created_at:{data.created_at?.toDate().toLocaleDateString("ja-JP")}</p>
                    </div>
            ))}
            </div>
        </div>
    )
}

export default EntriedCompanyList