import { Timestamp } from "firebase/firestore"

export interface CompanyList {
    company_id?: string
    company_name?: string
    created_at?: Timestamp
    id: string
    deadline?: Timestamp
}
export interface CompanyCard {
    company_id?: string
    company_name?: string
    created_at?: Date
    id: string
    deadline?: Date
}

export interface TodoListData {
    todo_id?: string
    todo_action?: string
    deadline?: Timestamp
    created_at?: Timestamp
    completed?: boolean
}

export interface AddTodoFormData {
    action_name: string;
    completed: string;
    deadline: Date;
    userId: string | undefined;
    company_docId: string
}