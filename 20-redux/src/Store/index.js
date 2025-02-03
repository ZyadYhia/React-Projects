import { createStore } from 'redux'

const storeReducer = (state = { counter: 0 }, action) => {
    if (action.type === 'INCREMENT') {
        return state.counter++
    }
    if (action.type === 'DECREMENT') {
        return state.counter--
    }
    return state
}

const store = createStore(storeReducer)
export default store