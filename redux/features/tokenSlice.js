import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.value = JSON.parse(Buffer.from(action.payload.split('.')[1], 'base64').toString())
    },
    removeToken: (state) => {
      state.value = {}
    }
  }
})

export const { setToken, removeToken } = tokenSlice.actions

export default tokenSlice.reducer