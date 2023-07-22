import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import application from './application'


const store = configureStore({
    reducer: {
        application
    }
})

setupListeners(store.dispatch)

export default store
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch