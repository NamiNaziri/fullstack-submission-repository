/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },

    removeNotification(state, action) {
      return null
    },
  },
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

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