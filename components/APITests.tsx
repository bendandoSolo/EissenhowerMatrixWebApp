import React from 'react';
import axios from 'axios';

// This is a test component to test the API. Initially calling from the component, then using react query.
const APITests = () => {

	const getAll = async () => {
		const response = await fetch('https://localhost:7108/todoitems',
			{
				method: 'GET', headers: {
					'Content-Type': 'application/json', Accept: 'application/json'
				},
				//mode: 'no-cors', // no-cors
			});
		try {
			var data = await response.json();
			console.log(data);
			console.log(JSON.stringify(data));
			console.log(`response: ${JSON.stringify(Object.getOwnPropertyNames(response))}`);
			console.log(response.status);
			console.log(response.statusText);
		} catch (err) {
			console.log(err);
		}
	}

	const getAllAxios = async () => {	
		try {		
		   let response = await axios.get('https://localhost:7108/todoitems')				
				console.log(response.data);
				console.log(response.status);
				console.log(response.statusText);
		} catch (err) {		
			console.log(err);
		}
	}
	
	return (
		<div>
			<h2>Test Communication with local API</h2>

			<ul>
				<li><button onClick={getAll}>Get All</button></li>
				<li><button onClick={getAllAxios}>Get All</button></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
	);
};

export default APITests;