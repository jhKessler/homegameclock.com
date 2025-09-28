import Link from "next/link"
import { Frown } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

const PlayingCard = ({
  rank,
  suit,
}: {
  rank: string
  suit: "♠" | "♥" | "♦" | "♣"
}) => {
  const isRed = suit === "♥" || suit === "♦"
  const colorClass = isRed ? "text-red-500" : "text-foreground"

  return (
    <div className="relative flex h-32 w-24 transform-gpu cursor-default items-center justify-center rounded-lg border bg-card p-2 shadow-md transition-transform hover:-translate-y-2 hover:shadow-xl">
      <div className={`absolute top-1 left-2 text-xl font-bold ${colorClass}`}>
        {rank}
      </div>
      <div className={`absolute -top-0.5 left-7 text-lg ${colorClass}`}>
        {suit}
      </div>
      <div className={`text-6xl ${colorClass}`}>{suit}</div>
      <div
        className={`absolute bottom-1 right-2 rotate-180 text-xl font-bold ${colorClass}`}
      >
        {rank}
      </div>
      <div
        className={`absolute -bottom-0.5 right-7 rotate-180 text-lg ${colorClass}`}
      >
        {suit}
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-fade-in text-center">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Frown className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="mt-4 text-5xl font-bold tracking-tight">
            404 - Bad Beat
          </CardTitle>
          <CardDescription className="pt-2 text-lg">
            Looks like you&apos;ve been dealt a bad hand.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            The page you&apos;re looking for isn&apos;t in the deck. It might have been
            folded, discarded, or never existed in the first place.
          </p>
          <div className="flex select-none items-center justify-center gap-4">
            <PlayingCard rank="2" suit="♠" />
            <PlayingCard rank="7" suit="♥" />
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/">Return to the Lobby</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}