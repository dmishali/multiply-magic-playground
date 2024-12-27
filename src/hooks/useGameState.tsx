import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getHighScores, saveHighScore } from '@/utils/highScores';
import type { GameMode, TableRange, GameState, HighScore } from '@/types/game';

export const useGameState = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [tableRange, setTableRange] = useState<TableRange | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    totalQuestions: 0,
    streak: 0,
    elapsedTime: 0,
    gameStarted: false,
    gameFinished: false
  });

  const generateQuestion = () => {
    if (!tableRange) return;
    setNum1(Math.floor(Math.random() * (tableRange.max - tableRange.min + 1)) + tableRange.min);
    setNum2(Math.floor(Math.random() * (tableRange.max - tableRange.min + 1)) + tableRange.min);
    setAnswer("");
  };

  const resetGame = () => {
    setGameState({
      score: 0,
      totalQuestions: 0,
      streak: 0,
      elapsedTime: 0,
      gameStarted: false,
      gameFinished: false
    });
    setAnswer("");
    setGameMode(null);
    setTableRange(null);
    setStartTime(null);
    setHighScores([]);
    generateQuestion();
  };

  useEffect(() => {
    if (playerName && gameMode && tableRange) {
      generateQuestion();
      if (gameMode.timed) {
        getHighScores(gameMode.questions).then(setHighScores);
      }
    }
  }, [playerName, gameMode, tableRange]);

  useEffect(() => {
    let timer: number;
    if (gameState.gameStarted && gameMode?.timed && startTime !== null && !gameState.gameFinished) {
      timer = window.setInterval(() => {
        setGameState(prev => ({
          ...prev,
          elapsedTime: Math.floor((Date.now() - startTime) / 1000)
        }));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState.gameStarted, gameMode, startTime, gameState.gameFinished]);

  const handleAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameState.gameStarted) {
      setGameState(prev => ({ ...prev, gameStarted: true }));
      setStartTime(Date.now());
    }

    const correctAnswer = num1 * num2;
    const isCorrect = parseInt(answer) === correctAnswer;
    
    setGameState(prev => ({
      ...prev,
      totalQuestions: prev.totalQuestions + 1,
      score: isCorrect ? prev.score + 1 : prev.score,
      streak: isCorrect ? prev.streak + 1 : 0
    }));
    
    if (isCorrect) {
      toast.success("נכון! 🎉", {
        description: gameState.streak >= 2 ? `${gameState.streak + 1} ברצף! מדהים!` : "המשך כך!",
        position: "top-center",
        style: {
          fontSize: "1.2rem",
          padding: "0.75rem",
          backgroundColor: "#4ade80",
          color: "white",
          border: "none",
        },
      });
    } else {
      toast.error("טעות!", {
        description: `התשובה הנכונה היא ${correctAnswer}`,
        position: "top-center",
        style: {
          fontSize: "1.2rem",
          padding: "0.75rem",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
        },
      });
    }

    if (gameMode && gameState.totalQuestions + 1 >= gameMode.questions) {
      const finalTime = Math.floor((Date.now() - (startTime || 0)) / 1000);
      setGameState(prev => ({ ...prev, gameFinished: true }));
      
      if (gameMode.timed) {
        const newScore: HighScore = {
          playerName: playerName || "אנונימי",
          score: gameState.score + (isCorrect ? 1 : 0),
          time: finalTime,
          date: new Date().toISOString()
        };
        
        const updatedScores = await saveHighScore(gameMode.questions, newScore);
        setHighScores(updatedScores);
      }

      toast.success("כל הכבוד! סיימת את המשחק!", {
        description: `ענית נכון על ${gameState.score + (isCorrect ? 1 : 0)} שאלות מתוך ${gameMode.questions} שאלות בזמן של ${finalTime} שניות`,
        position: "top-center",
        duration: 5000,
        style: {
          fontSize: "1.25rem",
          padding: "1rem",
          backgroundColor: "#4ade80",
          color: "white",
          border: "none",
        },
      });
    } else {
      generateQuestion();
    }
  };

  return {
    num1,
    num2,
    answer,
    setAnswer,
    playerName,
    setPlayerName,
    gameMode,
    setGameMode,
    tableRange,
    setTableRange,
    highScores,
    gameState,
    handleAnswer,
    resetGame
  };
};