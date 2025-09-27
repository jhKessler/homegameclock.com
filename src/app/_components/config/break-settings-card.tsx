
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Coffee, Settings } from "lucide-react"

type BreakConfig = { enabled: boolean; everyXLevels: number; duration: number }

type Props = {
  breakConfig: BreakConfig
  onOpenBreakModal: () => void
  totalLevels: number
}

export function BreakSettingsCard({ breakConfig, onOpenBreakModal, totalLevels }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coffee className="h-5 w-5 text-primary" />
          Break Settings
        </CardTitle>
        <CardDescription>Configure tournament breaks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" onClick={onOpenBreakModal} className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          {breakConfig.enabled
            ? `Break every ${breakConfig.everyXLevels} levels (${breakConfig.duration}min)`
            : "Configure Breaks"}
        </Button>
        {breakConfig.enabled && (
          <div className="space-y-2">
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm text-muted-foreground">Current Settings</div>
              <div className="text-sm font-medium">
                Break every {breakConfig.everyXLevels} levels for {breakConfig.duration} minutes
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm text-muted-foreground">Total Breaks</div>
              <div className="text-2xl font-bold">
                {Math.floor(totalLevels / breakConfig.everyXLevels)}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
