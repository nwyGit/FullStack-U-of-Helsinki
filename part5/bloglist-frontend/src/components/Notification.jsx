import React from 'react';

const Notification = ({ message }) => {
	if (!message || message.length === 0) {
		return null;
	}
	return (
		<div className={message.includes('Error') ? 'error' : 'success'}>
			{message}
		</div>
	);
};

export default Notification;
