import axios, { AxiosError } from "axios";
import { Quiz, ServerError } from "./quizTypes";

export const getQuiz = async () => {
  try {
    const response = await axios.get("https://quiz-app.ayanshukla.repl.co");
    return response.data.quizData;
  } catch (err) {
    console.log(err);
    return { errorMessage: "something went wrong" };
  }
};

export const getSingleQuiz = async (quizId): Promise<Quiz | ServerError> => {
  try {
    const response = await axios.get(
      `https://quiz-app.ayanshukla.repl.co/quiz/${quizId}`
    );
    return response.data.quiz;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    console.log(err);
    return { errorMessage: "something went wrong" };
  }
};
