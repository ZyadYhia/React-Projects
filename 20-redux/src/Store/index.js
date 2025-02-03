import { createStore } from 'redux'

const initialState = { counter: 0, showCounter: true }

const counterReducer = (state = initialState, action) => {
    if (action.type === 'INCREMENT') {
        // this way is a bad practice but will work
        // return {
        //     ...state,
        //     counter: state.counter + 1,
        // }
        // instead we should return brand new object
        return {
            counter: state.counter + 1,
            showCounter: state.showCounter
        }
    }
    if (action.type === 'INCREASE') {
        return {
            counter: state.counter + action.amount,
            showCounter: state.showCounter
        }
    }
    if (action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1,
            showCounter: state.showCounter
        }
    }

    if (action.type === 'TOGGLE') {
        return {
            counter: state.counter,
            showCounter: !state.showCounter
        }
    }
    return state
}

const store = createStore(counterReducer)
export default store