import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector(state => {
    if(state.filter !== '')
      {
        return state.anecdote.filter(s => s.content.toLowerCase().includes(state.filter.toLowerCase()))
      }
      else{
        return state.anecdote
      }
    
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted ' ${anecdotes.filter(a => a.id === id)[0].content}'`, 5))
    // setTimeout(() => {
    //     dispatch(removeNotification())
    // }, 5000);
  }


  return (
    <>
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteForm