import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase"
import { v4 } from "uuid";
import { AddCompanyFormData, AddTodoFormData } from "@/app/Types";

export const getCompanyData = async ({ userId, companyId }: { userId: string | null, companyId: string }) => {
    const companyDataQuery = query(collection(db, 'users', `${userId}`, 'company'), where('company_id', '==', `${companyId}`))
    const companyDataQuerySnapshot = await getDocs(companyDataQuery);
    const companyData = companyDataQuerySnapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))
    return companyData;
}

export const fetchCompanyListData = async (userId: string | null) => {
    const companySnapshot = await getDocs((collection(db, "users", `${userId}`, "company")))
    const companyListInfo = companySnapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))
    return companyListInfo;
}

export const getTodoListData = async ({ userId, company_docId }: { userId: string | any; company_docId: string }) => {
    const todoListSnapshot = await getDocs(collection(db, 'users', `${userId}`, 'company', `${company_docId}`, 'todoList'));
    const todoListData = todoListSnapshot.docs.map((doc) => ({
        ...doc.data()
    }))
    return todoListData;

}

export const addTodoFormData = async ({ action_name, completed, deadline, userId, company_docId }: AddTodoFormData) => {
    try {
        const todoId = v4();
        await setDoc(doc(db, 'users', `${userId}`, 'company', `${company_docId}`, "todoList", `${todoId}`), {
            todo_action: action_name,
            todo_id: todoId,
            completed: completed,
            deadline: deadline,
            created_at: new Date(),
        })
    } catch (error) {
        console.error(error)
    }
}

export const addRecruitFlow = async (recruitFlowData: any) => {
    try {
        const recruitFlowRef = doc(db, 'company', 'dU8hCMB6IGXAUGPsF6Qt', 'recruitFlow', 'xXtTCh1nMKWE3QYVhmuM')
        await updateDoc(recruitFlowRef, {
            selectionFlow: recruitFlowData
        })
    } catch (error) {
        console.error(error)
    }
}
//userId: string | any, company_docId: string, todo_id: string | undefined

export const deleteTodoItem = async ({ userId, company_docId, todo_id }: any) => {
    try {
        await deleteDoc(doc(db, "users", `${userId}`, "company", `${company_docId}`, "todoList", `${todo_id}`))
    } catch (error) {
        console.error(error)
    }
}   

export const addCompanyFormData = async({userId , company_name , deadline} : AddCompanyFormData) => {
    try {
        const companyId = v4();
        await addDoc(collection(db,'users',`${userId}`,'company') ,{
            company_id : companyId,
            company_name : company_name ,
            created_at : new Date(),
            deadline : deadline
        })
    } catch (error) {
        console.error(error)
    }
}