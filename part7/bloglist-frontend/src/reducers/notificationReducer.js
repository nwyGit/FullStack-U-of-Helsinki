import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotification: (state, action) => {
			return action.payload;
		},
		clearNotification: (state) => {
			return null;
		},
	},
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (message, duration, style) => {
	return async (dispatch) => {
		dispatch(setNotification({ message, style }));

		setTimeout(() => {
			dispatch(clearNotification());
		}, duration * 1000);
	};
};
export default notificationSlice.reducer;
