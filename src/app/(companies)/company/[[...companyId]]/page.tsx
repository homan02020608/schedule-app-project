import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import BackButton from '@/components/BackButton';

const selectionFlow = [
    { id: 1, selection: "書類選考" ,completed: true},
    { id: 2, selection: "適性検査" ,completed: true },
    { id: 3, selection: "一次面接" ,completed: false },
    { id: 4, selection: "ニ次面接" ,completed: false },
    { id: 5, selection: "最終面接" ,completed: false },
    { id: 6, selection: "内定" ,completed: false },
]

const page = () => {
    return (
        <div className='flexCenter flex-col border-4 m-4 p-4'>
            <BackButton/>
            <h1 className='font-light text-3xl '>選考詳細</h1>
            <div className='p-4  rounded-full flexCenter flex-row gap-16'>
                {selectionFlow.map((flow) => (
                    <div key={flow.id} className='flexCenter flex-col relative m-4'>
                        <CheckCircleOutlineOutlinedIcon className={`w-4 h-4 ${flow.completed ? 'text-teal-500': 'text-black'}`}/>
                        <div className={`absolute w-18 h-[2px] left-16 bottom-8 ${flow.completed ? 'bg-teal-500' : 'bg-gray-500'} ${(flow.id === selectionFlow.length ) && 'hidden'  }`}></div>
                        <div>{flow.selection}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page