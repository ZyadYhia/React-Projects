// import { createStore } from 'redux'
import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = { counter: 0, showCounter: true }

// the toolkit have internally package that make brand new object for mutations 
// so we don't need to return brand new object
const counterSlice = createSlice({
    name: 'counter',
    // initialStete : initialState
    initialState,
    reducers: {
        increment(state) {
            state.counter++
        },
        decrement(state) {
            state.counter--
        },
        increase(state, action) {
            state.counter = state.counter + action.payload
        },
        toggleCounter(state) {
            state.showCounter = !state.showCounter
        }
    },
    
})



// const store = createStore(counterSlice.reducer)
// this is used when we need to make multible reducers 
// as we have to send only one reducer to the store
const store = configureStore({
    // incase we have one reducer
    reducer: counterSlice.reducer 
    // reducer: {
    //     counter: counterSlice.reducer
    // }
})
export const counterActions = counterSlice.actions
export default store