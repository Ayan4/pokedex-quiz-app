import { Quiz } from "../../API/quizTypes";

export type ACTIONTYPE =
  | { type: "INIT_QUIZ"; payload: { quizzes: Array<Quiz> } }
  | { type: "INCREMENT_SCORE"; payload: { score: number } }
  | { type: "DECREMENT_SCORE"; payload: { score: number } }
  | { type: "INCREMENT_QUESTION" }
  | { type: "INIT_CURRENT_QUIZ"; payload: { quiz: Quiz } }
  | {
      type: "CLICKED_OPTION_ID";
      payload: { clickedOption: string; questionId: string };
    }
  | { type: "RESET" };
