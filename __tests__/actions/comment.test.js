const Comment = require('../../lib/actions/comment')
const Helper = require('../../__fixtures__/helper')

test('check that comment created when doPostAction is called with proper parameter', async () => {
  const comment = new Comment()
  const context = createMockContext()
  const result = {
    status: 'pass',
    validations: [{
      status: 'pass',
      name: 'Label'
    }]
  }
  const settings = {
    payload: {
      body: `Your run has returned the following status: {{status}}`
    }
  }
  await comment.afterValidate(context, settings, result)
  expect(context.github.issues.createComment.mock.calls.length).toBe(1)
  expect(context.github.issues.createComment.mock.calls[0][0].body).toBe(`Your run has returned the following status: pass`)
})

const createMockContext = () => {
  let context = Helper.mockContext()

  context.github.issues.createComment = jest.fn()
  return context
}