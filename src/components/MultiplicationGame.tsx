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
      generateQuestion();
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

  const handleNumberClick = (num: string) => {
    if (num === "⌫") {
      setAnswer(prev => prev.slice(0, -1));
    } else {
      setAnswer(prev => prev + num);
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[#1A1F2C]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 bg-card shadow-lg">
          <div className="text-2xl font-bold mb-4" style={{ direction: "rtl" }}>
            ניקוד: {score} {streak > 1 && `🔥 ${streak}`}
          </div>
          
          <div className="text-4xl font-bold mb-8" style={{ direction: "ltr" }}>
            {num1} × {num2} = ?
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              inputMode="none"
              value={answer}
              readOnly
              className="w-full p-4 text-3xl text-center rounded-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none"
              placeholder="התשובה שלך"
            />
            
            <div className="grid grid-cols-3 gap-2">
              {[...'789456123'].split('').map((num) => (
                <Button
                  key={num}
                  type="button"
                  onClick={() => handleNumberClick(num)}
                  className="p-4 text-xl bg-[#2A2F3C] hover:bg-[#3A3F4C]"
                >
                  {num}
                </Button>
              ))}
              <Button
                type="button"
                onClick={() => handleNumberClick('0')}
                className="p-4 text-xl bg-[#2A2F3C] hover:bg-[#3A3F4C]"
              >
                0
              </Button>
              <Button
                type="button"
                onClick={() => handleNumberClick('⌫')}
                className="p-4 text-xl bg-[#2A2F3C] hover:bg-[#3A3F4C]"
              >
                ⌫
              </Button>
            </div>
            
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