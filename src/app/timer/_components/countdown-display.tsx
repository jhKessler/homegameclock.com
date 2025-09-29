"use client";

import { formatTime } from "../utils";

interface CountdownDisplayProps {
  secondsLeft: number;
  isPaused: boolean;
  isBreak: boolean;
}

export default function CountdownDisplay({
  secondsLeft,
  isPaused,
  isBreak,
}: CountdownDisplayProps) {
  const timerClasses = `
    font-mono text-8xl md:text-9xl lg:text-[10rem] font-bold 
    text-balance leading-none mb-4 transition-all duration-300
    ${isPaused ? "opacity-30" : "opacity-100"}
    ${isBreak ? "text-orange-400" : ""}
  `;

  const getStatusText = () => {
    if (isPaused) return "Paused";
    if (isBreak) return "Break Time";
    return "Time to Focus";
  };

  return (
    <div className="text-center">
      <div className={timerClasses}>{formatTime(secondsLeft)}</div>
      <div className="text-2xl text-muted-foreground">{getStatusText()}</div>
    </div>
  );
}