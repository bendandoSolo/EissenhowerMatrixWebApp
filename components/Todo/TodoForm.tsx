/* eslint-disable @typescript-eslint/no-misused-promises */

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'
import TodoType from '../../types/Todo'

// not allowing to edit isComplete
const TodoForm = ({ onSubmit, todo }: { onSubmit: (data: TodoType) => void, todo: TodoType | undefined }): JSX.Element => {
	const [disabled, setDisabled] = useState((todo != null))

	const changed = (): void => {
		if (disabled) {
			setDisabled(false)
		}
	}

	const {
		register,
		handleSubmit,
		setValue,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		reset,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		getValues,
		formState: { errors }
	} = useForm<TodoType>()

	useEffect(() => {
		console.log(JSON.stringify(todo))
		if (todo != null) {
			setValue('name', todo.name)
			setValue('description', todo.description)
			setValue('id', todo.id)
		}
	}, [setValue, todo])

	return (
		<form className='flex-column max-width-250 bg-darkblue' onChange={changed} onSubmit={handleSubmit(data => onSubmit(data))}>
			<input type="hidden" {...register('id')} />
			<TextField className='p-6' label="Name" variant="outlined" {...register('name', { required: true, minLength: 3 })} />
			{(errors.name != null) && <p className='error p-6' >Name must be at least 3 characters long</p>}
			<TextField className='p-6' label="Description" variant="outlined" {...register('description', { minLength: 12 })} />
			{(errors.description != null) && <p className='error p-6' >Description must be at least 12 characters long</p>}
			<Button className='p-6' variant="contained" color="secondary" type='submit' disabled={disabled}
			>{(todo != null) ? 'Edit' : 'Add'} Todo</Button>
		</form>
	)
}

export default TodoForm
