
// import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import React from 'react'
import { Button, Checkbox, ListItemButton, ListItemText } from '@mui/material'
import { Task as TaskIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import TodoType from '../../types/Todo'
import useDeleteTodo from '../../hooks/useDeleteTodo'
import useUpdateTodo from '../../hooks/useUpdateTodo'
import useToggle from '../../hooks/useToggle'
import EditTodoForm from './EditTodoForm'

interface TodoItemViewProps {
    item: TodoType
    canEdit: boolean
}

const TodoItemView: React.FC<TodoItemViewProps> = ({ item, canEdit }) => {
    const [selectedTodo, setSelectedTodo] = React.useState<TodoType>()
    const [openEdit, closeEdit, toggleEdit] = useToggle()
    const { mutate } = useDeleteTodo() 
	const { mutate: update } = useUpdateTodo()
	const deleteTodo = (id: number): void => { mutate(id) }

    const toggleIsComplete = (todo: TodoType): void => {
		todo.completionDate = (todo.completionDate == null) ? new Date() : undefined;
		update(todo);
	}

    const editTodo = (todo: TodoType): void => {
        setSelectedTodo(todo)
        toggleEdit()
        close()
    }

    return(
        <>
            <ListItemButton>
                <TaskIcon />
                <ListItemText primary={item.name} />
                <ListItemText primary={item.description} />
                <Button color="primary" onClick={() => { deleteTodo(item.id); } }><DeleteIcon /></Button>

                {canEdit && <Button onClick={ () => { editTodo(item) } } ><EditIcon/></Button> }
                <Checkbox checked={!!item.completionDate} onClick={() => { toggleIsComplete(item); } } />
            </ListItemButton>
            {openEdit && <EditTodoForm todo={selectedTodo!} toggleEdit={toggleEdit}/>}
        </>
    )
}

export default TodoItemView;