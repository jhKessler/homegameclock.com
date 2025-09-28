"use client";

import { formatTime } from "../utils";

interface CountdownDisplayProps {
  secondsLeft: number;
  isPaused: boolean;
}

export default function CountdownDisplay({
  secondsLeft,
  isPaused,
}: CountdownDisplayProps) {
  const timerClasses = `
    font-mono text-8xl md:text-9xl lg:text-[10rem] font-bold 
    text-balance leading-none mb-4 transition-opacity duration-300
    ${isPaused ? "opacity-30" : "opacity-100"}
  `;

  return (
    <div className="text-center">
      <div className={timerClasses}>{formatTime(secondsLeft)}</div>
      <div className="text-2xl text-muted-foreground">
        {isPaused ? "Paused" : "Time Remaining"}
      </div>
    </div>
  );
}