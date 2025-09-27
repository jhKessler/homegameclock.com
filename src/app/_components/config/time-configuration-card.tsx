
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip"
import { Clock, Info } from "lucide-react"

type Props = {
  timePerLevel: number
  setTimePerLevel: (n: number) => void
  estimatedDuration: number
}

export function TimeConfigurationCard({ timePerLevel, setTimePerLevel, estimatedDuration }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Time Configuration
        </CardTitle>
        <CardDescription>Set the duration for each blind level</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="time-per-level">Time per level (minutes)</Label>
          <Input
            id="time-per-level"
            type="number"
            value={timePerLevel}
            onChange={(e) => setTimePerLevel(Number(e.target.value))}
            min={1}
            max={120}
            className="text-lg font-mono"
          />
        </div>
        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Estimated Duration
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>With a starting stack of 20000 chips</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-2xl font-bold">
            {Math.floor(estimatedDuration / 60)}h {estimatedDuration % 60}m
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
