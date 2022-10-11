import React from 'react';
import axios from 'axios';
import useTodos from '../hooks/useTodos';

const APITests = () => {

	const { status, data, error, isFetching } = useTodos();

	const getAll = async () => {	
		try {		
		   let response = await axios.get('https://localhost:7108/todoitems')	
		} catch (err) {		
			console.log(err);
		}
	}
	
	return (
		<div>
			<h2>Test Communication with local API</h2>
			{status === "loading" ? (
          "Loading..."
				) : status === "error" ? (
					// @ts-ignore
					<span>Error: {error.message}</span>
				) : (
          <>
			 {JSON.stringify(data)}
			 </>
			)}
			<ul>
				<li><button onClick={getAll}>Get All</button></li>
			</ul>
		</div>
	);
};

export default APITests;