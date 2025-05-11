"use client"
import React, { useState } from 'react'
import TodoForm from './TodoForm'
import { Button } from './ui/button'

const TodoList = () => {
    const [ formOpen , setFormOpen ] = useState(false)
    return (
        <div className='p-2 m-4 border-4 flexCenter flex-col'>
            <Button variant="outline" className='hover:cursor-pointer'onClick={() => setFormOpen(!formOpen)}>Form</Button>
            {formOpen && <TodoForm/>}
        </div>
    )
}

export default TodoList