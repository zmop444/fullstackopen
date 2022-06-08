import { useDispatch } from 'react-redux'
import { blogsActions } from '../reducers/blogsReducer'
import { notificationThunks } from '../reducers/notificationReducer'
import blogsService from '../services/blogsService'

const BlogComments = ({ blog }) => {
  const { id, comments } = blog
  const dispatch = useDispatch()

  const addComment = async (event) =>  {
    event.preventDefault()
    const newComment = { comment: event.target.newComment.value }
    const { comment } = await blogsService.createComment(id, newComment)
    dispatch(blogsActions.appendComment({ id, comment }))
    dispatch(
      notificationThunks.showTimed({
        type: 'success',
        message: `added comment ${comment}`,
      })
    )
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input id="newComment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogComments
