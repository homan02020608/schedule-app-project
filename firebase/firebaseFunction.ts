import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore"
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

export const fetchCompanyListData = async (userId: string | null | undefined) => {
    const companySnapshot = await getDocs(query(collection(db, "users", `${userId}`, "company"), orderBy("deadline","asc")))
    const companyListInfo = companySnapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
    }))
    return companyListInfo;
}

export const getTodoListData = async ({ userId, companyId }: { userId: string | any; companyId: string }) => {
    const todoListSnapshot = await getDocs(query(collection(db,"todoReminder"),where("company_id",'==',`${companyId}`), where("user_id" ,"==" ,`${userId}`) ));
    const todoListData = todoListSnapshot.docs.map((doc) => ({
        ...doc.data()
    }))
    return todoListData;

}

export const addTodoFormData = async ({ companyId, completed, deadline, todo_action, userId, }: AddTodoFormData) => {
    try {
        const todoId = v4();
        await setDoc(doc(db, 'todoReminder', `${todoId}`), {
            company_id: companyId,
            completed: completed,
            created_at: new Date(),
            deadline: deadline,
            todo_action: todo_action,
            todo_id: todoId,
            updated_at: new Date(),
            user_id: userId,
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

export const deleteTodoItem = async ( todo_id  : string | undefined) => {
    try {
        await deleteDoc(doc(db, "todoReminder" , `${todo_id}`))
    } catch (error) {
        console.error(error)
    }
}

export const addCompanyFormData = async ({ userId, company_name, deadline, details, occupation, status }: AddCompanyFormData) => {
    try {
        const companyId = v4();
        await addDoc(collection(db, 'users', `${userId}`, 'company'), {
            company_id: companyId,
            company_name: company_name,
            created_at: new Date(),
            deadline: deadline,
            details : details,
            occupation : occupation,
            status : status,
        })
    } catch (error) {
        console.error(error)
    }
}