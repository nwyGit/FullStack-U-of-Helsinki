import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import CreateNewBlog from './CreateNewBlog';

test('renders content', () => {
	const blog = {
		title: 'test',
		author: 'me',
		url: 'https://fullstackopen.com/en/part5/testing_react_apps',
		likes: 24,
	};

	const { container } = render(<Blog blog={blog} />);

	const div = container.querySelector('.blog');
	expect(div).toHaveTextContent('test me');
});

test('clicking the button to show url and likes', async () => {
	const blog = {
		title: 'test',
		author: 'me',
		url: 'https://fullstackopen.com/en/part5/testing_react_apps',
		likes: 24,
	};

	const { container } = render(
		<Blog blog={blog} value={{ user: { name: 'test' } }} />
	);

	const tester = userEvent.setup();

	const button = screen.getByText('show');
	await tester.click(button);

	expect(container).toHaveTextContent(
		'https://fullstackopen.com/en/part5/testing_react_apps'
	);
	expect(container).toHaveTextContent('24');
});

test('like button is clicked by twice', async () => {
	const blog = {
		title: 'test',
		author: 'me',
		url: 'https://fullstackopen.com/en/part5/testing_react_apps',
		likes: 24,
	};

	const handleUpdateMock = jest.fn();
	render(
		<Blog
			blog={blog}
			value={{ user: { name: 'test' } }}
			handleUpdate={handleUpdateMock}
		/>
	);

	const tester = userEvent.setup();

	const showButton = screen.getByText('show');
	await tester.click(showButton);

	const likeButton = screen.getByText('like');
	await tester.click(likeButton);
	await tester.click(likeButton);

	await waitFor(() => {
		expect(handleUpdateMock.mock.calls).toHaveLength(2);
		expect(handleUpdateMock.mock.calls[1][0].likes).toBe(blog.likes + 2);
	});
});

test('right details is passed when new blog is created', async () => {
	const blog = {
		title: 'test',
		author: 'me',
		url: 'https://fullstackopen.com/en/part5/testing_react_apps',
	};
	const handleCreateMock = jest.fn();
	const { container } = render(<CreateNewBlog handler={handleCreateMock} />);

	const tester = userEvent.setup();

	const createNewBlogButton = screen.getByText('create new blog');
	await tester.click(createNewBlogButton);

	const titleInput = container.querySelector('#title');
	const authorInput = container.querySelector('#author');
	const urlInput = container.querySelector('#url');

	await tester.type(titleInput, blog.title);
	await tester.type(authorInput, blog.author);
	await tester.type(urlInput, blog.url);

	const createButton = screen.getByText('create');
	await tester.click(createButton);

	expect(handleCreateMock.mock.calls).toHaveLength(1);
	expect(handleCreateMock.mock.calls[0][0].title).toBe(blog.title);
	expect(handleCreateMock.mock.calls[0][0].author).toBe(blog.author);
	expect(handleCreateMock.mock.calls[0][0].url).toBe(blog.url);
});
