import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const generateId = () =>
//   Number((Math.random() * 1000000).toFixed(0))


// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdots',
  initialState: [],
  reducers: {

    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
    
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote).sort((a,b) => b.votes- a.votes)
    },
    updateAnecdote(state, action) {
      const newAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== newAnecdote.id ? anecdote : newAnecdote).sort((a,b) => b.votes- a.votes)
      
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
      return state.sort((a,b) => b.votes -  a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const {appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdots = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdots))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async (dispatch, getState) => {
      const { anecdote } = getState();
      const anecdoteToVote = anecdote.find(a => a.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
    const newAnecdote = await anecdoteService.updateVote(votedAnecdote)
    dispatch(updateAnecdote(newAnecdote))
  }
}



export default anecdoteSlice.reducer

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type) {
//     case 'NEW_ANECDOTE': {
//       return state.concat(action.payload).sort((a,b) => b.votes -  a.votes)
//     }
//     case 'VOTE':
//       {
//       const id = action.payload.id
//       const anecdoteToVote = state.find(a => a.id === id)
//       const votedAnecdote = { 
//         ...anecdoteToVote, 
//         votes: anecdoteToVote.votes + 1
//       }
    
//       return state.map(anecdote =>
//         anecdote.id !== id ? anecdote : votedAnecdote 
//       ).sort((a,b) => b.votes- a.votes)
//     }
//     default:
//      return state
//   }
// }


// const generateId = () =>
//   Number((Math.random() * 1000000).toFixed(0))



// export default reducer