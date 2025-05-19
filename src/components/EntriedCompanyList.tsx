import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { fetchCompanyListData } from '../../firebase/firebaseFunction'
import EntriedCompanyCard from './EntriedCompanyCard'
import { CompanyList } from '@/app/Types'

const EntriedCompanyList = async () => {
    const { userId } = await auth()
    const companyData = await fetchCompanyListData(userId)
    
    return (
        <div className='flexCenter flex-col border-4 m-4 gap-10'>
            <h1>EntriedCompanyList</h1>
            <div>
                {companyData.map((data: CompanyList) => (
                    <div key={data.id}>
                        <EntriedCompanyCard
                            company_id={data.company_id}
                            company_name={data.company_name}
                            created_at={data.created_at?.toDate()}
                            deadline={data?.deadline?.toDate()}
                            id={data.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EntriedCompanyList