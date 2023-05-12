
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Button, Checkbox, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import TaskIcon from '@mui/icons-material/Task'
import DeleteIcon from '@mui/icons-material/Delete'
import TodoType from '../types/Todo';

import useDeleteTodo from '../hooks/useDeleteTodo';
import useUpdateTodo from '../hooks/useUpdateTodo';

interface TodoItemViewProps {
    item: TodoType
}


const TodoItemView: React.FC<TodoItemViewProps> = ({ item }) => {
    
    const { mutate } = useDeleteTodo() 
	const { mutate: update } = useUpdateTodo()
	const deleteTodo = (id: number): void => { mutate(id) }

    const toggleIsComplete = (todo: TodoType): void => {
		todo.completionDate = (todo.completionDate == null) ? new Date() : undefined
		update(todo)
	}

    return(
        <>
            <ListItemButton>
                <TaskIcon />
                <ListItemText primary={item.name} />
                <ListItemText primary={item.description} />
                <Button color="primary" onClick={() => { deleteTodo(item.id); } }><DeleteIcon /></Button>
                {/* <Button onClick={ () => { editTodo(item) } } ><EditIcon/></Button> */}
                <Checkbox checked={!!item.completionDate} onClick={() => { toggleIsComplete(item); } } />
            </ListItemButton>
        </>
    )
}

export default TodoItemView;