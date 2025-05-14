"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
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
import { z } from 'zod'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from './ui/input'
import { addRecruitFlow } from '../../firebase/firebaseFunction'

type SelectionFlow = {
    selection_name?: string
    completed?: string
    id?: string
}

type RecruitFlowData = {
    recruitFlowData: SelectionFlow[];
}

const formSchema = z.object({
    selection_name: z.string().min(1),
    completed: z.string(),
})

const testingData = [
    { selection_name: "書類選考", completed: "true" },
    { selection_name: "一次面接", completed: "true" },
    { selection_name: "二次面接", completed: "true" },
]

const AddRecruitFlowButton : React.FC<RecruitFlowData> = ( {recruitFlowData} ) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selection_name: "",
        }

    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { selection_name, completed } = values;
        let testing = [...testingData, { ...values }]
        addRecruitFlow(testing)
        window.location.reload()
    }

    console.log(recruitFlowData)
    return (
        <div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='link' className='hover:cursor-pointer '>Add Process</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Process Form</SheetTitle>
                        <SheetDescription>
                            Please Enter Your TodoItem
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-4">
                            <FormField
                                control={form.control}
                                name='selection_name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Process</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Todo' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter Your New Process
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
                                        <FormLabel>選考状況</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select " />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">合</SelectItem>
                                                    <SelectItem value="false">落</SelectItem>
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

                            <Button type='submit'>Submit</Button>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default AddRecruitFlowButton