import type { HighScore } from "@/types/game";

const HIGH_SCORES_KEY = "multiplicationGameHighScores";

export const getHighScores = (questionsCount: number): HighScore[] => {
  const allScores = JSON.parse(localStorage.getItem(HIGH_SCORES_KEY) || "{}");
  return (allScores[questionsCount] || []).slice(0, 5);
};

export const saveHighScore = (questionsCount: number, newScore: HighScore) => {
  const allScores = JSON.parse(localStorage.getItem(HIGH_SCORES_KEY) || "{}");
  const currentScores = allScores[questionsCount] || [];
  
  const updatedScores = [...currentScores, newScore]
    .sort((a, b) => {
      // First sort by score
      if (b.score !== a.score) return b.score - a.score;
      // If scores are equal, sort by time (faster time is better)
      return a.time - b.time;
    })
    .slice(0, 5);

  allScores[questionsCount] = updatedScores;
  localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(allScores));
  
  return updatedScores;
};