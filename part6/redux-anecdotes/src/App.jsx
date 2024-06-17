import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import  { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])

  
  return (
    <div>
      <Notification></Notification>
      <h2>Anecdotes</h2>
      <Filter></Filter>
      <AnecdoteList />
      <AnecdoteForm></AnecdoteForm>

    </div>
  )
}

export default App