"use client"

import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface TournamentParamsFormProps {
  startingStack: number
  targetTournamentDuration: number
  numberOfPlayers: number
  onStartingStackChange: (n: number) => void
  onTargetTournamentDurationChange: (n: number) => void
  onNumberOfPlayersChange: (n: number) => void
}

export function TournamentParamsForm({
  startingStack,
  targetTournamentDuration,
  numberOfPlayers,
  onStartingStackChange,
  onTargetTournamentDurationChange,
  onNumberOfPlayersChange
}: TournamentParamsFormProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="starting-stack">Starting Stack</Label>
        <Input
          id="starting-stack"
          type="number"
          value={startingStack}
          onChange={(e) => onStartingStackChange(Number(e.target.value))}
          min={1000}
          max={100000}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tournament-duration">Target Tournament Duration (minutes)</Label>
        <Input
          id="tournament-duration"
          type="number"
          value={targetTournamentDuration}
          onChange={(e) => onTargetTournamentDurationChange(Number(e.target.value))}
          min={60}
          max={600}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number-of-players">Number of Players</Label>
        <Input
          id="number-of-players"
          type="number"
          value={numberOfPlayers}
          onChange={(e) => onNumberOfPlayersChange(Number(e.target.value))}
          min={2}
          max={100}
        />
      </div>
    </div>
  )
}
