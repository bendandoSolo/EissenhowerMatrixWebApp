import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm} from 'react-hook-form';
import Button from '@mui/material/Button';

const AddTodoForm = () => {

	const {
		register,
		handleSubmit,
		formState: { errors },
	 } = useForm();

	 const onSubmit = (data: any) => {
		console.log(JSON.stringify(data));
	 }



	return (
		<div className='p-24'>
			<form onSubmit={handleSubmit(data => onSubmit(data))}>
				<TextField label="Name" variant="outlined" {...register('name')}/>
				{errors.name && <p>Name is required.</p>}
				{/* <TextField id="filled-basic" label="Filled" variant="filled" />
				<TextField id="standard-basic" label="Standard" variant="standard" /> */}
				<Button variant="contained" color="success" type='submit'>Add Todo</Button>
			</form>
		</div>
	);
};

export default AddTodoForm;