import React from "react";
import { useQuiz } from "../context/quizContext";
import { useNavigate } from "react-router";

function ResultPage() {
  const {
    state: { currentQuiz, score },
    dispatch
  } = useQuiz();
  const navigate = useNavigate();

  const handleReset = () => {
    navigate(`/quiz/${currentQuiz?.id}`);
    dispatch({ type: "RESET" });
  };

  return (
    <div className="py-5 px-8">
      <h1>result</h1>
      <h2>Score: {score}</h2>
      <h3>Quiz : {currentQuiz?.name}</h3>

      <button className="px-4 py-1 bg-gray-300" onClick={handleReset}>
        Reset
      </button>

      {currentQuiz &&
        currentQuiz.questions.map(item => (
          <div key={item.id}>
            <div className="m-8 border p-3 max-w-sm">
              <h3>{item.question}</h3>
            </div>
            <div className="max-w-sm m-8 flex flex-col">
              {item.options.map(option => (
                <p
                  className={`p-2 my-2 bg-gray-200 ${option.isAnswer &&
                    "bg-green-400"} ${!option.isAnswer &&
                    option.id === item.clickedOption &&
                    "bg-red-400"}`}
                  key={option.id}
                >
                  {option.content}
                </p>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ResultPage;
