"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Input } from '@mui/material'
import { useAppSelector } from '@/redux/store'
import { addCompanyFormData } from '../../firebase/firebaseFunction'

const formSchema = z.object({
    company_name: z.string().min(1),
    deadline: z.date(),
})

const AddCompanyForm = () => {
    const user = useAppSelector((state) => state.user.user)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company_name: ''
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { company_name, deadline } = values
        const userId = user?.id
        addCompanyFormData({ userId, company_name, deadline })
        window.location.reload()
    }
    return (
        <div className='w-full flexEnd border-b-4 border-gray-400'>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='link' className='hover:cursor-pointer '>Add Company</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Company Form</SheetTitle>
                        <SheetDescription>
                            Please Enter Your Entried Company
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-4">
                            <FormField
                                control={form.control}
                                name='company_name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company_name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='会社名' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter Company Name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="deadline"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Deadline</FormLabel>
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
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0 index" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    //onDayClick={field.onChange}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormDescription>
                                            Your date of birth is used to calculate your age.
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

export default AddCompanyForm