import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { truncateSync } from 'fs';
import TodoType from '../types/Todo';

export default function useCreateTodo() {
	const queryClient = useQueryClient();

	// id: number;
	// name: string;
	// description?: string;
	// completionDate?: Date;

	// return useMutation( async (id:number) => {
	// 	let response  = await axios.delete(`https://localhost:7108/todoitems/${id}`)
	// 	queryClient.invalidateQueries(['todos'], );
	// 	return response;
	// })

	return useMutation( async (todo:TodoType) => {
		let response  = await axios.put(`https://localhost:7108/todoitems/${todo.id}`,
			 todo
		 );
		 queryClient.invalidateQueries(['todos'], )
		 return response;
	 })


	//  useMutation( async ({id, name, description, completionDate}: TodoType) => {
	// 	 return true;
	// 	// const todo = new TodoType(id, name, description, completionDate);

	// 	//  let response  = await axios.put(`https://localhost:7108/todoitems/${todo?.id}`,
	// 	//  todo
	// 	//  );
	// 	//  queryClient.invalidateQueries(['todos'], );
	// 	//  return response;
	//  })

	//  return [useMutation];
 }
