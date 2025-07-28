import RecruitFlow from '@/components/RecruitFlow'
import TodoList from '@/components/TodoList'
import React from 'react'
import { getCompanyData } from '../../../../../firebase/firebaseFunction';
import { CompanyList } from '@/app/Types';
import { auth } from '@clerk/nextjs/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TodoForm from '@/components/TodoForm';



const page = async ({ params }: { params: Promise<{ companyId: string }> }) => {
    const { companyId } = await params;
    const { userId } = await auth()
    const companyData = await getCompanyData({ userId, companyId })
    
    return (
        <div className='pb-20 '>
            <RecruitFlow 
                companyId={companyId}
                userId={userId}
            />
            <div className='flexCenter flex-col mt-12'>
                <h1 className='font-light text-3xl '>選考項目一覧</h1>
                
                <TodoForm
                    companyId={String(companyId)}
                />
                <div className="w-full flexEnd">
                    <Button variant="link" className='hover:cursor-pointer p-2'>
                        <Link href={"/settings"}>LINE連携はこちらへ</Link>
                    </Button>
                </div>
                {companyData.map((data: CompanyList) => (
                    <div key={data.id} className='w-full'>
                        <TodoList
                            userId={userId}
                            companyId={companyId}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page