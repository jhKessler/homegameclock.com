"use client"
import { useTimerStore } from "~/stores/timer/timer-store-provider"
import { useInterval } from "usehooks-ts"
import { useMemo, useRef, useState } from "react"
import { useConfigStore } from "~/stores/config/config-store-provider"
import type { CurrentLevelInfo } from "~/stores/config/config-store"
import PokerTimerDisplay from "./poker-timer-display"
import { useRouter } from "next/navigation"

const MS_CHECK_INTERVAL = 100

const playSound = (soundFile: string) => {
  const audio = new Audio(soundFile)
  audio.play().catch(error => console.error("Error playing audio:", error))
}

export default function TimerPageWrapper() {
  const { playerOptions, getCurrentLevel } = useConfigStore((state) => state)
  const { startTime, reset, pausedTime, getTimeElapsed } = useTimerStore((state) => state)
  const [secondsSinceStart, setSecondsSinceStart] = useState<number | null>(null)
  const [currentLevelInfo, setCurrentLevelInfo] = useState<CurrentLevelInfo | null>(null)
  const previousTimeRef = useRef<number | null>(null)
  const currentTimeRef = useRef<number | null>(null)

  const router = useRouter()

  useInterval(
    () => {
      const timeElapsed = getTimeElapsed()
      const currentLevel = getCurrentLevel(timeElapsed)
      previousTimeRef.current = currentTimeRef.current
      currentTimeRef.current = Math.floor(timeElapsed / 1000)
      if ((previousTimeRef.current !== currentTimeRef.current) && currentLevel?.secondsLeftInLevel === 1) {
        if (currentLevel.timeToNextBreak === 1) {
          playSound("/mp3/break_has_started.mp3")
        }
        else if (currentLevel.type === "break") {
          playSound("/mp3/end_of_break.mp3")
        } else {
          playSound("/mp3/end_of_level.mp3")
        }
      }

      setSecondsSinceStart(Math.floor(timeElapsed / 1000))
      setCurrentLevelInfo(currentLevel)
    },
    !secondsSinceStart || (startTime && !pausedTime) ? MS_CHECK_INTERVAL : null
  )

  return (
    <PokerTimerDisplay
      currentLevelInfo={currentLevelInfo}
      secondsSinceStart={secondsSinceStart ?? 0}
      onReset={() => {
        reset()
        router.push("/")
      }}
      isPaused={!!pausedTime}
    />
  )
}