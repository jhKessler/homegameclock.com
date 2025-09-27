"use client";

import { Card } from "~/components/ui/card";
import { formatBlind } from "../utils";

// This component is a dedicated card for showing the current small and big blinds.

interface BlindsDisplayProps {
  smallBlind: number;
  bigBlind: number;
}

export default function BlindsDisplay({ smallBlind, bigBlind }: BlindsDisplayProps) {
  return (
    <Card className="p-12 bg-card border-2 w-full">
      <div className="text-center space-y-6">
        <div className="text-2xl text-muted-foreground">Current Blinds</div>
        <div className="flex items-center justify-center space-x-6 md:space-x-12">
          <div className="text-center">
            <div className="text-xl text-muted-foreground mb-2">Small Blind</div>
            <div className="text-6xl font-bold text-primary">
              {formatBlind(smallBlind)}
            </div>
          </div>
          <div className="text-6xl text-muted-foreground">/</div>
          <div className="text-center">
            <div className="text-xl text-muted-foreground mb-2">Big Blind</div>
            <div className="text-6xl font-bold text-primary">
              {formatBlind(bigBlind)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
