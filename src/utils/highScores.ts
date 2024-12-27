import { supabase } from '@/lib/supabase';
import type { HighScore } from '@/types/game';

export const getHighScores = async (questionsCount: number): Promise<HighScore[]> => {
  const { data, error } = await supabase
    .from('high_scores')
    .select('*')
    .eq('questions_count', questionsCount)
    .order('score', { ascending: false })
    .order('time', { ascending: true })
    .limit(5);

  if (error) {
    console.error('Error fetching high scores:', error);
    return [];
  }

  return data || [];
};

export const saveHighScore = async (questionsCount: number, newScore: HighScore) => {
  const { data, error } = await supabase
    .from('high_scores')
    .insert([{
      player_name: newScore.playerName,
      score: newScore.score,
      time: newScore.time,
      questions_count: questionsCount,
      date: new Date().toISOString()
    }])
    .select();

  if (error) {
    console.error('Error saving high score:', error);
    return [];
  }

  // Fetch updated high scores after inserting
  return getHighScores(questionsCount);
};