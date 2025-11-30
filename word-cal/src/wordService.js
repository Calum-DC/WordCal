import { WORDS } from './words';

// Returns a daily word that changes at 8 AM UTC
export const getDailyWord = () => {
  const now = new Date();

  if (now.getUTCHours() < 8) {
    now.setUTCDate(now.getUTCDate() - 1);
  }

  const start = new Date(Date.UTC(2025, 0, 1));
  const diffMs = now.getTime() - start.getTime();
  const dayNumber = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const index = dayNumber % WORDS.length;
  return WORDS[index];
};
