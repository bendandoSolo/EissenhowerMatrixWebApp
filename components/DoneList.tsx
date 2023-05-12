import React from 'react'
import useTodos from '../hooks/useTodos'
import { Box, Button, Checkbox, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import TaskIcon from '@mui/icons-material/Task'
import DeleteIcon from '@mui/icons-material/Delete'
import TodoType from '../types/Todo'
import useDeleteTodo from '../hooks/useDeleteTodo'
import useUpdateTodo from '../hooks/useUpdateTodo'

const DoneList = (): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { status, data, error, isFetching } = useTodos()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isLoading, isError, isSuccess, mutate } = useDeleteTodo()
	const deleteTodo = (id: number): void => { mutate(id) }
	const { mutate: update } = useUpdateTodo();
	const isComplete = (todo: TodoType): boolean => todo.completionDate !== null

	const toggleIsComplete = (todo: TodoType): void => {
		todo.completionDate = (todo.completionDate == null) ? new Date() : undefined
		update(todo)
	}

	return (
		<div className='p-24'>
			<h2>Done List</h2>
			{status === 'loading'
				? ('Loading...')
				: status === 'error'
					? (<span>Error: {error.message}</span>)
					: 					(
						<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
							<nav aria-label="main mailbox folders">
								<List>
									{data.filter(isComplete).map((item: TodoType) => (
										<ListItem key={item.id} disablePadding>
											<ListItemButton>
												<TaskIcon/>
												<ListItemText primary={item.name} />
												<ListItemText primary={item.description} />
												<Button color="primary" onClick={ () => { deleteTodo(item.id) } } ><DeleteIcon/></Button>
												{/* <Button onClick={ () => { editTodo(item) } } ><EditIcon/></Button> */}
												<Checkbox checked={!!item.completionDate} onClick={ () => { toggleIsComplete(item) } } />
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

export default DoneList
