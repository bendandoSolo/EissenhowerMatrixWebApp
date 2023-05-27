/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Button from '@mui/material/Button'

import AddTodoForm from '../Todo/AddTodoForm'
import useToggle from '../../hooks/useToggle'
import useTodos from '../../hooks/useTodos'
import TodoType from '../../types/Todo'

import TodoItemView from '../Todo/TodoItemView'

const TodoList = (): JSX.Element => {
	const [open, close, toggle] = useToggle()
	const [openEdit, closeEdit, toggleEdit] = useToggle()
	const { status, data, error } = useTodos() // isFetching

	const isIncomplete = (todo: TodoType): boolean => todo.completionDate === null;

	const openCreateTodo = (): void => {
		toggle()
		closeEdit()
	}

	return (
		<div className='p-24'>
			<div className='mb24'><h2 >Todo List</h2></div>
			{open && <AddTodoForm/>}
			<Button className="d-block" color="primary" variant="contained" onClick={openCreateTodo}>Create New</Button>
			{status === 'loading'
				? ('Loading...')
				: status === 'error'
					? (<span>Error: {error.message}</span>)
					: (
						<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
							<nav aria-label="main mailbox folders">
								<List>
									{data.filter(isIncomplete).map((item: TodoType) => (
										<ListItem key={item.id} disablePadding>
											<ListItemButton>
												<TodoItemView item={item} canEdit={true}/>
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
