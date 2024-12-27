import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import WelcomeScreen from "./WelcomeScreen";
import GameModeSelection from "./GameModeSelection";
import MultiplicationTableSelection from "./MultiplicationTableSelection";
import GameQuestion from "./game/GameQuestion";
import HighScoresTable from "./game/HighScoresTable";
import { getHighScores, saveHighScore } from "@/utils/highScores";
import type { GameMode, TableRange, GameState, HighScore } from "@/types/game";

const MultiplicationGame = () => {
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
  
  const inputRef = useRef<HTMLInputElement>(null);

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
        setHighScores(getHighScores(gameMode.questions));
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

  const handleSubmit = (e: React.FormEvent) => {
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
        
        const updatedScores = saveHighScore(gameMode.questions, newScore);
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

  if (!playerName) {
    return <WelcomeScreen onStart={setPlayerName} />;
  }

  if (!gameMode) {
    return <GameModeSelection onModeSelect={setGameMode} playerName={playerName} />;
  }

  if (!tableRange) {
    return <MultiplicationTableSelection onTableSelect={setTableRange} playerName={playerName} />;
  }

  return (
    <div className="min-h-[90vh] p-4 flex flex-col items-center justify-start pt-16 bg-[#1A1F2C]">
      <Button
        onClick={resetGame}
        variant="outline"
        size="sm"
        className="absolute top-4 left-4 bg-violet-600 text-white border-violet-400 hover:bg-violet-700 hover:text-white hover:border-violet-500"
      >
        משחק חדש
      </Button>
      
      {!gameState.gameFinished ? (
        <>
          <div className="text-2xl font-bold mb-2 text-right text-white">
            שלום {playerName}!
          </div>
          <div className="text-2xl font-bold mb-2 text-right text-white">
            ניקוד: {gameState.score}/{gameState.totalQuestions} {gameState.streak > 1 && `🔥 ${gameState.streak}`}
          </div>
          {gameMode?.timed && gameState.gameStarted && (
            <div className="text-xl font-bold mb-4 text-right text-white">
              זמן: {gameState.elapsedTime} שניות
            </div>
          )}
          
          <GameQuestion
            num1={num1}
            num2={num2}
            answer={answer}
            onAnswerChange={setAnswer}
            onSubmit={handleSubmit}
            inputRef={inputRef}
          />
        </>
      ) : (
        <div className="text-3xl font-bold text-center text-white space-y-4">
          <div>
            ענית נכון על {gameState.score} שאלות מתוך {gameMode?.questions} שאלות
            {gameMode?.timed && ` בזמן של ${gameState.elapsedTime} שניות`}
          </div>
        </div>
      )}

      {gameMode.timed && highScores.length > 0 && (
        <HighScoresTable scores={highScores} questionsCount={gameMode.questions} />
      )}
    </div>
  );
};

export default MultiplicationGame;