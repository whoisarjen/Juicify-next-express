import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {},
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    loadToken: (state, action) => {
      state.value = JSON.parse(Buffer.from(action.payload.split('.')[1], 'base64').toString())
    }
  },
})

export const { loadToken } = tokenSlice.actions

export default tokenSlice.reducer