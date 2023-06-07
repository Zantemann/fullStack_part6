import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => {
          dispatch(
            vote(anecdote))
          dispatch(
            setNotification(`You voted: '${anecdote.content}'`)
          )
          setTimeout(() => {
            dispatch(clearNotification())
          }, 5000);
        }}>
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