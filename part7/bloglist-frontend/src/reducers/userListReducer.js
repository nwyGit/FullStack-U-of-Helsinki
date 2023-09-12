import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const userListSlice = createSlice({
	name: 'userList',
	initialState: [],
	reducers: {
		setUserListReducer(state, action) {
			return action.payload;
		},
	},
});

export const { setUserListReducer } = userListSlice.actions;
export const setUserList = () => {
	return async (dispatch) => {
		const userList = await blogService.findUser();
		dispatch(setUserListReducer(userList));
	};
};
export default userListSlice.reducer;
