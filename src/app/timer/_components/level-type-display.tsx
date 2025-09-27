"use client";

// This component displays whether it's currently a blind level or a break.

interface StatusIndicatorProps {
  isBreak: boolean;
}

export default function StatusIndicator({ isBreak }: StatusIndicatorProps) {
  const text = isBreak ? "Players are now on break" : "Level Time";
  const styling = isBreak
    ? "bg-destructive text-destructive-foreground"
    : "bg-primary text-primary-foreground";

  return (
    <div className={`px-8 py-4 rounded-xl text-2xl font-bold ${styling}`}>
      {text}
    </div>
  );
}
