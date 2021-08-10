import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QuizProvider } from "./context/quizContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <QuizProvider>
      <Router>
        <App />
      </Router>
    </QuizProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
