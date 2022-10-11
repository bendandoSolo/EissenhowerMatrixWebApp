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

import TodoType from '../types/Todo';


const TodoList= () => {

	const [open, toggle] = useToggle();

	const { status, data, error, isFetching } = useTodos();

	const {isLoading, isError, isSuccess, mutate} = useDeleteTodo();

	const deleteTodo = (id: number) => {
		mutate(id);
	}

  return (
	<>
	<h2>Todo List</h2>
	{open && <AddTodoForm/>}
	<Button variant="contained" onClick={toggle}>Add Todo</Button>
	{status === "loading" ? (
          "Loading..."
				) : status === "error" ? (
					<span>Error: {error.message}</span>
				) : (
				<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
					<nav aria-label="main mailbox folders">
					<List>
						{data.map((item: TodoType) => (	
						<ListItem key={item.id} disablePadding>
							<ListItemButton>
								<TaskIcon/>
								<ListItemText primary={item.name} />
								<ListItemText primary={item.description} />
								<Button onClick={() => {deleteTodo(item.id)} }><DeleteIcon/></Button>
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