"use client";

import { Card } from "~/components/ui/card";
import { formatBlind, formatTime } from "../utils";

// A sub-component for individual data points within the InfoPanel.
const InfoItem = ({
  title,
  value,
}: {
  title: string;
  value: React.ReactNode;
}) => (
  <div className="text-center flex-1 min-w-[150px]">
    <div className="text-2xl text-muted-foreground mb-3">{title}</div>
    <div className="text-xl font-bold">{value}</div>
  </div>
);

// This is the new, single card that combines Next Level, Next Break, and Total Time.
interface InfoPanelProps {
  nextSmallBlind: number | null;
  nextBigBlind: number | null;
  timeToNextBreak: number | null;
  totalTime: number;
}

export default function InfoPanel({
  nextSmallBlind,
  nextBigBlind,
  timeToNextBreak,
  totalTime,
}: InfoPanelProps) {
  return (
    <Card className="p-8 bg-secondary w-full">
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 ">
        <InfoItem
          title="Next Level"
          value={
            nextSmallBlind && nextBigBlind ? (
              `${formatBlind(nextSmallBlind)} / ${formatBlind(nextBigBlind)}`
            ) : (
              <span className="text-accent">Tournament End</span>
            )
          }
        />

        {/* Conditionally render the "Next Break" item only if the data exists */}
        {timeToNextBreak !== null && (
          <InfoItem title="Next Break" value={formatTime(timeToNextBreak)} />
        )}

        <InfoItem title="Total Time" value={formatTime(totalTime)} />
      </div>
    </Card>
  );
}
