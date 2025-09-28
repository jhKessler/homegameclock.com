import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware' // Import middleware

// State and Actions types remain the same
export type TimerState = {
  startTime: number | null
  pausedTime: number | null
}

export type TimerActions = {
  start: () => void
  reset: () => void
  pause: () => void
  resume: () => void
  getTimeElapsed: () => number
}

export type TimerStore = TimerState & TimerActions

export const defaultInitState: TimerState = {
  startTime: null,
  pausedTime: null,
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
      (set, get) => ({
        ...initState,
        start: () => set((state) => ({ ...state, startTime: Date.now() })),
        reset: () => set((state) => ({ ...state, startTime: null, pausedTime: null })),
        pause: () => set((state) => ({ ...state, pausedTime: Date.now() })),
        resume: () => set((state) => {
          if (!state.pausedTime) return state;
          if (!state.startTime) throw new Error("Cannot resume timer that hasn't started");
          const pausedDuration = Date.now() - state.pausedTime;
          return {
            ...state,
            startTime: state.startTime + pausedDuration,
            pausedTime: null,
          };
        }),
        getTimeElapsed: () => {
          const { startTime, pausedTime } = get();
          if (!startTime) return 0;
          if (pausedTime) return pausedTime - startTime;
          return Date.now() - startTime;
        },
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