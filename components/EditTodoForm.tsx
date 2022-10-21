import React from 'react';
import TodoType from '../types/Todo';
import TodoForm from './TodoForm';


const EditTodoForm = ({todo}: {todo: TodoType }) => {

	function onSubmit(data: TodoType): void {
		alert(JSON.stringify(data));
	}

	return (
		<div>
			<h2>Edit Todo</h2>
			<p>{JSON.stringify(todo)}</p>
			<TodoForm onSubmit={onSubmit} todo={todo} />
		</div>
	);
};

export default EditTodoForm;
