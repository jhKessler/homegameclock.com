'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
// This import will now succeed
import { createConfigStore, type ConfigStore } from './config-store'

export type ConfigStoreApi = ReturnType<typeof createConfigStore>

export const ConfigStoreContext = createContext<ConfigStoreApi | undefined>(
  undefined,
)

export interface ConfigStoreProviderProps {
  children: ReactNode
}

export const ConfigStoreProvider = ({
  children,
}: ConfigStoreProviderProps) => {
  const storeRef = useRef<ConfigStoreApi | null>(null)
  // It creates the store instance here, once per render
  storeRef.current ??= createConfigStore();

  return (
    <ConfigStoreContext.Provider value={storeRef.current}>
      {children}
    </ConfigStoreContext.Provider>
  )
}

// This custom hook correctly consumes the context
export const useConfigStore = <T,>(
  selector: (store: ConfigStore) => T,
): T => {
  const configStoreContext = useContext(ConfigStoreContext)

  if (!configStoreContext) {
    throw new Error(`useConfigStore must be used within ConfigStoreProvider`)
  }

  return useStore(configStoreContext, selector)
}