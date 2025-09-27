"use client"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Plus, Trash } from "lucide-react"
import type { BlindLevel } from "~/lib/interfaces/blind-level"

interface EditableLevelsListProps {
  levels: BlindLevel[]
  onChange: (levels: BlindLevel[]) => void
}

export function EditableLevelsList({ levels, onChange }: EditableLevelsListProps) {
  const addLevel = () => {
    const lastLevel = levels[levels.length - 1] ?? { smallBlind: 0, bigBlind: 25 };
    const newSmallBlind = lastLevel.bigBlind;
    const newBigBlind = newSmallBlind * 2;
    onChange([...levels, { smallBlind: newSmallBlind, bigBlind: newBigBlind }])
  }

  const removeLevel = (index: number) => onChange(levels.filter((_, i) => i !== index))

  const updateLevel = (index: number, next: BlindLevel) => {
    const copy = [...levels]
    copy[index] = next
    onChange(copy)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Edit Blind Structure</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {levels.map((level, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="grid grid-cols-2 items-center gap-2 w-full">
              <div className="space-y-1">
                <Label htmlFor={`small-blind-${i}`}>Small Blind</Label>
                <Input
                  id={`small-blind-${i}`}
                  type="number"
                  value={level.smallBlind}
                  onChange={(e) =>
                    updateLevel(i, { ...level, smallBlind: Number(e.target.value) })
                  }
                  onBlur={(e) => {
                    const newSmallBlind = Number(e.target.value);
                    const newBigBlind = Math.max(newSmallBlind * 2, 50);
                    updateLevel(i, { smallBlind: newSmallBlind, bigBlind: newBigBlind });
                  }}
                  className="font-mono"
                  min={1}
                  placeholder="Small blind"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor={`big-blind-${i}`}>Big Blind</Label>
                <div className="flex flex-row">

                  <Input
                    id={`big-blind-${i}`}
                    type="number"
                    value={level.bigBlind}
                    onChange={(e) =>
                      updateLevel(i, { ...level, bigBlind: Number(e.target.value) })
                    }
                    onBlur={(e) => {
                      const newBigBlind = Number(e.target.value);
                      const newSmallBlind = Math.max(25, Math.floor(newBigBlind / 2));
                      updateLevel(i, { smallBlind: newSmallBlind, bigBlind: newBigBlind });
                    }}
                    className="font-mono"
                    min={1}
                    placeholder="Big blind"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeLevel(i)} className="shrink-0 cursor-pointer">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addLevel} className="w-full bg-transparent">
          <Plus className="h-4 w-4 mr-2" />
          Add Level
        </Button>
      </CardContent>
    </Card>
  )
}
