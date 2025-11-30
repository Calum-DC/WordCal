import { WORDS } from './words';

// Returns a daily word that changes at 8 PM UTC
export const getDailyWord = () => {
  const now = new Date();

  // Use previous day if before 8 PM UTC
  if (now.getUTCHours() < 20) {
    now.setUTCDate(now.getUTCDate() - 1);
  }

  const start = new Date(Date.UTC(2025, 0, 1));

  // Convert to numbers (milliseconds) for arithmetic
  const diffMs = now.getTime() - start.getTime();
  const dayNumber = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const index = dayNumber % WORDS.length;
  return WORDS[index];
};
