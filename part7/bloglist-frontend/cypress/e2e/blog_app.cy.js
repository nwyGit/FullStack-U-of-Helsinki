describe('Blog app', function () {
	console.log(Cypress.env());
	beforeEach(function () {
		// reset database
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);

		// create users
		const user1 = {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen',
		};
		const user2 = {
			name: 'Raymond Johnson',
			username: 'Johnson',
			password: 'test',
		};
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1);
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2);

		// create a demo blog
		cy.login(user2);
		cy.createBlog({
			title: 'Testing blog',
			author: 'gggggggg',
			url: 'https://fullstackopen.com/en/part5/end_to_end_testing',
		});
		cy.contains('logout').click();

		cy.visit('');
	});

	it('Login form is shown', function () {
		cy.contains('log in to application');
		cy.contains('username');
		cy.contains('password');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.contains('log in').click();
			cy.get('#username').type('mluukkai');
			cy.get('#password').type('salainen');
			cy.get('#login-button').click();
		});

		it('fails with wrong credentials', function () {
			cy.contains('log in').click();
			cy.get('#username').type('fakeUsername');
			cy.get('#password').type('fakePassword');
			cy.get('#login-button').click();

			cy.get('.error')
				.should('contain', 'Wrong credentials')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid');

			cy.contains('fakeUsername logged in').should('not.exist');
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			// log in user here
			cy.login({
				username: 'mluukkai',
				password: 'salainen',
			});
		});

		it('A blog can be created', function () {
			cy.contains('create new blog').click();
			cy.get('#title').type('a blog created by cypress');
			cy.get('#author').type('mluukkai');
			cy.get('#url').type(
				'https://fullstackopen.com/en/part5/end_to_end_testing'
			);
			cy.contains('create').click();
			cy.contains('a new blog a blog created by cypress by mluukkai added');
		});

		describe('and a note exists', function () {
			beforeEach(function () {
				cy.createBlog({
					title: 'The title with the most likes',
					author: 'mluukkai',
					url: 'https://fullstackopen.com/en/part5/end_to_end_testing',
				});
				cy.createBlog({
					title: 'The title with the second most likes',
					author: 'mluukkai',
					url: 'https://fullstackopen.com/en/part5/end_to_end_testing',
				});
			});

			it('User can like a blog', function () {
				cy.contains('show').click();
				cy.contains('like').click();
				cy.get('.blog').should('contain', 'Likes: 1');
			});

			it('User can delete a blog', function () {
				cy.contains('The title with the most likes mluukkai')
					.contains('show')
					.click();
				cy.contains('remove').click();

				cy.contains('The title with the most likes mluukkai').should(
					'not.exist'
				);
			});

			it("User cannot delete other creator's blog", function () {
				cy.contains('Testing blog').contains('show').click();
				cy.contains('remove').should('not.exist');
			});

			it('blogs are ordered accordingly', function () {
				cy.contains('The title with the most likes').contains('show').click();
				cy.contains('The title with the second most likes')
					.contains('show')
					.click();

				cy.contains('The title with the most likes')
					.contains('like')
					.click()
					.wait(500)
					.click()
					.wait(500)
					.click()
					.wait(500);

				cy.contains('The title with the second most likes')
					.contains('like')
					.click()
					.wait(500)
					.click()
					.wait(500);

				cy.contains('Testing blog').contains('show').click();

				cy.get('.blog')
					.eq(0)
					.should('contain', 'The title with the most likes');
				cy.get('.blog')
					.eq(1)
					.should('contain', 'The title with the second most likes');
			});
		});
	});
});
