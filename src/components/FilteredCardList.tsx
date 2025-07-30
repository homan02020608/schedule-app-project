import { CompanyList } from '@/app/Types'
import React from 'react'
import EntriedCompanyCard from './EntriedCompanyCard'

interface CompanyDataProps {
    companyData: CompanyList[]
    currentStatus: string
}

const FilteredCardList = ({ companyData, currentStatus }: CompanyDataProps) => {
    const filteredCompanies = companyData.filter(company => {
        if (currentStatus === 'all') {
            return true;
        }
        return company.status === currentStatus
    })

    return (
        <div className='h-[50vh] overflow-scroll '>
            {filteredCompanies.map((company) => (
                <div key={company.id}>
                    <EntriedCompanyCard
                        company_id={company.company_id}
                        company_name={company.company_name}
                        created_at={company.created_at?.toDate()}
                        deadline={company?.deadline?.toDate()}
                        //id={data.id}
                        details={company.details}
                        occupation={company.occupation}
                        status={company.status}
                    />
                </div>
            ))}
        </div>
    )
}

export default FilteredCardList