import React from "react";
import { useQuiz } from "../context/quizContext";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { GiStarsStack } from "react-icons/gi";

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
    <div className="max-w-3xl font-poppins m-auto mb-8 md:mt-24">
      <Navbar home={false} />

      <div className="px-5 flex flex-col items-center">
        {currentQuiz && (
          <img className="w-40" src={currentQuiz.coverImageUrl} alt="" />
        )}
        <div className="flex flex-col items-center">
          <GiStarsStack className="text-7xl text-yellow-500" />
          <h2 className="text-center mt-3 text-lg font-medium text-gray-800">
            {score}/25 Points
          </h2>
        </div>

        <div className="flex mt-8">
          {currentQuiz && (
            <button
              className="px-4 py-1.5 text-white bg-gray-300 rounded-lg mr-4 bg-yellow-500 border-4 border-yellow-300 transition-all hover:opacity-90"
              onClick={handleReset}
            >
              Reset
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="px-4 py-1.5 text-white bg-gray-300 rounded-lg mr-4 bg-blue-500 border-4 border-blue-300 transition-all hover:opacity-90"
          >
            Play Another Quiz
          </button>
        </div>
      </div>

      {currentQuiz &&
        currentQuiz.questions.map((item, index) => (
          <div className="w-full px-5" key={item.id}>
            <div className="mt-12 mb-8">
              <h3 className="text-xl text-gray-800">
                <span className="text-yellow-500 font-medium text-2xl mr-0.5">
                  {index + 1}.
                </span>{" "}
                {item.question}
              </h3>
            </div>
            <div className="flex flex-col">
              {item.options.map(option => (
                <p
                  className={`py-7 px-4 rounded-xl transition-all text-center shadow-boxStrong border text-xl my-2.5 ${option.isAnswer &&
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
