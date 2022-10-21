import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { truncateSync } from 'fs';
import TodoType from '../types/Todo';

export default function useCreateTodo() {
	const queryClient = useQueryClient();

	return useMutation( async (todo:TodoType) => {
		let response  = await axios.put(`https://localhost:7108/todoitems/${todo.id}`,
			 todo
		 );
		 queryClient.invalidateQueries(['todos'], )
		 return response;
	 })

 }
