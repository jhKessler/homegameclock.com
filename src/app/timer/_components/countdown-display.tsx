"use client";

import { formatTime } from "../utils";



interface CountdownDisplayProps {
  secondsLeft: number;
}

export default function CountdownDisplay({ secondsLeft }: CountdownDisplayProps) {
  return (
    <div className="text-center">
      {/* Add the font-mono class here */}
      <div className="font-mono text-8xl md:text-9xl lg:text-[10rem] font-bold text-balance leading-none mb-4">
        {formatTime(secondsLeft)}
      </div>
      <div className="text-2xl text-muted-foreground">Time Remaining</div>
    </div>
  );
}