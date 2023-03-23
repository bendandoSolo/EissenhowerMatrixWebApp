import React from 'react'
import axios from 'axios'
import useTodos from '../hooks/useTodos'

const APITests = (): JSX.Element => {
	// eslint-disable-next-line no-tabs
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { status, data, error, isFetching } = useTodos()
   const getAll = async (): void => {
    try {
		const response = await axios.get('https://localhost:7108/todoitems')	
    } catch (err) {
      console.log(err)
		console.log(response)
    }
  }

  return (
    <div>
		<h2>Test Communication with local API</h2>
			{status === 'loading' ? (
			  'Loading...'
			) : status === 'error' ? (
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
  )
}

export default APITests
