import React from 'react';
import useUpdateTodo from '../hooks/useUpdateTodo';
import TodoType from '../types/Todo';
import TodoForm from './TodoForm';


const EditTodoForm = ({todo, toggleEdit}: {todo: TodoType, toggleEdit: ()=> void }) => {
	const {mutate: update } = useUpdateTodo();
	
	function onSubmit(todo: TodoType): void {
		update(todo);
		toggleEdit();
	}

	return (
		<div>
			<h2>Edit Todo</h2>
			<TodoForm onSubmit={onSubmit} todo={todo} />
		</div>
	);
};

export default EditTodoForm;
