import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import {useNotificationDispatch} from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      dispatchNotification({ type: 'SHOW', payload: `Anecdote '${data.content}' voted!` })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' })
      }, 5000)
    },
    onError: (error) => {
      dispatchNotification({ type: 'SHOW', payload: error.response.data.error })
      setTimeout(() => {
        dispatchNotification({ type: 'CLEAR' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
