'use client'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/types'
import { store } from '@/store'

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
