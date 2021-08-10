import axios from "axios";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answer: string[];
  question: string;
  type: string;
  answers: string[];
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
) => {
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=${amount}&category=26&difficulty=${difficulty}&type=multiple`
  );

  return response.data.results.map((item: Question) => ({ ...item }));
};
