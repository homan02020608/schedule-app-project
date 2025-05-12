import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./firebase"

export const getTodoListData = async ({ companyId }: { companyId: string }) => {
    const todoListSnapshot = await getDocs(collection(db, 'company', `${companyId}`, 'todoList'));
    const todoListData = todoListSnapshot.docs.map((doc) => ({
        ...doc.data()
    }))
    return todoListData;
}

export const getCompanyData = async ({ companyId }: { companyId: string }) => {
    const companyDataQuery = query(collection(db, 'company'), where('company_id', '==', `${companyId}`))
    const companyDataQuerySnapshot = await getDocs(companyDataQuery);
    const companyData = companyDataQuerySnapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))
    return companyData;
}

export const fetchCompanyListData = async () => {
    try {
        const companySnapshot = await getDocs((collection(db, "company")))
        const companyListInfo = companySnapshot.docs.map((doc) => ({
            ...doc.data(), id: doc.id
        }))
        return companyListInfo;
    } catch (error) {
        console.error(error)
    }
}
