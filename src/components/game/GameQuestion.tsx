import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GameQuestionProps {
  num1: number;
  num2: number;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const GameQuestion = ({ num1, num2, answer, onAnswerChange, onSubmit, inputRef }: GameQuestionProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-sm"
    >
      <Card className="p-6 bg-card shadow-lg">
        <div className="text-4xl font-bold mb-8 text-center">
          {num1} × {num2} = ?
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            className="w-full p-4 text-3xl text-center rounded-lg border-2 border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none"
            placeholder="התשובה שלך"
            autoFocus
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
  );
};

export default GameQuestion;