"use client";

import { cn } from "~/lib/utils"; // Assuming you have a cn utility for merging classes

interface StatusIndicatorProps {
    isBreak: boolean;
    className?: string;
}

export default function StatusIndicator({ isBreak, className }: StatusIndicatorProps) {
    if (isBreak) {
        return (
            <div
                className={cn(
                    "rounded-xl bg-destructive px-8 py-4 text-center text-3xl font-bold text-destructive-foreground shadow-lg animate-pulse",
                    className
                )}
            >
                Players are on break
            </div>
        );
    }

    return (
        <div
            className={cn(
                "rounded-xl px-8 py-4 text-center text-4xl font-semibold text-secondary-foreground",
                className
            )}
        >
            Level Time
        </div>
    );
}