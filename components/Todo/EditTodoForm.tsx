import React from 'react'
import useUpdateTodo from '../../hooks/useUpdateTodo'
import TodoType from '../../types/Todo'
import TodoForm from './TodoForm'

const EditTodoForm = ({ todo, toggleEdit }: { todo: TodoType, toggleEdit: () => void }): JSX.Element => {
	const { mutate: update } = useUpdateTodo()

	function onSubmit (todo: TodoType): void {
		update(todo)
		toggleEdit()
	}

	return (
		<div style={{ zIndex: '100', position: 'absolute', top: '75px' }}>
			<TodoForm onSubmit={onSubmit} todo={todo} />
		</div>
	)
}

export default EditTodoForm;
