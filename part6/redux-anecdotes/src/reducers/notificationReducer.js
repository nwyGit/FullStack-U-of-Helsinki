import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		displayMessage(state, action) {
			return action.payload;
		},
	},
});

export const { displayMessage } = notificationSlice.actions;

export const setNotification = (message, duration) => {
	return async (dispatch) => {
		dispatch(displayMessage(message));
		setTimeout(() => {
			dispatch(displayMessage(''));
		}, duration * 1000);
	};
};

export default notificationSlice.reducer;
