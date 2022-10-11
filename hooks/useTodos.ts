import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export default function useTodos() {
	return useQuery<any,any, any, string[]>(["getTodos"], async () => {
	  const { data } = await axios.get(
		 'https://localhost:7108/todoitems'
	  );
	  return data;
	});
 }

