
import React, { useEffect } from 'react';
import { useForm} from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import TodoType from '../types/Todo';

//not allowing to edit isComplete
const TodoForm = ({onSubmit, todo}:{onSubmit: (data: TodoType) => void, todo: TodoType | undefined }) => {

	useEffect(() => {
		if (todo) {
			setValue('name', todo.name);
			setValue('description', todo.description);
		}
  }, [todo]);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	 } = useForm<TodoType>();

	return (
		<form className='flex-column max-width-250' onSubmit={handleSubmit(data => onSubmit(data))}>
				<TextField className='p-6' label="Name" variant="outlined" {...register("name", { required: true, minLength: 3 })} />
				{errors.name && <p className='error p-6' >Name must be at least 3 characters long</p>}
				<TextField className='p-6' label="Description" variant="outlined" {...register("description", { minLength: 12 })} />
				{errors.description && <p className='error p-6' >Description must be at least 12 characters long</p>}
				<Button className='p-6' variant="contained" color="success" type='submit'>Add Todo</Button>
			</form>
	);
};

export default TodoForm;