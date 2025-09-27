import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware' // Import middleware

// State and Actions types remain the same
export type TimerState = {
    startTime: number | null
}

export type TimerActions = {
  start: () => void
}

export type TimerStore = TimerState & TimerActions

export const defaultInitState: TimerState = {
    startTime: null,
}

// A unique key for localStorage
const STORAGE_KEY = 'poker-timer-storage';

// The factory function that your provider will use
export const createTimerStore = (
  initState: TimerState = defaultInitState,
) => {
  return createStore<TimerStore>()(
    // Wrap your store definition with the `persist` middleware
    persist(
      (set) => ({
        ...initState,
        start: () => set((state) => ({ ...state, startTime: Date.now() })),
      }),
      {
        // 1. A unique name for the storage key
        name: STORAGE_KEY,
        
        // 2. Specify localStorage as the storage medium
        storage: createJSONStorage(() => localStorage),

        merge: (persistedState, currentState) => ({
          ...currentState,
          ...(persistedState as Partial<TimerState>),
        }),
      },
    ),
  )
}