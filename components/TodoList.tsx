/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
// import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
// import Divider from '@mui/material/Divider'
import TaskIcon from '@mui/icons-material/Task'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'

import AddTodoForm from './AddTodoForm'
import EditTodoForm from './EditTodoForm'
import useToggle from '../hooks/useToggle'
import useTodos from '../hooks/useTodos'
import useDeleteTodo from '../hooks/useDeleteTodo'
import useUpdateTodo from '../hooks/useUpdateTodo'
import TodoType from '../types/Todo'

import { Checkbox } from '@mui/material'

const TodoList = (): JSX.Element => {
	const [selectedTodo, setSelectedTodo] = React.useState<TodoType>()
	const [open, close, toggle] = useToggle()
	const [openEdit, closeEdit, toggleEdit] = useToggle()
	const { status, data, error } = useTodos() // isFetching
	const { mutate } = useDeleteTodo() // isLoading, isError, isSuccess,
	const { mutate: update } = useUpdateTodo()
	const deleteTodo = (id: number): void => { mutate(id) }
	// this needs to be removed
	const isIncomplete = (todo: TodoType): boolean => todo.completionDate === null;

	const toggleIsComplete = (todo: TodoType): void => {
		todo.completionDate = (todo.completionDate == null) ? new Date() : undefined
		update(todo)
	}

	const editTodo = (todo: TodoType): void => {
		setSelectedTodo(todo)
		toggleEdit()
		close()
	}

	const openCreateTodo = (): void => {
		toggle()
		closeEdit()
	}

	return (
		<div className='p-24'>
			<div className='mb24'><h2 >Todo List</h2></div>
			{open && <AddTodoForm/>}
			{openEdit && <EditTodoForm todo={ selectedTodo! } toggleEdit={toggleEdit}/>}
			<Button className="d-block" color="primary" variant="contained" onClick={openCreateTodo}>Create New</Button>
			{status === 'loading'
				? ('Loading...')
				: status === 'error'
					? (<span>Error: {error.message}</span>)
					: (
						<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
							<nav aria-label="main mailbox folders">
								<List>
									{/* {data.filter(isIncomplete).map((item: TodoType) => ( */}
									{data.filter(isIncomplete).map((item: TodoType) => (
										<ListItem key={item.id} disablePadding>
											<ListItemButton>
												<TaskIcon/>
												<ListItemText primary={item.name} />
												<ListItemText primary={item.description} />
												<Button color="primary" onClick={ () => { deleteTodo(item.id) } } ><DeleteIcon/></Button>
												<Button onClick={ () => { editTodo(item) } } ><EditIcon/></Button>
												<Checkbox value={!!item.completionDate} onClick={ () => { toggleIsComplete(item) } } />
											</ListItemButton>
										</ListItem>
									))}
								</List>
							</nav>
						</Box>
					)}
		</div>
	)
}

export default TodoList
