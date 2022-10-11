//import {useQuery} from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useCreateTodo() {
	const queryClient = useQueryClient();

	 return useMutation( async newTodo => {
		let response  = await axios.post(
			'https://localhost:7108/todoitems',
			 newTodo
		 );
		 queryClient.invalidateQueries(['todos'], )
		 return response;
	 })
 }

