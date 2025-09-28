// components/BlindLevelBadge.tsx

import { formatBlind } from "~/app/timer/utils"
import { Badge } from "~/components/ui/badge"
import type { BlindLevel } from "~/lib/interfaces/blind-level"

type Props = {
  level: BlindLevel
  index: number
}

export function BlindLevelBadge({ level, index }: Props) {
  return (
    <div className="text-center">
      <Badge
        variant="secondary"
        className="w-full py-2 font-mono text-sm whitespace-nowrap"
        // Add this stable attribute for reliable measurement
        data-testid="blind-badge"
      >
        {formatBlind(level.smallBlind)}/{formatBlind(level.bigBlind)}
      </Badge>
      <div className="text-xs text-muted-foreground mt-1">Level {index + 1}</div>
    </div>
  )
}