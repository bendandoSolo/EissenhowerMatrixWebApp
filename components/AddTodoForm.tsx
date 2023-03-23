import React from 'react';
import TextField from '@mui/material/TextField';
import { useForm} from 'react-hook-form';
import Button from '@mui/material/Button';

import useCreateTodo from '../hooks/useCreateTodo';
interface IFormInput {
  name: string
  description: string
}

const AddTodoForm = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
	 } = useForm<IFormInput>();

	 const {isLoading, isError, isSuccess, mutate} = useCreateTodo();
	 
	 const onSubmit = async (data: any) => {
    mutate(data);
    reset();
	 }

  return (
		<div className='p-24 bg-white max-width-300'>
			<form className='flex-column max-width-250' onSubmit={handleSubmit(data => onSubmit(data))}>
				<TextField className='p-6' label="Name" variant="outlined" {...register("name", { required: true, minLength: 3 })} />
				{errors.name && <p className='error p-6' >Name must be at least 3 characters long</p>}
				<TextField className='p-6' label="Description" variant="outlined" {...register("description", { minLength: 12 })} />
				{errors.description && <p className='error p-6' >Description must be at least 12 characters long</p>}
				<Button className='p-6' variant="contained" color="success" type='submit'>Add Todo</Button>
			</form>
		</div>
  );
};

export default AddTodoForm;