/* eslint-disable @typescript-eslint/no-misused-promises */
// error on handle submit
import React from 'react'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'

import useCreateTodo from '../../hooks/useCreateTodo'
interface IFormInput {
  name: string
  description: string
}

const AddTodoForm = ({ priority }: { priority: number | null }): JSX.Element => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IFormInput>()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isLoading, isError, isSuccess, mutate } = useCreateTodo()

	const onSubmit = async (data: any): Promise<any> => {
		data.priority = priority ?? 0;
		mutate(data);
		reset();
	}

	return (
		<div className='p-24 bg-white max-width-300'>
			<form className='flex-column max-width-250' onSubmit={ handleSubmit(async data => await onSubmit(data)) }>
				<TextField className='p-6' label="Name" variant="outlined" {...register('name', { required: true, minLength: 3 })} />
				{(errors.name != null) && <p className='error p-6' >Name must be at least 3 characters long</p>}
				<TextField className='p-6' label="Description" variant="outlined" {...register('description', { minLength: 12 })} />
				{(errors.description != null) && <p className='error p-6' >Description must be at least 12 characters long</p>}
				<Button className='p-6' variant="contained" color="success" type='submit'>Add Todo</Button>
			</form>
		</div>
	)
}

export default AddTodoForm
