"use client"
import { useTimerStore } from "~/stores/timer/timer-store-provider"
import { useInterval } from "usehooks-ts"
import { useMemo, useState } from "react"
import { useConfigStore } from "~/stores/config/config-store-provider"
import type { CurrentLevelInfo } from "~/stores/config/config-store"
import PokerTimerDisplay from "./poker-timer-display"
import { useRouter } from "next/navigation"

const MS_CHECK_INTERVAL = 100

export default function TimerPageWrapper() {
  const { playerOptions, getCurrentLevel } = useConfigStore((state) => state)
  const { startTime, reset, pausedTime, getTimeElapsed } = useTimerStore((state) => state)
  const [secondsSinceStart, setSecondsSinceStart] = useState<number | null>(null)
  const [currentLevelInfo, setCurrentLevelInfo] = useState<CurrentLevelInfo | null>(null)
  const router = useRouter();
  const totalPricePool = useMemo(() => {
    if (!playerOptions.players || !playerOptions.buyIn) return null;
    return (playerOptions.players) * (playerOptions.buyIn)
  }, [playerOptions])
  

  useInterval(() => {
    const timeElapsed = getTimeElapsed();
    setSecondsSinceStart(Math.floor(timeElapsed / 1000))
    setCurrentLevelInfo(getCurrentLevel(timeElapsed))
  },
    !secondsSinceStart || (startTime && !pausedTime) ? MS_CHECK_INTERVAL : null
)

  return (
    <PokerTimerDisplay
      currentLevelInfo={currentLevelInfo}
      secondsSinceStart={secondsSinceStart ?? 0}
      totalPricePool={totalPricePool}
      onReset={() => {
        reset()
        router.push('/')
      }}
      isPaused={!!pausedTime}
    />
  )
}
