import { Trophy } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';

type Player = {
  name: string;
  points: number;
  champion: boolean;
};

const players: Player[] = [
  { name: 'Colin', points: 3, champion: false },
  { name: 'Max', points: 2, champion: false },
  { name: 'Anton', points: 2, champion: false },
  { name: 'Johnny', points: 5, champion: true },
  { name: 'Bela', points: 4, champion: false },
  { name: 'David', points: 0, champion: false },
  { name: 'Lenny', points: 2, champion: false },
];

export default function LeaderboardPage() {
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (a.champion !== b.champion) return a.champion ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Leaderboard Season 2025</h1>
          <p className="text-muted-foreground text-lg">See who&apos;s on top of the game.</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Current Standings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPlayers.map((player, index) => (
                  <TableRow key={player.name}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {player.name}
                        {player.champion && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                            <Trophy className="h-4 w-4" />
                            Last Winner
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      {player.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}