import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const MultiplicationGame = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [score, setScore] = useState(0);
  const [answer, setAnswer] = useState("");
  const [streak, setStreak] = useState(0);

  const generateQuestion = () => {
    setNum1(Math.floor(Math.random() * 12) + 1);
    setNum2(Math.floor(Math.random() * 12) + 1);
    setAnswer("");
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = num1 * num2;
    
    if (parseInt(answer) === correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
      toast.success("Correct! 🎉", {
        description: streak >= 2 ? `${streak + 1} in a row! Amazing!` : "Keep going!",
      });
      generateQuestion();
    } else {
      setStreak(0);
      toast.error("Try again!", {
        description: `The correct answer was ${correctAnswer}`,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 bg-card shadow-lg">
          <div className="text-2xl font-bold mb-4">
            Score: {score} {streak > 1 && `🔥 ${streak}`}
          </div>
          
          <div className="text-4xl font-bold mb-8">
            {num1} × {num2} = ?
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="number"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full p-4 text-3xl text-center rounded-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="Your answer"
              autoFocus
            />
            
            <Button 
              type="submit"
              className="w-full text-xl py-6 bg-[#1A1F2C] hover:bg-[#2A2F3C]"
              disabled={!answer}
            >
              Check Answer
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default MultiplicationGame;