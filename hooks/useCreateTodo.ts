//import {useQuery} from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function useCreateTodo() {
	
	// return useMutation(["createTodo"], async (todoData: any) => {
	// 	console.log(`todoData ${todoData}`);	
	// 	if (todoData != null) {
	// 		let response  = axios.post(
	// 			'https://localhost:7108/todoitems',
	// 			todoData
	// 		);
	//   		return response;
	// 	}
	// });

	 return useMutation(newTodo => {
		let response  = axios.post(
			'https://localhost:7108/todoitems',
			newTodo
		 );
		 //useQueryClient().invalidateQueries(['useTodos']);
		 return response;
		 console.log('response', response);
	 })
 }

