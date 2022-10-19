import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import useToggle from '../hooks/useToggle';
import AddTodoForm from './AddTodoForm';
import useTodos from '../hooks/useTodos';
import useDeleteTodo from '../hooks/useDeleteTodo';
import useUpdateTodo from '../hooks/useUpdateTodo';

import TodoType from '../types/Todo';
import CheckBoxType from '../types/CheckBox';

import { Checkbox } from '@mui/material';

const TodoList= () => {

	const [open, toggle] = useToggle();
	const { status, data, error, isFetching } = useTodos();
	const {isLoading, isError, isSuccess, mutate} = useDeleteTodo();
	const [ update] = useUpdateTodo();

	const deleteTodo = (id: number) => {
		mutate(id);
	}

	const markComplete = (event: React.MouseEvent<any>) => {
		  // @ts-ignore
		  console.log(event.target.checked!); // Working
		   // @ts-ignore
		  let todoId = event.target.value;
		  let todo = data.find((todo: TodoType) => todo.id === parseInt(todoId));
		  todo.completionDate = Date.now();
		  update(todo);
	}

  return (
	<>
	<h2>Todo List</h2>
	{open && <AddTodoForm/>}
	<Button variant="contained" onClick={toggle}>Add Todo</Button>
	{status === "loading" ? ("Loading...") :
	 			status === "error" ? (<span>Error: {error.message}</span>)
				: 
				(
				<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
					<nav aria-label="main mailbox folders">
					<List>
						{data.map((item: TodoType) => (	
						<ListItem key={item.id} disablePadding>
							<ListItemButton>
								<TaskIcon/>
								<ListItemText primary={item.name} />
								<ListItemText primary={item.description} />
								<Button onClick={ () => {deleteTodo(item.id)} } ><DeleteIcon/></Button>
								<Checkbox value={item.id} onClick={ (event: React.MouseEvent<any>) => {markComplete( (event) )} } />
							</ListItemButton>
						</ListItem>
						))}
					</List>
					</nav>
				</Box>
			)}
	</>
  );
}

export default TodoList;