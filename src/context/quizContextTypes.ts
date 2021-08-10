import { InitialState } from "./reducer/quizReducer";

export type QuizContextTypes = {
  state: InitialState;
  dispatch: React.Dispatch<any>;
  loading: boolean;
  setLoading: any;
};
