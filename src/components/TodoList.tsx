"use client"
import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import { deleteTodoItem, getTodoListData } from '../../firebase/firebaseFunction'
import { TodoListData } from '@/app/Types'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DeleteDialog from './DeleteDialog'
import DeleteIcon from '@mui/icons-material/Delete';






const TodoList = ({ userId, company_docId }: { userId: String | null; company_docId: string; }) => {
    const [todoListData, setTodoListData] = useState<TodoListData[]>()
    
    useEffect(() => {
        const getTodoList = async () => {
            const todoData = await getTodoListData({ userId, company_docId })
            setTodoListData(todoData)
        }
        getTodoList()
    }, [])

    const deleteTodo = (userId: string | any, company_docId: string, todo_id: string | undefined) => {
        deleteTodoItem({ userId, company_docId, todo_id })
        window.location.reload()
    }

    return (
        <div className='p-2 m-4 border-2 '>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] bg-red-200">TodoItems</TableHead>
                        <TableHead className='bg-fuchsia-300'>Status</TableHead>
                        <TableHead className='bg-green-300'>Deadline</TableHead>
                        <TableHead className="text-right bg-blue-300">Created_At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todoListData?.map((todo) => (
                        <TableRow key={todo.todo_id}>
                            <TableCell className="font-medium">{todo.todo_action}</TableCell>
                            <TableCell>{String(todo.completed) == 'true' ? '完成' : '未完成'}</TableCell>
                            <TableCell>{todo.deadline?.toDate().toLocaleDateString()}</TableCell>
                            <TableCell className="text-right ">{todo.created_at?.toDate().toLocaleDateString()}</TableCell>
                            <TableCell className='text-center '>
                                <DeleteDialog
                                    onClick={() => deleteTodo(userId, company_docId, todo.todo_id)}
                                >
                                    <DeleteIcon />
                                </DeleteDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default TodoList