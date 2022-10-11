import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useCreateTodo() {
	const queryClient = useQueryClient();

	 return useMutation( async (id:number) => {
		 let response  = await axios.delete(`https://localhost:7108/todoitems/${id}`)
		 queryClient.invalidateQueries(['todos'], );
		 return response;
	 })
 }

