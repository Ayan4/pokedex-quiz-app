import React, {
  createContext,
  useState,
  useContext,
  useReducer,
  useEffect
} from "react";
import { initialState, quizReducer } from "./reducer/quizReducer";
import { QuizContextTypes } from "./quizContextTypes";
import { getQuiz } from "../API/quizData";

const QuizContext = createContext<QuizContextTypes>({
  state: initialState,
  dispatch: () => null,
  loading: false,
  setLoading: null
});

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const allQuizzes = await getQuiz();
        dispatch({
          type: "INIT_QUIZ",
          payload: { quizzes: allQuizzes }
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <QuizContext.Provider value={{ state, dispatch, loading, setLoading }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
