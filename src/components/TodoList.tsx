"use client"
import React, { useEffect, useState } from 'react'
import { deleteTodoItem, editTodoItem, getTodoListData } from '../../firebase/firebaseFunction'
import { TodoListData } from '@/app/Types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import DeleteDialog from './DeleteDialog'
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from './ui/input'
import EditIcon from '@mui/icons-material/Edit';
import { Button } from './ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import CancelIcon from '@mui/icons-material/Cancel';


const FormSchema = z.object({
    todo_action: z.string().min(1),
    completed: z.string(),
})


const TodoList = ({ userId, companyId }: { userId: String | null; companyId: string; }) => {
    const [todoListData, setTodoListData] = useState<TodoListData[]>()
    const [isEditMode, setIsEditMode] = useState(true);
    const [isEditModeIndex, setIsEditModeIndex] = useState<number | null>();
    const [editedTodoId, setEditedTodoId] = useState<string | undefined>("");
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            todo_action: '',
        }
    })

    useEffect(() => {
        const getTodoList = async () => {
            const todoData = await getTodoListData({ userId, companyId })
            setTodoListData(todoData)
        }
        getTodoList()
    }, [])

    const deleteTodo = (todo_id: string | undefined) => {
        deleteTodoItem(todo_id)
        window.location.reload()
    }

    const handleEditMode = (editModeIndex: number , todo_id : string | undefined ,) => {
        setIsEditMode(true)
        setIsEditModeIndex(editModeIndex)
        setEditedTodoId(todo_id)
    }

    const handleCancelEditMode = () => {
        setIsEditMode(false);
        setIsEditModeIndex(null);
        setEditedTodoId("")
        form.reset()
    }

    const handleSubmitEditedTodo = (values: z.infer<typeof FormSchema>) => {
        setLoading(true)
        const { todo_action, completed } = values;
        editTodoItem({ editedTodoId, todo_action, completed })
        window.location.reload()
        setIsEditModeIndex(null)
        setEditedTodoId("")
        setLoading(false)
        setIsEditMode(false)
    }

    return (
        <div className='p-2 m-4 border-2 '>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px] bg-red-100">TodoItems</TableHead>
                        <TableHead className='w-[150px] bg-fuchsia-100'>Status</TableHead>
                        <TableHead className='w-[100px] bg-green-100 '>Deadline</TableHead>
                        <TableHead className="w-[100px] text-right bg-blue-100">Created_At</TableHead>
                        <TableHead className="text-right bg-amber-300 w-[30px]"></TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todoListData?.map((todo, index) => {
                        return (
                            (isEditMode && index === isEditModeIndex) ?
                                (
                                    <TableRow key={todo.todo_id}>
                                        <TableCell>
                                            <Form {...form}>
                                                <form onSubmit={form.handleSubmit(handleSubmitEditedTodo)}>
                                                    <FormField
                                                        control={form.control}
                                                        name='todo_action'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder='todo_action'
                                                                        className={`${loading && 'pointer-events-none'}`}
                                                                        {...field}

                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </form>
                                            </Form>
                                        </TableCell>

                                        <TableCell>
                                            <Form {...form} >
                                                <form onSubmit={form.handleSubmit(handleSubmitEditedTodo)}>
                                                    <FormField
                                                        control={form.control}
                                                        name='completed'
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Select onValueChange={field.onChange} >
                                                                        <SelectTrigger className={`w-[150px] ${loading && 'pointer-events-none'}`}>
                                                                            <SelectValue placeholder={todo.completed ? '完成' : '未完成'} />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectGroup>
                                                                                <SelectLabel>Status</SelectLabel>
                                                                                <SelectItem value="true">完成</SelectItem>
                                                                                <SelectItem value="false">未完成</SelectItem>
                                                                            </SelectGroup>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </form>
                                            </Form>
                                        </TableCell>

                                        <TableCell>{todo.deadline?.toDate().toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right ">{todo.created_at?.toDate().toLocaleDateString()}</TableCell>

                                        <TableCell className='flexCenter gap-4'>
                                            <Button
                                                size={"sm"}
                                                variant={"outline"}
                                                className='hover:cursor-pointer'
                                                type='button'
                                                onClick={form.handleSubmit(handleSubmitEditedTodo)}
                                            >
                                                <span>変更確定</span>
                                            </Button>
                                            <Button
                                                size={"sm"}
                                                variant={"outline"}
                                                className='hover:cursor-pointer'
                                                onClick={() => handleCancelEditMode()}
                                            >
                                                <CancelIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                                :
                                (
                                    <TableRow key={todo.todo_id}>
                                        <TableCell className="font-medium">{todo.todo_action}</TableCell>
                                        <TableCell>{String(todo.completed) == 'true' ? '完成' : '未完成'}</TableCell>
                                        <TableCell>{todo.deadline?.toDate().toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right ">{todo.created_at?.toDate().toLocaleDateString()}</TableCell>
                                        <TableCell className='flexCenter gap-2'>
                                            <DeleteDialog
                                                onClick={() => deleteTodo(todo.todo_id)}
                                            >
                                                <DeleteIcon />
                                            </DeleteDialog>
                                            <Button
                                                size={"lg"}
                                                variant={"outline"}
                                                className='hover:cursor-pointer'
                                                onClick={() => handleEditMode(index , todo.todo_id)}
                                            >
                                                <EditIcon /><span>編集</span>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                        )
                    })}
                </TableBody>
            </Table>

        </div>
    )
}

export default TodoList