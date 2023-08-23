import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionState = Question & { answer: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  Hard = "hard",
}

export const fetchQuiz = async (amount: number, difficulty: Difficulty) => {
  try {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.results.map((question: Question) => ({
      ...question,
      answer: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  } catch (error: any) {
    console.error("Error:", error.message);
  }
};
