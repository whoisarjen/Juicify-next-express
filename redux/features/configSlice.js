import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  domainAdress: 'https://juicify.app',
  logoAdress: 'https://juicify.app/img/logo.png',
  logoAlt: 'Juicify.app',
  requiredBasicInputLength: (value) => {
    if(2 < value.length && value.length < 41){
      return {
        status: true
      }
    }else{
      return {
        status: false
      }
    }
  }
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
})

export default configSlice.reducer