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
      <Card className="p-4 bg-card shadow-lg">
        <div className="text-xl font-bold mb-4 text-right">
          {questionsCount} שאלות - טבלת שיאים
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">מקום</TableHead>
              <TableHead className="text-right">שם</TableHead>
              <TableHead className="text-right">ניקוד</TableHead>
              <TableHead className="text-right">זמן</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((score, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{score.playerName}</TableCell>
                <TableCell>{score.score}</TableCell>
                <TableCell>{score.time} שניות</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default HighScoresTable;