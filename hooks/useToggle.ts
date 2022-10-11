import React from 'react';

const useToggle = () => {
	const [open, setOpen] = React.useState(false);

	const toggle = () => {
		setOpen(!open);
	};

	return [ open, toggle ] as const; 
};

export default useToggle;