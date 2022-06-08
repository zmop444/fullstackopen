const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const topBlog = blogs.reduce((currentTop, blog) => {
        return (blog.likes > currentTop.likes) ? blog : currentTop
    }, blogs[0])

    return topBlog
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorsBlogs = blogs.reduce((all, blog) => {
        if (!all[blog.author]) {
            all[blog.author] = []
        }
        all[blog.author].push(blog)
        return all
    }, {})

    const authors = Object.keys(authorsBlogs).map(author => ({
        author,
        blogs: authorsBlogs[author].length
    }))

    const topAuthor = authors.reduce((currentTop, author) => {
        return (author.blogs > currentTop.blogs) ? author : currentTop
    }, authors[0])

    return topAuthor
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorsBlogs = blogs.reduce((all, blog) => {
        if (!all[blog.author]) {
            all[blog.author] = []
        }
        all[blog.author].push(blog)
        return all
    }, {})

    const authors = Object.keys(authorsBlogs).map(author => ({
        author,
        likes: totalLikes(authorsBlogs[author])
    }))

    const topAuthor = authors.reduce((currentTop, author) => {
        return (author.likes > currentTop.likes) ? author : currentTop
    }, authors[0])

    return topAuthor
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
