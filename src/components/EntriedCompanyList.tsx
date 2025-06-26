import { auth } from '@clerk/nextjs/server'
import { fetchCompanyListData } from '../../firebase/firebaseFunction'
import { CompanyList } from '@/app/Types'
import FilterButtons from './FilterButtons'
import FilteredCardList from './FilteredCardList'



const EntriedCompanyList = async (props: { currentStatus: string }) => {

    const { userId } = await auth()
    const companyData: CompanyList[] = await fetchCompanyListData(userId)
    const currentStatus  = props.currentStatus ;

    return (
        <div className='flexCenter flex-col m-4 '>
            <h1 className='font-light text-2xl  p-2 m-4'>企業一覧</h1>
            <FilterButtons currentStatus={currentStatus}/>
            <div>
                <FilteredCardList 
                    companyData={companyData}
                    currentStatus={currentStatus}    
                />
            </div>
        </div>
    )
}

export default EntriedCompanyList