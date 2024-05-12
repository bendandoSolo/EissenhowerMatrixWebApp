import React from 'react';

const useToggle = (): any => {
	const [open, setOpen] = React.useState(false);

	const toggle = (): any => {
		setOpen(!open);
	};

	const close = (): any => {
		setOpen(false);
	};

	return [open, close, toggle] as const;
};

export default useToggle;