import { supabase } from '@/lib/supabase';
import type { HighScore } from '@/types/game';

export const getHighScores = async (questionsCount: number): Promise<HighScore[]> => {
  try {
    const { data, error } = await supabase
      .from('high_scores')
      .select('*')
      .eq('questions_count', questionsCount)
      .order('score', { ascending: false })
      .order('time', { ascending: true })
      .limit(5);

    if (error) {
      console.warn('Error fetching high scores:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch high scores:', error);
    return [];
  }
};

export const saveHighScore = async (questionsCount: number, newScore: HighScore) => {
  try {
    const { error } = await supabase
      .from('high_scores')
      .insert([{
        player_name: newScore.playerName,
        score: newScore.score,
        time: newScore.time,
        questions_count: questionsCount,
        date: new Date().toISOString()
      }]);

    if (error) {
      console.warn('Error saving high score:', error);
      return [];
    }

    // Fetch updated high scores after inserting
    return getHighScores(questionsCount);
  } catch (error) {
    console.warn('Failed to save high score:', error);
    return [];
  }
};