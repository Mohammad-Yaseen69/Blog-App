import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    user: null,
    loading: true
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.user = action.payload
        },
        logout: (state) => {
            state.status = false
            state.user = null
        },
        toggleloading: (state , action) => {
            state.loading = action.payload
        }
    }
})

export const { login, logout , toggleloading} = authSlice.actions
export default authSlice.reducer