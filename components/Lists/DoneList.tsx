import React from 'react'
import useTodos from '../../hooks/useTodos'
import { Box, List, ListItem } from '@mui/material'
import TodoType from '../../types/Todo'
import TodoItemView from '../Todo/TodoItemView'

const DoneList = (): JSX.Element => {
	const { status, data, error, isFetching } = useTodos();
	const isComplete = (todo: TodoType): boolean => todo.completionDate !== null

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
											<TodoItemView item={item} canEdit={false}/>
										</ListItem>
									))}
								</List>
							</nav>
						</Box>
					)}
		</div>
	)
}

export default DoneList;
