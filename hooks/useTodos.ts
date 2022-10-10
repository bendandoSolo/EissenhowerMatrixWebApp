import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

export default function useTodos() {
	return useQuery(["posts"], async () => {
	  const { data } = await axios.get(
		 'https://localhost:7108/todoitems'
	  );
	  return data;
	});
 }

