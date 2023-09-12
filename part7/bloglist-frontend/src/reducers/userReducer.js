import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUserReducer(state, action) {
			return action.payload;
		},
	},
});

export const { setUserReducer } = userSlice.actions;
export const setUser = (user) => {
	return async (dispatch) => {
		window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));
		blogService.setToken(user.token);
		dispatch(setUserReducer(user));
	};
};
export default userSlice.reducer;
