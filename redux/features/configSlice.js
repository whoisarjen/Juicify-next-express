import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  domain: 'https://juicify.app',
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
})

export default configSlice.reducer