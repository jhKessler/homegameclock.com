"use client"

import { Badge } from "~/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import type { BlindLevel } from "~/lib/interfaces/blind-level"

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
            <div key={i} className="text-center">
              <Badge variant="secondary" className="w-full py-2 font-mono text-sm">
                {level.smallBlind}/{level.bigBlind}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">Level {i + 1}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
