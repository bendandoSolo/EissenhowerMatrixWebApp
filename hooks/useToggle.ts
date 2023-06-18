import React from 'react';

const useToggle = () => {
	const [open, setOpen] = React.useState(false);

	const toggle = () => {
		setOpen(!open);
	};

	const close = () => {
		setOpen(false);
	};

	return [open, close, toggle] as const;
};

export default useToggle;