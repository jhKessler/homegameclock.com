'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
// This import will now succeed
import { createTimerStore, type TimerStore } from './timer-store'

export type TimerStoreApi = ReturnType<typeof createTimerStore>

export const TimerStoreContext = createContext<TimerStoreApi | undefined>(
  undefined,
)

export interface TimerStoreProviderProps {
  children: ReactNode
}

export const TimerStoreProvider = ({
  children,
}: TimerStoreProviderProps) => {
  const storeRef = useRef<TimerStoreApi | null>(null)
  // It creates the store instance here, once per render
  storeRef.current ??= createTimerStore();

  return (
    <TimerStoreContext.Provider value={storeRef.current}>
      {children}
    </TimerStoreContext.Provider>
  )
}

// This custom hook correctly consumes the context
export const useTimerStore = <T,>(
  selector: (store: TimerStore) => T,
): T => {
  const timerStoreContext = useContext(TimerStoreContext)

  if (!timerStoreContext) {
    throw new Error(`useTimerStore must be used within TimerStoreProvider`)
  }

  return useStore(timerStoreContext, selector)
}