const dummy = () => {
	// ...
	return 1;
};

const totalLikes = (blogs) => {
	let likes = 0;

	if (blogs.length === 0) return 0;
	if (blogs.length === 1) return blogs[0].likes;

	for (var i = 0; i < blogs.length; i++) {
		likes += blogs[i].likes;
	}

	return likes;
};

const favoriteBlog = (blogs) => {
	let favBlog = { title: '', author: '', likes: 0 };
	let mostLikes = 0;

	if (blogs.length === 0) return 0;
	if (blogs.length === 1) {
		favBlog.title = blogs[0].title;
		favBlog.author = blogs[0].author;
		favBlog.likes = blogs[0].likes;
		return favBlog;
	}

	for (var i = 0; i < blogs.length; i++) {
		if (blogs[i].likes > mostLikes) {
			favBlog.title = blogs[i].title;
			favBlog.author = blogs[i].author;
			favBlog.likes = blogs[i].likes;
			mostLikes = blogs[i].likes;
		}
	}

	return favBlog;
};

const mostBlogs = (blogs) => {
	let dict = {};
	let result = { author: '', blogs: 0 };
	let mostBlogs = 0;

	if (blogs.length === 0) return 0;
	if (blogs.length === 1) {
		result.author = blogs[0].author;
		result.blogs = 1;
		return result;
	}

	for (var i = 0; i < blogs.length; i++) {
		if (dict[blogs[i].author] == null) {
			dict[blogs[i].author] = 1;
		} else {
			dict[blogs[i].author] += 1;
		}
	}

	for (const key in dict) {
		if (dict[key] > mostBlogs) {
			result.author = key;
			result.blogs = dict[key];
			mostBlogs = dict[key];
		}
	}

	return result;
};

const mostLikes = (blogs) => {
	let dict = {};
	let result = { author: '', likes: 0 };
	let mostBlogs = 0;

	if (blogs.length === 0) return 0;
	if (blogs.length === 1) {
		result.author = blogs[0].author;
		result.likes = blogs[0].likes;
		return result;
	}

	for (var i = 0; i < blogs.length; i++) {
		if (dict[blogs[i].author] == null) {
			dict[blogs[i].author] = blogs[i].likes;
		} else {
			dict[blogs[i].author] += blogs[i].likes;
		}
	}

	for (const key in dict) {
		if (dict[key] > mostBlogs) {
			result.author = key;
			result.likes = dict[key];
			mostBlogs = dict[key];
		}
	}

	return result;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
