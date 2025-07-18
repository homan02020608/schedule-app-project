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


const formSchema = z.object({
    recruit_selection: z.string().min(1),
    result: z.string(),
})


const AddRecruitFlowButton = ({ companyId, userId }: { companyId: string; userId: string | null }) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recruit_selection: "",
        }

    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const { recruit_selection, result } = values
        addRecruitFlow({ recruit_selection, result, companyId, userId })
        window.location.reload()
    }
    return (
        <div className=' '>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='link' className='hover:cursor-pointer '>選考フロー追加はこちら</Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Process Form</SheetTitle>
                        <SheetDescription>
                            Please Enter Your Process
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col p-4">
                            <FormField
                                control={form.control}
                                name='recruit_selection'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>選考フロー</FormLabel>
                                        <FormControl>
                                            <Input placeholder='selection' {...field} />
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
                                name='result'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>選考結果</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} >
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