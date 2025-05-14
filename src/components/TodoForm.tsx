"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { format } from "date-fns"
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { CalendarIcon } from "lucide-react"
import { Calendar } from './ui/calendar'
import { addTodoFormData } from '../../firebase/firebaseFunction'


const formSchema = z.object({
    action_name: z.string().min(1),
    completed: z.string(),
    deadline: z.date()
})

const TodoForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            action_name: "",
        }

    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { action_name, completed, deadline } = values;

        addTodoFormData({ action_name, completed, deadline })
        window.location.reload()
        //console.log("Input Values:", values)
    }

    return (
        <div className='w-full flexEnd border-b-4 border-gray-400'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='link'  className='hover:cursor-pointer '>Add Todo</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Todo Form</SheetTitle>
                        <SheetDescription>
                            Please Enter Your TodoItem
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-4">
                            <FormField
                                control={form.control}
                                name='action_name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Action</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Todo' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter Your Todo Items
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='completed'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>タスク完成状況</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select " />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">完成</SelectItem>
                                                    <SelectItem value="false">未完成</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Please Select
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='deadline'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of deadline</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, 'PPP')
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-auto p-0' align='start'>
                                                <Calendar
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Please Select
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit'>Submit</Button>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>


        </div>
    )
}

export default TodoForm