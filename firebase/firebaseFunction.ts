import { Timestamp, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase"
import { v4 } from "uuid";


export const getTodoListData = async ({ Id }: { Id: string }) => {
    try {
        const todoListSnapshot = await getDocs(collection(db, 'company', `${Id}`, 'todoList'));
        const todoListData = todoListSnapshot.docs.map((doc) => ({
            ...doc.data()
        }))
        return todoListData;
    } catch (error) {
        console.error(error)
    }
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


export const addTodoFormData = async ({ action_name, completed, deadline }: { action_name: string; completed: string; deadline: Date }) => {
    try {
        const todoId = v4();
        await setDoc(doc(db, 'company', 'dU8hCMB6IGXAUGPsF6Qt',"todoList",`${todoId}`), {
            todo_action: action_name,
            todo_id : todoId,
            completed: completed,
            deadline: deadline,
            created_at: new Date(),
        })
    } catch (error) {
        console.error(error)
    }
}

export const addRecruitFlow = async (recruitFlowData : any) => {
    try {
        const recruitFlowRef = doc(db,'company','dU8hCMB6IGXAUGPsF6Qt','recruitFlow','xXtTCh1nMKWE3QYVhmuM')
        await updateDoc(recruitFlowRef,{
            selectionFlow : recruitFlowData
        })
    } catch (error) {
        console.error(error)
    }
}