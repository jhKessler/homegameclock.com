"use client";

import { Button } from "~/components/ui/button";
import type { CurrentLevelInfo } from "~/stores/config/config-store";
import BlindsDisplay from "./_components/blinds-display";
import CountdownDisplay from "./_components/countdown-display";
import InfoPanel from "./_components/info-display";
import StatusIndicator from "./_components/level-type-display";
import LoadingDisplay from "./_components/loading-display";
import ConfirmationDialog from "~/components/ui/confirmation-dialog";
import { PlayPauseButton } from "./_components/play-pause-button";

interface PokerTimerDisplayProps {
    currentLevelInfo: CurrentLevelInfo | null;
    secondsSinceStart: number;
    totalPricePool: number | null;
    onReset: () => void;
    isPaused: boolean;
}

export default function PokerTimerDisplay({
    currentLevelInfo,
    secondsSinceStart,
    totalPricePool,
    onReset,
    isPaused
}: PokerTimerDisplayProps) {

    if (!currentLevelInfo) {
        return <LoadingDisplay />;
    }

    const isBreak = currentLevelInfo.type === "break";

    return (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center">
            <main className="flex-1 flex flex-col items-center justify-center gap-12 lg:gap-16 w-full max-w-6xl">
                <section className="flex flex-col items-center space-y-8 lg:space-y-12 w-full">
                    <div className="grid grid-cols-3 w-full items-center">
                        <ConfirmationDialog
                            onConfirm={onReset}
                            title="Are you absolutely sure?"
                            description="This action cannot be undone. This will permanently stop and reset the poker timer."
                        >
                            <Button
                                variant="secondary"
                                aria-label="Stop and reset the timer"
                                size="lg"
                                className="justify-self-start"
                            >
                                Stop Timer
                            </Button>
                        </ConfirmationDialog>
                        <StatusIndicator isBreak={isBreak} className="justify-self-center" />
                        <div className="justify-self-end">
                            {!isBreak && <PlayPauseButton />}
                        </div>
                    </div>
                    <CountdownDisplay secondsLeft={currentLevelInfo.secondsLeftInLevel} isPaused={isPaused} />
                </section>

                <section className="flex flex-col items-center space-y-8 w-full">
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