import { Quiz } from "../../API/quizTypes";
import { ACTIONTYPE } from "./reducerTypes";

export type InitialState = {
  quizzes: Array<Quiz> | null;
  currentQuiz: Quiz | null;
  score: number;
  questionNo: number;
};

export const initialState: InitialState = {
  quizzes: null,
  currentQuiz: null,
  score: 0,
  questionNo: 0
};

export const quizReducer = (
  state: InitialState,
  action: ACTIONTYPE
): InitialState => {
  switch (action.type) {
    case "INIT_QUIZ":
      return { ...state, quizzes: action.payload.quizzes };

    case "INIT_CURRENT_QUIZ":
      const foundQuiz = action.payload.quiz as Quiz;
      foundQuiz.questions.map(item => (item.clickedOption = null));
      return { ...state, currentQuiz: foundQuiz };

    case "INCREMENT_SCORE":
      return { ...state, score: state.score + action.payload.score };

    case "DECREMENT_SCORE":
      return { ...state, score: state.score - action.payload.score };

    case "INCREMENT_QUESTION":
      return { ...state, questionNo: state.questionNo + 1 };

    case "CLICKED_OPTION_ID":
      return {
        ...state,
        currentQuiz: {
          ...state.currentQuiz,
          questions: state.currentQuiz?.questions.map(item =>
            item.id === action.payload.questionId
              ? {
                  ...item,
                  clickedOption: action.payload.clickedOption
                }
              : item
          )
        } as Quiz
      };

    case "RESET":
      return {
        ...state,
        score: 0,
        questionNo: 0
      };
    default:
      return state;
  }
};
