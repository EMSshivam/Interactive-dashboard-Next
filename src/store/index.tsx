'use client'
import { Provider } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import  createWebStorage  from 'redux-persist/es/storage/createWebStorage'
import filters from './slices/filters'

const createSessionStorage = () => {
  try { return createWebStorage('session') } catch { return createNoopStorage() }
}
function createNoopStorage() {
  return { getItem: async (_key:string)=>null, setItem: async (_key:string, value:any)=>value, removeItem: async (_key:string)=>{} }
}

const persistConfig = { key: 'root', storage: createSessionStorage(), whitelist: ['filters'] }
const rootReducer = combineReducers({ filters })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({ reducer: persistedReducer })
export const persistor = persistStore(store)
export type AppDispatch = typeof store.dispatch

export function Providers({ children }: { children: React.ReactNode }){
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>{children}</PersistGate>
    </Provider>
  )
}
