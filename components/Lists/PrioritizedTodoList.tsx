/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox';

import AddTodoForm from '../Todo/AddTodoForm'
import useToggle from '../../hooks/useToggle'
import useTodos from '../../hooks/useTodos'
import TodoType from '../../types/Todo'

import TodoItemView from '../Todo/TodoItemView'
import priorityEnum from '../../types/PriorityEnumType'

const PrioritizedTodoList = ({ priority }: { priority: number }): JSX.Element => {
	const [open, close, toggle] = useToggle()
	const [openEdit, closeEdit, toggleEdit] = useToggle()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { status, data, error, isFetching } = useTodos();

	const isIncomplete = (todo: TodoType): boolean => todo.completionDate === null;
	const hasPriority = (todo: TodoType): boolean => todo.priority === priority;

	const openCreateTodo = (): void => {
		toggle()
		closeEdit()
	}

	return (
		<div className='p-24'>
			<div className='mb24'><h2 >{priorityEnum[priority]}</h2></div>
			{open && <AddTodoForm/>}
			< Button className="d-block" color="primary" variant="contained" onClick={openCreateTodo}><AddBoxIcon/></Button>
			{status === 'loading'
				? ('Loading...')
				: status === 'error'
					? (<span>Error: {error.message}</span>)
					: (
						<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
							<nav aria-label="main mailbox folders">
								<List>
									{data.filter(isIncomplete).filter(hasPriority).map((item: TodoType) => (
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

export default PrioritizedTodoList;
