import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { BlindLevel } from '~/lib/interfaces/blind-level'
import { calculateCurrentLevel } from './calculate-current-level'


export type ProgressionItem =
  | {
      type: 'level'
      seconds: number
      smallBlind: number
      bigBlind: number
    }
  | {
      type: 'break'
      seconds: number
      smallBlind: number
      bigBlind: number
    }

// The return type for our new function
export type CurrentLevelInfo = ProgressionItem & {
  nextSmallBlind: number | null
  nextBigBlind: number | null
  secondsLeftInLevel: number
  timeToNextBreak: number | null
}

export type ConfigState = {
  timePerLevelMinutes: number
  blindLevels: BlindLevel[]
  breakConfig: { enabled: boolean; everyXLevels: number; duration: number }
  playerOptions: { players: number; buyIn: number | null; rebuys: number }
  moreOptions: { startingStack: number }
  progression: ProgressionItem[]
}

export type ConfigActions = {
  setConfig: (newConfig: Partial<ConfigState>) => void
  // Add the new function signature here
  getCurrentLevel: (totalSecondsElapsed: number) => CurrentLevelInfo | null
  getPrizePool: () => number | null
  registerRebuy: () => void
  registerRestart: () => void
}

export type ConfigStore = ConfigState & ConfigActions

// --- HELPER FUNCTION TO BUILD THE PROGRESSION ---

const buildProgression = (
  blindLevels: BlindLevel[],
  timePerLevelMinutes: number,
  breakConfig: { enabled: boolean; everyXLevels: number; duration: number },
): ProgressionItem[] => {
  const newProgression: ProgressionItem[] = []
  const levelDurationSeconds = timePerLevelMinutes * 60

  blindLevels.forEach((level, index) => {
    newProgression.push({
      type: 'level',
      seconds: levelDurationSeconds,
      smallBlind: level.smallBlind,
      bigBlind: level.bigBlind,
    })

    const isBreakEnabled = breakConfig.enabled
    const breakInterval = breakConfig.everyXLevels
    if (
      isBreakEnabled &&
      breakInterval > 0 &&
      (index + 1) % breakInterval === 0 &&
      index + 1 < blindLevels.length
    ) {
      newProgression.push({
        type: 'break',
        seconds: breakConfig.duration * 60,
        smallBlind: level.smallBlind,
        bigBlind: level.bigBlind,
      })
    }
  })

  return newProgression
}

// --- INITIAL STATE ---

const defaultBlindLevels: BlindLevel[] = [
    { smallBlind: 25, bigBlind: 50 }, { smallBlind: 50, bigBlind: 100 },
    { smallBlind: 75, bigBlind: 150 }, { smallBlind: 200, bigBlind: 400 },
    { smallBlind: 300, bigBlind: 600 }, { smallBlind: 400, bigBlind: 800 },
    { smallBlind: 600, bigBlind: 1200 }, { smallBlind: 700, bigBlind: 1400 },
    { smallBlind: 800, bigBlind: 1600 }, { smallBlind: 1000, bigBlind: 2000 },
    { smallBlind: 1500, bigBlind: 3000 }, { smallBlind: 3000, bigBlind: 6000 },
    { smallBlind: 6000, bigBlind: 12000 }, { smallBlind: 10000, bigBlind: 20000 },
    { smallBlind: 20000, bigBlind: 40000 },
]

const defaultConfig = {
  timePerLevelMinutes: 15,
  blindLevels: defaultBlindLevels,
  breakConfig: { enabled: false, everyXLevels: 5, duration: 15 },
  playerOptions: { players: 9, buyIn: null, rebuys: 0 },
  moreOptions: { startingStack: 20000 },
}

export const defaultInitState: ConfigState = {
  ...defaultConfig,
  progression: buildProgression(
    defaultConfig.blindLevels,
    defaultConfig.timePerLevelMinutes,
    defaultConfig.breakConfig,
  ),
}

const STORAGE_KEY = 'poker-config-storage'

// --- STORE CREATION ---

export const createConfigStore = (
  initState: ConfigState = defaultInitState,
) => {
  return createStore<ConfigStore>()(
    persist(
      (set, get) => ({ // Add `get` to the function arguments
        ...initState,
        
        setConfig: (newConfig) =>
          set((state) => {
            const updatedState = { ...state, ...newConfig }
            const hasBlindLevelsChanged = 'blindLevels' in newConfig
            const hasTimeChanged = 'timePerLevelMinutes' in newConfig
            const hasBreakChanged = 'breakConfig' in newConfig

            if (hasBlindLevelsChanged || hasTimeChanged || hasBreakChanged) {
              updatedState.progression = buildProgression(
                updatedState.blindLevels,
                updatedState.timePerLevelMinutes,
                updatedState.breakConfig,
              )
            }
            return updatedState
          }),

        getCurrentLevel: (timeElapsed: number) =>  calculateCurrentLevel(get().progression, timeElapsed),
        getPrizePool: () => {
          const { playerOptions } = get();
          if (!playerOptions.players || !playerOptions.buyIn) return null;
          return (playerOptions.players + playerOptions.rebuys) * (playerOptions.buyIn)
        },
        registerRebuy: () => set((state) => {
          const newRebuys = state.playerOptions.rebuys + 1;
          return {
            ...state,
            playerOptions: {
              ...state.playerOptions,
              rebuys: newRebuys
            }
          }
        }),
        registerRestart: () => set((state) => ({
          ...state,
          playerOptions: {
            ...state.playerOptions,
            rebuys: 0
          }
        })),
      }),
      {
        name: STORAGE_KEY,
        storage: createJSONStorage(() => localStorage),
        merge: (persistedState, currentState) => {
          const mergedState = {
            ...currentState,
            ...(persistedState as Partial<ConfigState>),
          }
          mergedState.progression = buildProgression(
            mergedState.blindLevels,
            mergedState.timePerLevelMinutes,
            mergedState.breakConfig,
          )
          return mergedState
        },
        partialize: (state) => {
            const { progression, ...rest } = state;
            return rest;
        }
      },
    ),
  )
}
