"use client"
import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import { getTodoListData } from '../../firebase/firebaseFunction'
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


const TodoList = ({ Id  }: { Id: string ;}) => {
    const [todoListData, setTodoListData] = useState<TodoListData[]>()

    useEffect(() => {
        const getTodoList = async () => {
            const todoData = await getTodoListData({ Id })
            setTodoListData(todoData)
        }
        getTodoList()
    }, [])

    return (
        <div className='p-2 m-4 border-4 flexCenter flex-col'>
            <h1 className='font-light text-3xl '>選考Todo項目一覧</h1>
            <TodoForm />
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
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
                            <TableCell>{todo.completed ? '完成':'未完成'}</TableCell>
                            <TableCell>{todo.deadline?.toDate().toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">{todo.created_at?.toDate().toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default TodoList