import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useNotificationDispatch} from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatchNotification = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const result = useQuery( 'anecdotes', getAnecdotes, {
      retry: false,
      onSuccess: (data) => {
        const sortedAnecdotes = [...data].sort((a, b) => b.votes - a.votes)
        queryClient.setQueryData('anecdotes', sortedAnecdotes)
      }
    }
  )

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatchNotification({ type: 'SHOW', payload: `Anecdote '${anecdote.content}' voted` })
    setTimeout(() => {
      dispatchNotification({ type: 'CLEAR' })
    }, 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
