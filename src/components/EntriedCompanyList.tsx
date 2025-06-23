
import { auth } from '@clerk/nextjs/server'
import { fetchCompanyListData } from '../../firebase/firebaseFunction'
import EntriedCompanyCard from './EntriedCompanyCard'
import { CompanyList } from '@/app/Types'
import FilterButtons from './FilterButtons'


const EntriedCompanyList = async (props: { currentStatus: string }) => {

    const { userId } = await auth()
    const companyData: CompanyList[] = await fetchCompanyListData(userId)
    const currentStatus = props.currentStatus || 'in_progress';

    const filteredCompanies = companyData.filter(company => {
        return company.status === currentStatus
    })
    
    return (
        <div className='flexCenter flex-col border-2 m-4 '>
            <h1 className='font-light text-2xl border-b-2 p-2 m-4'>企業一覧</h1>
            <FilterButtons />
            <div>
                {filteredCompanies.map((data: CompanyList) => (
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