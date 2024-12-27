import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { HighScore } from "@/types/game";

interface HighScoresTableProps {
  scores: HighScore[];
  questionsCount: number;
}

const HighScoresTable = ({ scores, questionsCount }: HighScoresTableProps) => {
  if (!scores.length) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-sm mt-6"
    >
      <Card className="p-4 bg-[#1A1F2C] text-white shadow-lg">
        <div className="text-2xl font-bold mb-4 text-center">
          טבלת שיאים עבור {questionsCount} שאלות
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-700">
              <TableHead className="text-center text-lg font-bold text-white">מקום</TableHead>
              <TableHead className="text-center text-lg font-bold text-white">שם</TableHead>
              <TableHead className="text-center text-lg font-bold text-white">ניקוד</TableHead>
              <TableHead className="text-center text-lg font-bold text-white">זמן</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((score, index) => (
              <TableRow key={index} className="border-b border-gray-700">
                <TableCell className="text-center text-lg font-medium">{index + 1}</TableCell>
                <TableCell className="text-center text-lg">{score.playerName}</TableCell>
                <TableCell className="text-center text-lg">{score.score}</TableCell>
                <TableCell className="text-center text-lg">{score.time} שניות</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default HighScoresTable;