import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogsReducer(state, action) {
			return action.payload;
		},
		createReducer(state, action) {
			state.push(action.payload);
		},
		updateReducer(state, action) {
			const updatedBlog = action.payload;
			state.map((b) => {
				b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b;
			});
		},
		commentReducer(state, action) {
			const commentedBlog = action.payload;
			state.map((b) => {
				b.id === commentedBlog.id
					? { ...b, comments: commentedBlog.comments }
					: b;
			});
		},
		deleteReducer(state, action) {
			const deletedBlogID = action.payload;
			return state.filter((b) => b.id != deletedBlogID);
		},
	},
});

export const {
	setBlogsReducer,
	createReducer,
	updateReducer,
	commentReducer,
	deleteReducer,
} = blogSlice.actions;

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogsReducer(blogs));
	};
};

export const createBlog = (blog) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(blog);
		dispatch(createReducer(newBlog));
	};
};

export const updateBlog = (blog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(blog.id, blog);
		dispatch(updateReducer(updatedBlog));
	};
};

export const commentBlog = (blog) => {
	return async (dispatch) => {
		const commentedBlog = await blogService.comment(blog.id, blog);
		dispatch(commentReducer(commentedBlog));
	};
};

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.deleteBlog(id);
		dispatch(deleteReducer(id));
	};
};

export default blogSlice.reducer;
