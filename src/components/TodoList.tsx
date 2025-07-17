"use client"
import React, { useEffect, useState } from 'react'
import { getTodoListData } from '../../firebase/firebaseFunction'
import { TodoListData } from '@/app/Types'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import TodoItem from './TodoItem'



const TodoList = ({ userId, companyId }: { userId: string | null; companyId: string; }) => {
    const [todoListData, setTodoListData] = useState<TodoListData[]>()

    useEffect(() => {
        const getTodoList = async () => {
            const todoData = await getTodoListData({ userId, companyId })
            setTodoListData(todoData)
        }
        getTodoList()
    }, [])

    return (
        <div className='p-2 m-4 '>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">TodoItems</TableHead>
                        <TableHead className='w-[100px]'>Status</TableHead>
                        <TableHead className='w-[30px]'>Deadline</TableHead>
                        <TableHead className="w-[50px] text-right ">Created_At</TableHead>
                        <TableHead className="w-[30px] text-right "></TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todoListData?.map((todo) => {
                        return (
                           <TodoItem 
                                key={todo.todo_id}
                                todo_id={todo.todo_id}
                                todo_action={todo.todo_action}
                                completed={todo.completed}
                                deadline={todo.deadline}
                                created_at={todo.created_at}
                           /> 
                        )
                    })}
                </TableBody>
            </Table>

        </div>
    )
}

export default TodoList