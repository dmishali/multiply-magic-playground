import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export type TableRange = {
  min: number;
  max: number;
};

interface MultiplicationTableSelectionProps {
  onTableSelect: (range: TableRange) => void;
  playerName: string;
}

const MultiplicationTableSelection = ({ onTableSelect, playerName }: MultiplicationTableSelectionProps) => {
  const tables = [
    { name: "לוח כפל עד 100", range: { min: 1, max: 10 } },
    { name: "לוח כפל מתקדם", range: { min: 1, max: 20 } },
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
            {playerName}, בחר/י את לוח הכפל:
          </div>
          
          <div className="space-y-4">
            {tables.map((table, index) => (
              <Button
                key={index}
                onClick={() => onTableSelect(table.range)}
                className="w-full text-xl py-6 bg-[#1A1F2C] hover:bg-[#2A2F3C] text-right"
              >
                {table.name}
              </Button>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default MultiplicationTableSelection;