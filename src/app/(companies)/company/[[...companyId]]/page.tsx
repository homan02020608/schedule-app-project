import RecruitFlow from '@/components/RecruitFlow'
import TodoList from '@/components/TodoList'
import React from 'react'
import { getCompanyData } from '../../../../../firebase/firebaseFunction';
import { CompanyList } from '@/app/Types';

const page = async ({ params }: { params: Promise<{ companyId: string }> }) => {
    const { companyId } = await params;
    const companyData = await getCompanyData({ companyId })
    
    return (
        <div className=''>
            {companyData.map((data:CompanyList) => (
                <div key={data.id}>
                    <RecruitFlow />
                    <TodoList
                        Id={data.id}
                    />
                </div>
            ))}

        </div>
    )
}

export default page