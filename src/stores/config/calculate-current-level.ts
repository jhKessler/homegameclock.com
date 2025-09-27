import type { CurrentLevelInfo, ProgressionItem } from "./config-store";

/**
 * The return type for the calculateCurrentLevel function.
 * Note: You'll need to modify your `CurrentLevelInfo` type definition.
 *
 * export interface CurrentLevelInfo extends ProgressionItem {
 * nextSmallBlind: number | null;
 * nextBigBlind: number | null;
 * secondsLeftInLevel: number; // <-- Replaces currentLevelStart
 * timeToNextBreak: number | null;
 * }
 */

/**
 * Calculates the current level or break based on start and current timestamps.
 * @param progression The array of all levels and breaks.
 * @param startTime The timestamp (e.g., from Date.now()) when the timer started.
 * @param currentTime The current timestamp (e.g., from Date.now()).
 * @returns An object with the current progression item, next level's blinds, the seconds left in the current level, and time to the next break, or null.
 */
export const calculateCurrentLevel = (
  progression: ProgressionItem[],
  startTime: number,
  currentTime: number,
): CurrentLevelInfo | null => {
  if (!progression || progression.length === 0 || !startTime) {
    return null;
  }

  const totalSecondsElapsed = Math.floor((currentTime - startTime) / 1000);
  let cumulativeSeconds = 0;

  for (let i = 0; i < progression.length; i++) {
    const currentItem = progression[i]!;
    const itemDurationSeconds = currentItem.seconds;

    // Check if the elapsed time falls within the duration of the current item.
    if (totalSecondsElapsed < cumulativeSeconds + itemDurationSeconds) {
      // This is the current item.
      
      // Calculate the remaining seconds for the current item.
      const secondsLeftInLevel =
        (cumulativeSeconds + itemDurationSeconds) - totalSecondsElapsed;

      // Find the next *level* to display upcoming blinds.
      let nextSmallBlind: number | null = null;
      let nextBigBlind: number | null = null;
      for (let j = i + 1; j < progression.length; j++) {
        const nextItem = progression[j]!;
        if (nextItem.type === 'level') {
          nextSmallBlind = nextItem.smallBlind;
          nextBigBlind = nextItem.bigBlind;
          break; // Found the next level, so we can stop searching.
        }
      }

      // Calculate time to the next break.
      let timeToNextBreak: number | null = null;
      // Start countdown with time remaining in the current item.
      let secondsUntilBreak = secondsLeftInLevel;
      // Look ahead from the *next* item to find a break.
      for (let j = i + 1; j < progression.length; j++) {
        const futureItem = progression[j]!;
        if (futureItem.type === 'break') {
          timeToNextBreak = secondsUntilBreak;
          break; // Found the next break, stop accumulating time.
        }
        // If it's not a break, add its full duration to our countdown.
        secondsUntilBreak += futureItem.seconds;
      }

      return {
        ...currentItem,
        nextSmallBlind,
        nextBigBlind,
        secondsLeftInLevel, // Return seconds left instead of start time
        timeToNextBreak,
      };
    }

    // Move to the next item's time slot.
    cumulativeSeconds += itemDurationSeconds;
  }

  // If the loop completes, the time has exceeded the entire schedule.
  // Return the last item with 0 seconds remaining.
  const lastItem = progression[progression.length - 1]!;

  return {
    ...lastItem,
    nextSmallBlind: null,
    nextBigBlind: null,
    secondsLeftInLevel: 0, // The level is over
    timeToNextBreak: null, // No future breaks are possible
  };
};