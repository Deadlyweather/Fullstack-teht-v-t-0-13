const blogsRouter = require('express').Router()
const blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response, next) => {
  blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new blog({
    content: body.content,
    important: body.important || false,
  })

  blog.save()
    .then(savedblog => {
      response.json(savedblog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  blog.findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).end()
      }

      blog.content = content
      blog.important = important

      return blog.save().then((updatedblog) => {
        response.json(updatedblog)
      })
    })
    .catch(error => next(error))
})

module.exports = blogsRouter