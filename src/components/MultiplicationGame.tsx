import { useRef } from "react";
import { Button } from "@/components/ui/button";
import WelcomeScreen from "./WelcomeScreen";
import GameModeSelection from "./GameModeSelection";
import MultiplicationTableSelection from "./MultiplicationTableSelection";
import GameQuestion from "./game/GameQuestion";
import HighScoresTable from "./game/HighScoresTable";
import { useGameState } from "@/hooks/useGameState";

const MultiplicationGame = () => {
  const {
    num1,
    num2,
    answer,
    setAnswer,
    playerName,
    setPlayerName,
    gameMode,
    setGameMode,
    tableRange,
    setTableRange,
    highScores,
    gameState,
    handleAnswer,
    resetGame
  } = useGameState();
  
  const inputRef = useRef<HTMLInputElement>(null);

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
            onSubmit={handleAnswer}
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

      {gameMode?.timed && highScores.length > 0 && (
        <HighScoresTable scores={highScores} questionsCount={gameMode.questions} />
      )}
    </div>
  );
};

export default MultiplicationGame;