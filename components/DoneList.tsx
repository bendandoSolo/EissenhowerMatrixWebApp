import React from 'react'
import useTodos from '../hooks/useTodos'
import { Box, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import TaskIcon from '@mui/icons-material/Task'
import DeleteIcon from '@mui/icons-material/Delete'
import TodoType from '../types/Todo'
import useDeleteTodo from '../hooks/useDeleteTodo'

const DoneList = (): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { status, data, error, isFetching } = useTodos()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { isLoading, isError, isSuccess, mutate } = useDeleteTodo()
	const deleteTodo = (id: number): void => { mutate(id) }
	const isComplete = (todo: TodoType): boolean => todo.completionDate !== null

	return (
		<div className='p-24'>
			<h2>Done Todo&apos;s</h2>
			<p>Primary goal is to display a filtered set of todos here</p>
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
												{/* <Button onClick={ () => { editTodo(item) } } ><EditIcon/></Button>
												<Checkbox value={item} onClick={ () => { toggleIsComplete(item) } } /> */}
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
