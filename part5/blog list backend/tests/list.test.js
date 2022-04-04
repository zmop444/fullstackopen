const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

const listWithOneBlog = testHelper.listWithOneBlog
const blogs = testHelper.blogs

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of a list of blogs', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual({
            // _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        })
    })

    test('of an empty list', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual(null)
    })
})

test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
        author: 'Robert C. Martin',
        blogs: 3
    })
})

test('author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17
    })
})
