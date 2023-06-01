import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import TodoType from '../types/Todo'

export default function useUpdateTodo (): any {
	const queryClient = useQueryClient()

	return useMutation(async (todo: TodoType) => {
		console.log(JSON.stringify(todo));

		const response = await axios.put(`https://localhost:7108/todoitems/${todo.id}`,
			todo
		)
		await queryClient.invalidateQueries(['todos'])
		return response
	})
}
