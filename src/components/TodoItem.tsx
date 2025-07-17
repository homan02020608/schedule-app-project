import React, { useState } from 'react'
import { deleteTodoItem, editTodoItem } from '../../firebase/firebaseFunction'
import { TodoListData } from '@/app/Types'
import {
    TableCell,
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
    FormField,
    FormItem,

} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import CancelIcon from '@mui/icons-material/Cancel';

const FormSchema = z.object({
    todo_action: z.string().min(1),
    completed: z.string(),
})


const TodoItem = ({ todo_id, todo_action, completed, deadline, created_at }: TodoListData) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            todo_action: todo_action,
            completed: completed
        }
    })

    const deleteTodo = (todo_id: string | undefined) => {
        deleteTodoItem(todo_id)
        window.location.reload()
    }

    const handleEditMode = () => {
        setIsEditMode(true)
    }

    const handleCancelEditMode = () => {
        setIsEditMode(false);
        form.reset()
    }

    const handleSubmitEditedTodo = (values: z.infer<typeof FormSchema>) => {
        setLoading(true)
        const { todo_action, completed } = values;
        editTodoItem({ todo_id, todo_action, completed })
        window.location.reload()
        setLoading(false)
        setIsEditMode(false)
    }
    console.log("completed", completed)
    return (
        <>
            <TableRow>
                {isEditMode ? (
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
                                                    placeholder='todoItems'

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
                ) : (
                    <TableCell className="font-medium">{todo_action}</TableCell>
                )}

                {isEditMode ? (
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
                                                        <SelectValue placeholder={String(completed) == 'true' ? '完成' : '未完成'} />
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
                ) : (
                    <TableCell>{String(completed) == 'true' ? '完成' : '未完成'}</TableCell>
                )}


                <TableCell>{deadline?.toDate().toLocaleDateString()}</TableCell>
                <TableCell className="text-right ">{created_at?.toDate().toLocaleDateString()}</TableCell>

                {isEditMode ? (
                    <TableCell className='flexCenter gap-2'>
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
                ) : (
                    <TableCell className='flexCenter gap-2'>
                        <DeleteDialog
                            onClick={() => deleteTodo(todo_id)}
                        >
                            <DeleteIcon />
                        </DeleteDialog>
                        <Button
                            size={"lg"}
                            variant={"outline"}
                            className='hover:cursor-pointer'
                            onClick={() => handleEditMode()}
                        >
                            <EditIcon /><span>編集</span>
                        </Button>
                    </TableCell>
                )}

            </TableRow>
        </>
    )
}

export default TodoItem