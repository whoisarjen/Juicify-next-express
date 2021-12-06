import { createSlice } from '@reduxjs/toolkit'
import useTranslation from 'next-translate/useTranslation'


const initialState = {
  domain: 'https://juicify.app',
  requiredBasicInputLength: (value) => {
    if(2 < value.length && value.length < 41){
      return {
        status: true,
        message: ''
      }
    }else{
      const { t } = useTranslation('home')
      return {
        status: false,
        message: t('Expect 3 to 40 letters')
      }
    }
  }
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
})

export default configSlice.reducer