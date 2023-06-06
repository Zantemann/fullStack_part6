import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() =>
          dispatch(voteAction(anecdote.id))}>
            vote
        </button>
      </div>
    </div>
  )
}


const AnecdoteList = () => {  
  const anecdotes = useSelector(state => state)

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