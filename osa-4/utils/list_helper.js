
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  }
}
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const blogCount = {}
    blogs.forEach(blog => {
      if (blogCount[blog.author]) {
        blogCount[blog.author]++
      } else {
        blogCount[blog.author] = 1
      }
    })
    const maxBlogs = Math.max(...Object.values(blogCount))
    const author = Object.keys(blogCount).find(key => blogCount[key] === maxBlogs)
    return { author, blogs: maxBlogs }
  }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  } else {
    const likeCount = {}
    blogs.forEach(blog => {
      if (likeCount[blog.author]) {
        likeCount[blog.author] += blog.likes
      } else {
        likeCount[blog.author] = blog.likes
      }
    })
    const maxLikes = Math.max(...Object.values(likeCount))
    const author = Object.keys(likeCount).find(key => likeCount[key] === maxLikes)
    return { author, likes: maxLikes }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}