"use client";

import type { CurrentLevelInfo } from "~/stores/config/config-store";
import BlindsDisplay from "./_components/blinds-display";
import CountdownDisplay from "./_components/countdown-display";
import InfoPanel from "./_components/info-display";
import StatusIndicator from "./_components/level-type-display";
import LoadingDisplay from "./_components/loading-display";



// This is the main component, now refactored to be a clean container.
// It fetches and holds the state, passing props down to the display components.

interface PokerTimerDisplayProps {
    currentLevelInfo: CurrentLevelInfo | null;
    secondsSinceStart: number;
    totalPricePool: number; // This prop is unused but kept for API consistency
}

export default function PokerTimerDisplay({
    currentLevelInfo,
    secondsSinceStart,
}: PokerTimerDisplayProps) {
    // If there's no data yet, show the loading screen.
    if (!currentLevelInfo) {
        return <LoadingDisplay />;
    }

    const isBreak = currentLevelInfo.type === "break";

    return (
        <div className="min-h-screen p-8 flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center gap-12 lg:gap-16">
                {/* Top section with status and countdown */}
                <section className="flex flex-col items-center space-y-8 lg:space-y-12">
                    <StatusIndicator isBreak={isBreak} />
                    <CountdownDisplay secondsLeft={currentLevelInfo.secondsLeftInLevel} />
                </section>

                {/* Bottom section with blind info and other tournament data */}
                <section className="w-full max-w-6xl flex flex-col items-center space-y-8">
                    <BlindsDisplay
                        smallBlind={currentLevelInfo.smallBlind}
                        bigBlind={currentLevelInfo.bigBlind}
                    />

                    <InfoPanel
                        nextSmallBlind={currentLevelInfo.nextSmallBlind}
                        nextBigBlind={currentLevelInfo.nextBigBlind}
                        timeToNextBreak={currentLevelInfo.timeToNextBreak}
                        totalTime={secondsSinceStart}
                    />
                </section>
            </main>
        </div>
    );
}

