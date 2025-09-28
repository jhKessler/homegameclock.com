"use client"

import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import type { BlindLevel } from "~/lib/interfaces/blind-level"
import { BlindLevelBadge } from "../config/blind-level-badge"

interface CalculatedLevelsGridProps {
  levels: BlindLevel[]
  showLevelLimit: number
}

export function CalculatedLevelsGrid({ levels, showLevelLimit }: CalculatedLevelsGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Suggested Blind Structure</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {levels.slice(0, showLevelLimit).map((level, i) => (
            <BlindLevelBadge
              key={`${level.smallBlind}-${level.bigBlind}-${i}`}
              level={level}
              index={i}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
