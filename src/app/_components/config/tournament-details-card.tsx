
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Users } from "lucide-react"

type PlayerOptions = { players: number | null; buyIn: number | null }

type Props = {
  playerOptions: PlayerOptions
  onOpenPlayerOptions: () => void
  isDisabled: boolean
}

export function TournamentDetailsCard({ playerOptions, onOpenPlayerOptions, isDisabled }: Props) {
  const players = playerOptions.players ?? 0
  const buyIn = playerOptions.buyIn ?? 0
  const showStats = playerOptions.players != null && playerOptions.buyIn != null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tournament Details</CardTitle>
        <CardDescription>Optional tournament information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" onClick={onOpenPlayerOptions} className="w-full justify-start" disabled={isDisabled}>
          <Users className="mr-2 h-4 w-4" />
          {showStats ? `${players} players • $${buyIn} buy-in` : "Set Players & Buy-in"}
        </Button>

        {showStats && (
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="text-sm text-muted-foreground">Total Prize Pool</div>
              <div className="text-2xl font-bold">
                ${(players * buyIn).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
