import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './features/tokenSlice'
import configReducer from './features/configSlice'

export const store = configureStore({
    reducer: {
        token: tokenReducer,
        config: configReducer
    },
})