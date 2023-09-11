import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		displayMessage(state, action) {
			return action.payload.length > 0 ? `you voted '${action.payload}'` : '';
		},
	},
});

export const { displayMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
