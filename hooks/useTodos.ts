import { UseQueryResult, useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useTodos (): UseQueryResult<any, any> {
	return useQuery<any, any, any, string[]>(['todos'], async () => {
		const { data } = await axios.get(
			'https://localhost:7108/todoitems'
		)
		return data
	})
}
