import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isVisible: false,
    notification: null
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggle(state) {
            state.isVisible = !state.isVisible
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    },
    selectors: {

    }
})
export const uiActions = uiSlice.actions
export default uiSlice