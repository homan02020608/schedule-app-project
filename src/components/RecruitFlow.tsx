import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import BackButton from '@/components/BackButton';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddRecruitFlowButton from './AddRecruitFlowButton';

/* const selectionFlow = [
    { id: 1, selection: "書類選考", completed: true },
    { id: 2, selection: "適性検査", completed: true },
    { id: 3, selection: "一次面接", completed: false },
    { id: 4, selection: "ニ次面接", completed: false },
    { id: 5, selection: "最終面接", completed: false },
    { id: 6, selection: "内定", completed: false },
] */

interface SelectionFlow {
    selection_name : string
    completed : boolean
}

interface RecruitFlow  {
    id : string
    selectionFlow? : SelectionFlow | any
}

const RecruitFlow = async () => {
    const recruitFlowSnapShot = await getDocs(collection(db, 'company', 'dU8hCMB6IGXAUGPsF6Qt','recruitFlow'))
    const recruitFlowData  = recruitFlowSnapShot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))

    return (
        <div className='flexCenter flex-col border-4 m-4 p-4'>
            <AddRecruitFlowButton recruitFlowData={recruitFlowData}/>
            <BackButton />
            <h1 className='font-light text-3xl '>選考詳細</h1>
            {recruitFlowData.map((data:RecruitFlow) => (
                <div key={data.id} className='p-4 rounded-full flexCenter flex-col md:flex-row gap-16'>
                    {data.selectionFlow.map((flow:SelectionFlow, index : number) => (
                        <div key={flow.selection_name}  className='flexCenter flex-col relative '>
                            <CheckCircleOutlineOutlinedIcon className={`w-4 h-4 ${flow.completed ? 'text-teal-500' : 'text-black'}`} />
                            <div className={`absolute left-20 bottom-4 invisible md:visible  ${flow.completed ? 'text-teal-500' : 'text-gray-500'} ${(index === data.selectionFlow.length - 1 ) && 'hidden'}`}> <ArrowForwardIosIcon/></div>
                            <div className={`absolute left-5 top-18 scale-200 md:hidden ${flow.completed ? 'text-teal-500' : 'text-gray-500'} ${(index === data.selectionFlow.length - 1) && 'hidden'}`}> <KeyboardArrowDownIcon/></div>  
                            <div>{flow.selection_name}</div>
                        </div>
                    ))}
                </div>
            ))}

        </div>
    )
}

export default RecruitFlow