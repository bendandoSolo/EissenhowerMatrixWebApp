
import React, { useEffect, useState} from 'react';
import { useForm} from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import TodoType from '../types/Todo';

//not allowing to edit isComplete
const TodoForm = ({onSubmit, todo}:{onSubmit: (data: TodoType) => void, todo: TodoType | undefined }) => {
	const [disabled, setDisabled] = useState(!!todo ? true : false);

	const changed = () => {
		if(disabled === true){
			setDisabled(false);
		}
	}

	useEffect(() => {
		console.log(JSON.stringify(todo));
		if (todo) {
			setValue('name', todo.name);
			setValue('description', todo.description);
			setValue('id', todo.id);
		}
  }, [todo]);

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		getValues,
		formState: { errors },
	 } = useForm<TodoType>();

	return (
		<form className='flex-column max-width-250 bg-darkblue' onChange={changed} onSubmit={handleSubmit(data => onSubmit(data))}>
				<input type="hidden" {...register("id")} />
				<TextField className='p-6' label="Name" variant="outlined" {...register("name", { required: true, minLength: 3 })} />
				{errors.name && <p className='error p-6' >Name must be at least 3 characters long</p>}
				<TextField className='p-6' label="Description" variant="outlined" {...register("description", { minLength: 12 })} />
				{errors.description && <p className='error p-6' >Description must be at least 12 characters long</p>}
				<Button className='p-6' variant="contained" color="secondary" type='submit' disabled={disabled}
				>{!!todo ? "Edit" : "Add"} Todo</Button>
			</form>
	);
};

export default TodoForm;