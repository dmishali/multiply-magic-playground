export type GameMode = {
  questions: number;
  timed: boolean;
};

export type TableRange = {
  min: number;
  max: number;
};

export type HighScore = {
  playerName: string;
  score: number;
  time: number;
  date: string;
};

export type GameState = {
  score: number;
  totalQuestions: number;
  streak: number;
  elapsedTime: number;
  gameStarted: boolean;
  gameFinished: boolean;
};