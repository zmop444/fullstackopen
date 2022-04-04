const user = {
    username: 'root',
    password: 'password123',
    name: 'User A'
}

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('#login-form')
        cy.contains('username')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username')
                .type(user.username)
            cy.get('#password')
                .type(user.password)
            // cy.get('#login')
            //     .click()
            cy.contains('Login')
                .click()
            cy.contains('Logout')
        })
        it('fails with incorrect credentials', function () {
            cy.get('#username')
                .type(`incorrect-${user.username}`)
            cy.get('#password')
                .type(`incorrect-${user.password}`)
            cy.get('#login')
                .click()
            cy.get('html')
                .should('not.contain', 'Logout')
            cy.get('.notification')
                .should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        const blog = {
            title: 'Test title',
            author: 'Test author',
            url: 'https://example.com'
        }

        beforeEach(function () {
            cy.login(user.username, user.password)
        })

        it('a blog can be created', function () {
            cy.contains('new blog')
                .click()
            cy.contains('Title')
                .type(blog.title)
            cy.contains('Author')
                .type(blog.author)
            cy.contains('Url')
                .type(blog.url)
            cy.get('form')
                .contains('Create')
                .click()
            cy.contains(blog.title)
            cy.contains(blog.author)
        })

        describe('after having created a blog', function () {
            beforeEach(function () {
                const token = JSON.parse(localStorage.getItem('user')).token
                cy.createBlog(token, blog)
                cy.visit('http://localhost:3000') // to reload page and show the newly created blog
            })

            it('can like the blog', function () {
                cy.contains('View')
                    .click()
                cy.get('button')
                    .contains('Like')
                    .click()
                cy.visit('http://localhost:3000')
                cy.contains('View')
                    .click()
                cy.contains('likes: 1')
            })

            it('creator can delete the blog', function () {
                cy.contains('View')
                    .click()
                cy.contains('Delete')
                    .click()
                cy.visit('http://localhost:3000')
                cy.get('html')
                    .should('not.contain', blog.title)
            })

            it('other users cannot delete the blog', function () {
                const user = {
                    username: 'root2',
                    password: 'password123',
                    name: 'User B'
                }
                cy.request('POST', 'http://localhost:3003/api/users', user)
                cy.login(user.username, user.password)
                cy.contains('View')
                    .click()
                cy.get('html')
                    .should('not.contain', 'Delete')
            })

            it('blogs are sorted by likes', function () {
                const token = JSON.parse(localStorage.getItem('user')).token
                const twoVotes = {
                    title: 'Most voted',
                    author: 'Test author',
                    url: 'https://example.com'
                }
                const oneVote = {
                    title: 'One vote',
                    author: 'Test author',
                    url: 'https://example.com'
                }
                cy.createBlog(token, twoVotes)
                cy.createBlog(token, oneVote)
                cy.visit('http://localhost:3000')
                // blog with two votes
                cy.get('.blog')
                    .contains(twoVotes.title)
                    .as('twoVotesBlog')
                cy.get('@twoVotesBlog')
                    .contains('View')
                    .click()
                cy.get('@twoVotesBlog')
                    .find('button')
                    .contains('Like')
                    .click()
                cy.get('@twoVotesBlog')
                    .contains('likes: 1')
                cy.get('@twoVotesBlog')
                    .find('button')
                    .contains('Like')
                    .click()
                cy.get('@twoVotesBlog')
                    .contains('likes: 2')
                // blog with one vote
                cy.get('.blog')
                    .contains(oneVote.title)
                    .as('oneVoteBlog')
                cy.get('@oneVoteBlog')
                    .contains('View')
                    .click()
                cy.get('@oneVoteBlog')
                    .find('button')
                    .contains('Like')
                    .click()
                cy.get('@oneVoteBlog')
                    .contains('likes: 1')
                // blog with no vote
                cy.get('.blog')
                    .contains(blog.title)
                    .as('noVotesBlog')
                cy.get('@noVotesBlog')
                    .contains('View')
                    .click()
                // asserting positions
                cy.get('.blog:first-child')
                    .contains(twoVotes.title)
                cy.get('.blog:nth-child(2)')
                    .contains(oneVote.title)
                cy.get('.blog:last-child')
                    .contains(blog.title)
            })
        })
    })

    // describe('google',)
})