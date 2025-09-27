"use client"
import { useTimerStore } from "~/stores/timer/timer-store-provider"
import { useInterval } from "usehooks-ts"
import { useMemo, useState } from "react"
import { useConfigStore } from "~/stores/config/config-store-provider"
import type { CurrentLevelInfo } from "~/stores/config/config-store"
import PokerTimerDisplay from "./poker-timer-display"

const MS_CHECK_INTERVAL = 100

export default function TimerPageWrapper() {
  const { playerOptions, getCurrentLevel } = useConfigStore((state) => state)
  const { startTime } = useTimerStore((state) => state)
  const [secondsSinceStart, setSecondsSinceStart] = useState(0)
  const [currentLevelInfo, setCurrentLevelInfo] = useState<CurrentLevelInfo | null>(null)
  const totalPricePool = useMemo(() => {
    return (playerOptions?.players ?? 0) * (playerOptions?.buyIn ?? 0)
  }, [playerOptions])

  useInterval(() => {
    setSecondsSinceStart(Math.floor((Date.now() - (startTime ?? 0)) / 1000))
    setCurrentLevelInfo(getCurrentLevel(startTime ?? Date.now()))
  }, MS_CHECK_INTERVAL)

  return (
    <PokerTimerDisplay
      currentLevelInfo={currentLevelInfo}
      secondsSinceStart={secondsSinceStart}
      totalPricePool={totalPricePool}
    />
  )
}
