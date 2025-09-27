"use client"

import { useMemo, useState } from "react"
import { TooltipProvider } from "~/components/ui/tooltip"

import { Button } from "~/components/ui/button"

import Link from "next/link"
import { useConfigStore } from "~/stores/config/config-store-provider"
import { BlindStructureCreator } from "./_components/blind-structure/blind-structure-creator"
import { BreakModal } from "./_components/break-modal"
import { BlindStructureCard } from "./_components/config/blind-structure-card"
import { BreakSettingsCard } from "./_components/config/break-settings-card"
import { TimeConfigurationCard } from "./_components/config/time-configuration-card"
import { TournamentDetailsCard } from "./_components/config/tournament-details-card"
import { PlayerOptionsModal } from "./_components/player-options-modal"
import { useTimerStore } from "~/stores/timer/timer-store-provider"
import { useRouter } from "next/navigation"

export default function ConfigPageWrapper() {
  const router = useRouter(); 
  const {
    timePerLevelMinutes,
    blindLevels,
    breakConfig,
    playerOptions,
    moreOptions,
    setConfig, // Get the action to update the store
  } = useConfigStore((state) => state)

  const timer = useTimerStore((state) => state);


  // Memoization still works perfectly
  const estimatedDuration = useMemo(() => {
    const index = blindLevels.findIndex(level => level.bigBlind >= (moreOptions.startingStack / 4));
    const withoutBreaks = index === -1 ? blindLevels.length * timePerLevelMinutes : (index + 1) * timePerLevelMinutes;
    if (!breakConfig.enabled) return withoutBreaks;
    const numberOfBreaks = Math.floor((index === -1 ? blindLevels.length : index + 1) / breakConfig.everyXLevels);
    return withoutBreaks + (numberOfBreaks * breakConfig.duration);
  }, [timePerLevelMinutes, blindLevels, moreOptions, breakConfig])

  // --- 2. Keep local state ONLY for UI concerns (like modal visibility) ---
  const [showBreakModal, setShowBreakModal] = useState(false)
  const [showPlayerOptionsModal, setShowPlayerOptionsModal] = useState(false)
  const [showBlindCreator, setShowBlindCreator] = useState(false)


  const startTimer = () => {
    timer.start();
    router.push('/timer');
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-balance">Poker Tournament Setup</h1>
            <p className="text-muted-foreground text-lg">Configure your blind structure and tournament settings</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* --- 3. Pass store values and updater functions to children --- */}
            <TimeConfigurationCard
              timePerLevel={timePerLevelMinutes}
              // Update the store directly
              setTimePerLevel={(newTime) => setConfig({ timePerLevelMinutes: newTime })}
              estimatedDuration={estimatedDuration}
            />
            <BreakSettingsCard
              breakConfig={breakConfig}
              onOpenBreakModal={() => setShowBreakModal(true)}
              totalLevels={blindLevels.length}
            />
          </div>

          <BlindStructureCard blindLevels={blindLevels} onOpen={() => setShowBlindCreator(true)} />

          <TournamentDetailsCard
            playerOptions={playerOptions}
            onOpenPlayerOptions={() => setShowPlayerOptionsModal(true)}
          />

          <div className="text-center">
            <Button onClick={startTimer} size="lg" className="px-12 py-6 text-lg font-semibold">
              Start Game
            </Button>
          </div>
        </div>

        <BreakModal
          open={showBreakModal}
          onOpenChange={setShowBreakModal}
          config={breakConfig}
          onConfigChange={(newConfig) => setConfig({ breakConfig: newConfig })}
        />

        <PlayerOptionsModal
          open={showPlayerOptionsModal}
          onOpenChange={setShowPlayerOptionsModal}
          options={playerOptions}
          onOptionsChange={(newOptions) => setConfig({ playerOptions: newOptions })}
        />

        <BlindStructureCreator
          open={showBlindCreator}
          onOpenChange={setShowBlindCreator}
          onAcceptStructure={(newLevels) => setConfig({ blindLevels: newLevels })}
          levelDuration={timePerLevelMinutes}
        />
      </div>
    </TooltipProvider>
  )
}