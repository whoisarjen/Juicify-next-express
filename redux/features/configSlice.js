import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  domain: 'https://juicify.app',
  requiredBasicInputLength: (value) => {
    if(2 < value.length && value.length < 41){
      return {
        status: true,
        message: ''
      }
    }else{
      return {
        status: false,
        message: 'Expect 3 to 40 letters!'
      }
    }
  }
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
})

export default configSlice.reducer