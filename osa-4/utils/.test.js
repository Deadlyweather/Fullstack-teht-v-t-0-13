const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



describe('total likes', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'top 10 things that never happened',
      author: 'Dude Person',
      url: 'http://www.TotallyNotFake.com',
      likes: 10,
      __v: 0
    }
  ]
  test('dummy returns one', () => {

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
  test('cannot be negative', () => {
    
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result >= 0, true)
  })
  test('like count is a number', () => {
    
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(typeof result, 'number')
  })
  test('when list has only one blog equals the likes of that', () => {
    
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, blogs[0].likes)
  })
  test('of bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 15)
  })
  test('like count is zero for empty list', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  
})