/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
// import axios from 'axios'
import useTodos from '../hooks/useTodos'

const APITests = (): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { status, data, error, isFetching } = useTodos()
	// const getAll = async (): Promise<any> => {
	// 	try {
	// 		// const response =
	// 		await axios.get('https://localhost:7108/todoitems')
	// 	} catch (err) {
	// 		console.log(err)
	// 	}
	// }

	return (
		<div>
			<h2>Test Communication with local API</h2>
			{status === 'loading'
				? (
					'Loading...'
				)
				: status === 'error'
					? (
						<span>Error: {error.message}</span>
					)
					: (
						<p>{ JSON.stringify(data) }</p>
					)}
			{/* <ul>
				<li><button onClick={ getAll }>Get All</button></li>
			</ul> */}
		</div>
	)
}

export default APITests
