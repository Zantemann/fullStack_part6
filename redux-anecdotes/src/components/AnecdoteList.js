import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const voteAnecdote = async (event) => {
    event.preventDefault()

    const id = anecdote.id
    dispatch(vote(id))

    dispatch(setNotification(`You voted: '${anecdote.content}'`, 4))
  }

  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={voteAnecdote}>
          vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  return(
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          anecdote={anecdote}
          key={anecdote.id}
        />
      )}
    </div>
  )
}

export default AnecdoteList