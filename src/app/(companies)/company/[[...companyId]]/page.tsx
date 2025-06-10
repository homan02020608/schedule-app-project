import RecruitFlow from '@/components/RecruitFlow'
import TodoList from '@/components/TodoList'
import React from 'react'
import { getCompanyData } from '../../../../../firebase/firebaseFunction';
import { CompanyList } from '@/app/Types';
import { auth } from '@clerk/nextjs/server';


const page = async ({ params }: { params: Promise<{ companyId: string }> }) => {
    const { companyId } = await params;
    const { userId } = await auth()
    const companyData = await getCompanyData({ userId, companyId })
    

    return (
        <div className=''>
            <RecruitFlow />
            {companyData.map((data: CompanyList) => (
                <div key={data.id}>
                    <TodoList
                        userId={userId}
                        company_docId={data.id}
                    />
                </div>
            ))}
            
        </div>
    )
}

export default page