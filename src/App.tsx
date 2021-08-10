import React from "react";
import SelectQuiz from "./routes/SelectQuiz";
import { Routes, Route } from "react-router-dom";
import QuizPage from "./routes/QuizPage";
import ResultPage from "./routes/ResultPage";
import ErrorRoute from "./routes/ErrorRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SelectQuiz />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<ErrorRoute />} />
      </Routes>
    </div>
  );
}

export default App;
