import { Timestamp } from "firebase/firestore"

export interface CompanyList {
    company_id? : string
    company_name? : string
    created_at ?: Timestamp
    id?: string
    deadline?:Timestamp
}