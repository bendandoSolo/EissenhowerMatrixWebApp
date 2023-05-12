import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

// should add better type checking for the return value
export default function useCreateTodo (): any {
	const queryClient = useQueryClient()

	return useMutation(async (id: number) => {
		const response = await axios.delete(`https://localhost:7108/todoitems/${id}`)
		await queryClient.invalidateQueries(['todos'])
		return response
	})
}
