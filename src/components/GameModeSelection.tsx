import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export type GameMode = {
  questions: number;
  timed: boolean;
};

interface GameModeSelectionProps {
  onModeSelect: (mode: GameMode) => void;
  playerName: string;
}

const GameModeSelection = ({ onModeSelect, playerName }: GameModeSelectionProps) => {
  const modes: GameMode[] = [
    { questions: 10, timed: true },
    { questions: 20, timed: true },
    { questions: 50, timed: true },
    { questions: Infinity, timed: false },
  ];

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-[#1A1F2C]">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 bg-card shadow-lg">
          <div className="text-2xl font-bold mb-6 text-right">
            {playerName}, בחר/י מצב משחק:
          </div>
          
          <div className="space-y-4">
            {modes.map((mode, index) => (
              <Button
                key={index}
                onClick={() => onModeSelect(mode)}
                className="w-full text-xl py-6 bg-[#1A1F2C] hover:bg-[#2A2F3C]"
              >
                {mode.timed
                  ? `${mode.questions} שאלות עם זמן`
                  : "תרגול בלי זמנים"}
              </Button>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default GameModeSelection;