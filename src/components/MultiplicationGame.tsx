import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WelcomeScreen from "./WelcomeScreen";
import GameModeSelection from "./GameModeSelection";
import type { GameMode } from "./GameModeSelection";

const MultiplicationGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answer, setAnswer] = useState("");
  const [streak, setStreak] = useState(0);
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 12) + 1);
    setNum2(Math.floor(Math.random() * 12) + 1);
    setAnswer("");
  };

  const resetGame = () => {
    setScore(0);
    setTotalQuestions(0);
    setStreak(0);
    setAnswer("");
    setGameMode(null);
    setStartTime(null);
    setElapsedTime(0);
    setGameStarted(false);
    generateQuestion();
  };

  useEffect(() => {
    if (playerName && gameMode) {
      generateQuestion();
    }
  }, [playerName, gameMode]);

  useEffect(() => {
    let timer: number;
    if (gameStarted && gameMode?.timed && startTime !== null) {
      timer = window.setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameMode, startTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }

    const correctAnswer = num1 * num2;
    setTotalQuestions(prev => prev + 1);
    
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
      toast.success("נכון! 🎉", {
        description: streak >= 2 ? `${streak + 1} ברצף! מדהים!` : "המשך כך!",
        position: "top-center",
        style: {
          fontSize: "1.5rem",
          padding: "1rem",
          backgroundColor: "#4ade80",
          color: "white",
          border: "none",
        },
      });

      if (gameMode && totalQuestions + 1 >= gameMode.questions) {
        const finalTime = Math.floor((Date.now() - (startTime || 0)) / 1000);
        toast.success("כל הכבוד! סיימת את המשחק!", {
          description: `זמן סופי: ${finalTime} שניות`,
          position: "top-center",
          duration: 5000,
        });
        setTimeout(resetGame, 3000);
      } else {
        generateQuestion();
      }
    } else {
      setStreak(0);
      toast.error("נסה שוב!", {
        description: `התשובה הנכונה היא ${correctAnswer}`,
        position: "top-center",
        style: {
          fontSize: "1.5rem",
          padding: "1rem",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
        },
      });
    }
  };

  if (!playerName) {
    return <WelcomeScreen onStart={setPlayerName} />;
  }

  if (!gameMode) {
    return <GameModeSelection onModeSelect={setGameMode} playerName={playerName} />;
  }

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[#1A1F2C]">
      <Button
        onClick={resetGame}
        variant="outline"
        size="sm"
        className="absolute top-4 left-4 bg-violet-600 text-white border-violet-400 hover:bg-violet-700 hover:text-white hover:border-violet-500"
      >
        משחק חדש
      </Button>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 bg-card shadow-lg">
          <div className="text-2xl font-bold mb-2" style={{ direction: "rtl" }}>
            שלום {playerName}!
          </div>
          <div className="text-2xl font-bold mb-2" style={{ direction: "rtl" }}>
            ניקוד: {score}/{totalQuestions} {streak > 1 && `🔥 ${streak}`}
          </div>
          {gameMode.timed && gameStarted && (
            <div className="text-xl font-bold mb-4" style={{ direction: "rtl" }}>
              זמן: {elapsedTime} שניות
            </div>
          )}
          
          <div className="text-4xl font-bold mb-8" style={{ direction: "ltr" }}>
            {num1} × {num2} = ?
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 text-3xl text-center rounded-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="התשובה שלך"
            />
            
            <Button 
              type="submit"
              className="w-full text-xl py-6 bg-[#1A1F2C] hover:bg-[#2A2F3C]"
              disabled={!answer}
            >
              בדוק תשובה
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default MultiplicationGame;