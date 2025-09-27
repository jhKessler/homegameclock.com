"use client";

// This file contains helper functions for formatting time and blind amounts.
// Separating pure functions like these makes them easy to test and reuse elsewhere.

/**
 * Formats a number of seconds into a HH:MM:SS or MM:SS string.
 * @param seconds The total seconds to format.
 * @returns A formatted time string.
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Formats a blind amount into a short string (e.g., 1000 -> 1K, 1500000 -> 1.5M).
 * @param amount The numerical blind amount.
 * @returns A formatted string for the blind amount.
 */
export function formatBlind(amount: number): string {
  if (amount >= 1000000 && amount % 1000000 === 0) {
    // Use toFixed(1) for millions to show precision like 1.5M
    return `${(amount / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (amount >= 1000 && amount % 1000 === 0) {
    return `${(amount / 1000).toFixed(0)}K`;
  }
  return amount.toString();
}
