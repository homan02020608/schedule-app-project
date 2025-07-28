import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import BackButton from '@/components/BackButton';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import AddRecruitFlowButton from './AddRecruitFlowButton';
import { twMerge } from 'tailwind-merge';


interface RecruitFlow {
    id?: string
    recruit_selection?: string
    result?: string
    created_at?: Date
    updated_at?: Date
}


const RecruitFlow = async ({ companyId, userId }: { companyId: string; userId: string | null }) => {
    const recruitFlowSnapShot = await getDocs(query(collection(db, 'users', `${userId}`, 'company', `${companyId}`, 'recruitFlow'), orderBy("created_at", "asc")))
    const recruitFlowData = recruitFlowSnapShot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))
    
    return (
        <div className='flexCenter flex-col m-2 p-2 gap-6  '>
            <div className='flexBetween w-full'>
                <BackButton />
                <AddRecruitFlowButton
                    companyId={companyId}
                    userId={userId}
                />
            </div>

            <h1 className='font-light text-3xl p-2 m-4 '>選考フロー</h1>
            <div className='flexCenter flex-col md:flex-row gap-12 p-4 '>
                {recruitFlowData.map((data: RecruitFlow) => (
                    <div key={data.id} className='flexCenter flex-col relative p-2'>
                        <CheckCircleOutlineOutlinedIcon
                            className={twMerge(`w-4 h-4  text-black`, (data.result === "true" && 'text-teal-500'))}
                        />
                        <div className=''>{data.recruit_selection}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecruitFlow