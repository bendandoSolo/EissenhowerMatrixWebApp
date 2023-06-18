import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useCreateTodo (): any {
	const queryClient = useQueryClient();

	return useMutation(async newTodo => {
		const response = await axios.post(
			'https://localhost:7108/todoitems',
			newTodo
		);
		await queryClient.invalidateQueries(['todos'])
		return response;
	})
 }
