// components/BlindStructureCard.tsx

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Wand2 } from "lucide-react"
import type { BlindLevel } from "~/lib/interfaces/blind-level"
import { useLayoutEffect, useRef, useState } from "react"
import { BlindLevelBadge } from "./blind-level-badge"

type Props = {
  blindLevels: BlindLevel[]
  onOpen: () => void
}

export function BlindStructureCard({ blindLevels, onOpen }: Props) {
  const gridRef = useRef<HTMLDivElement>(null)
  // 1. Start with a reasonable default width (in pixels) to prevent flicker.
  const [minColWidth, setMinColWidth] = useState(90)

  useLayoutEffect(() => {
    if (!gridRef.current || blindLevels.length === 0) return

    // 2. Use the stable data-testid selector.
    const badges = Array.from(
      gridRef.current.querySelectorAll("[data-testid='blind-badge']")
    )
    if (badges.length === 0) return

    const maxWidth = Math.max(...badges.map(badge => badge.scrollWidth))

    // 3. Set the measured width (but don't go below the default).
    setMinColWidth(Math.max(maxWidth, 90))
  }, [blindLevels]) // Re-calculate only when the data changes.

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Blind Structure</CardTitle>
          <CardDescription>Tournament blind levels</CardDescription>
        </div>
        <Button variant="outline" onClick={onOpen}>
          <Wand2 className="mr-2 h-4 w-4" />
          Blind Structure Creator
        </Button>
      </CardHeader>
      <CardContent>
        <div
          ref={gridRef}
          className="grid gap-3"
          // 4. Use "auto-fit" for better wrapping and apply the dynamic width.
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}px, 1fr))`,
          }}
        >
          {blindLevels.map((level, index) => (
            <BlindLevelBadge
              key={`${level.smallBlind}-${level.bigBlind}-${index}`}
              level={level}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}