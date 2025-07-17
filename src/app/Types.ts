import { Timestamp } from "firebase/firestore"

export interface CompanyList {
    company_id?: string
    company_name?: string
    created_at?: Timestamp
    id: string
    deadline?: Timestamp
    details?:string
    occupation?:string
    status?: string
}
export interface CompanyCard {
    company_id?: string
    company_name?: string
    created_at?: Date
    id?: string
    deadline?: Date
    details?:string
    occupation?:string
    status?: string
}

export interface TodoListData {
    todo_id?: string
    todo_action?: string
    deadline?: Timestamp
    created_at?: Timestamp
    completed?: 'true' | 'false'
}

export interface AddTodoFormData {
    todo_action: string;
    completed: string;
    deadline?: Date;
    userId: string | undefined;
    companyId: string
}

export interface AddCompanyFormData {
    company_name : string;
    deadline : Date;
    userId : string | undefined;
    details : string
    occupation : string
    status : string
}