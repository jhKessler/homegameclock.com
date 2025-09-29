import type { CurrentLevelInfo, ProgressionItem } from "./config-store";

/**
 * The return type for the calculateCurrentLevel function.
 * Note: You'll need to modify your `CurrentLevelInfo` type definition.
 *
 * export interface CurrentLevelInfo extends ProgressionItem {
 * nextSmallBlind: number | null;
 * nextBigBlind: number | null;
 * secondsLeftInLevel: number;
 * secondsElapsedInLevel: number; // The time in seconds the current level has been running.
 * timeToNextBreak: number | null;
 * }
 */

/**
 * Calculates the current level or break based on start and current timestamps.
 * @param progression The array of all levels and breaks.
 * @param timeElapsed The total time elapsed in milliseconds since the timer started.
 * @returns An object with the current progression item, next level's blinds, the seconds left in the current level, and time to the next break, or null.
 */
export const calculateCurrentLevel = (
  progression: ProgressionItem[],
  timeElapsed: number,
): CurrentLevelInfo | null => {
  if (!progression || progression.length === 0) {
    return null;
  }

  const totalSecondsElapsed = Math.floor(timeElapsed / 1000);
  let cumulativeSeconds = 0;

  for (let i = 0; i < progression.length; i++) {
    const currentItem = progression[i]!;
    const itemDurationSeconds = currentItem.seconds;

    if (totalSecondsElapsed < cumulativeSeconds + itemDurationSeconds) {
      const secondsLeftInLevel =
        (cumulativeSeconds + itemDurationSeconds) - totalSecondsElapsed;
      const secondsElapsedInLevel = totalSecondsElapsed - cumulativeSeconds;

      let nextSmallBlind: number | null = null;
      let nextBigBlind: number | null = null;
      for (let j = i + 1; j < progression.length; j++) {
        const nextItem = progression[j]!;
        if (nextItem.type === 'level') {
          nextSmallBlind = nextItem.smallBlind;
          nextBigBlind = nextItem.bigBlind;
          break;
        }
      }

      let timeToNextBreak: number | null = null;
      let secondsUntilBreak = secondsLeftInLevel;
      for (let j = i + 1; j < progression.length; j++) {
        const futureItem = progression[j]!;
        if (futureItem.type === 'break') {
          timeToNextBreak = secondsUntilBreak;
          break;
        }
        secondsUntilBreak += futureItem.seconds;
      }

      return {
        ...currentItem,
        nextSmallBlind,
        nextBigBlind,
        secondsLeftInLevel,
        secondsElapsedInLevel,
        timeToNextBreak,
      };
    }

    cumulativeSeconds += itemDurationSeconds;
  }

  const lastItem = progression[progression.length - 1]!;
  return {
    ...lastItem,
    nextSmallBlind: null,
    nextBigBlind: null,
    secondsLeftInLevel: 0,
    secondsElapsedInLevel: lastItem.seconds,
    timeToNextBreak: null,
  };
};