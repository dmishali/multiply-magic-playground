import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface WelcomeScreenProps {
  onStart: (playerName: string) => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim()) {
      onStart(playerName.trim());
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
          <h1 className="text-3xl font-bold mb-6 text-center" style={{ direction: "rtl" }}>
            ברוכים הבאים למשחק הכפל
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div style={{ direction: "rtl" }}>
              <label className="block text-lg mb-2">איך קוראים לך?</label>
              <Input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-4 text-xl text-right"
                placeholder="הכנס את שמך"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full text-xl py-6 bg-[#1A1F2C] hover:bg-[#2A2F3C]"
              disabled={!playerName.trim()}
            >
              בוא נתחיל!
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;