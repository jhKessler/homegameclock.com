"use client";

import { Card } from "~/components/ui/card";
import { formatBlind } from "../utils";
import { PrizePool } from "./prize-pool";

interface BlindsDisplayProps {
  smallBlind: number;
  bigBlind: number;
}

export default function BlindsDisplay({
  smallBlind,
  bigBlind,
}: BlindsDisplayProps) {
  return (
    <Card className="p-12 bg-card border-2 w-full grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
      <div className="text-center space-y-6 lg:col-start-2">
        <div className="text-2xl text-muted-foreground">Current Blinds</div>
        <div className="flex items-center justify-center space-x-6 md:space-x-12">
          <div className="text-center">
            <div className="text-xl text-muted-foreground mb-2 text-nowrap">
              Small Blind
            </div>
            <div className="text-6xl font-bold text-primary">
              {formatBlind(smallBlind)}
            </div>
          </div>
          <div className="text-6xl text-muted-foreground">/</div>
          <div className="text-center">
            <div className="text-xl text-muted-foreground mb-2 text-nowrap">
              Big Blind
            </div>
            <div className="text-6xl font-bold text-primary">
              {formatBlind(bigBlind)}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-start-3">
        <PrizePool />
      </div>
    </Card>
  );
}