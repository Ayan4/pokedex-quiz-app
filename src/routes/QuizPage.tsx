import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/quizContext";
import { Question, Option } from "../API/quizTypes";
import { getSingleQuiz } from "../API/quizData";

function QuizPage() {
  const { quizId } = useParams();
  const {
    state: { currentQuiz, questionNo, score },
    dispatch,
    loading,
    setLoading
  } = useQuiz();
  const [clickedAnswerId, setClickedAnswerId] = useState("");
  const [disableClick, setDisableClick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const quiz = await getSingleQuiz(quizId);
        dispatch({ type: "INIT_CURRENT_QUIZ", payload: { quiz } });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    })();
  }, [dispatch, quizId, setLoading]);

  const currentQuestion =
    currentQuiz && (currentQuiz.questions[questionNo] as Question);

  const handleCheckAnswer = id => {
    setClickedAnswerId(id);
    setDisableClick(true);

    dispatch({
      type: "CLICKED_OPTION_ID",
      payload: { clickedOption: id, questionId: currentQuestion?.id }
    });

    const foundAnswer: Option = currentQuestion?.options.find(
      item => item.id === id
    ) as Option;

    if (foundAnswer.isAnswer) {
      dispatch({
        type: "INCREMENT_SCORE",
        payload: { score: currentQuestion?.points }
      });
    } else {
      dispatch({
        type: "DECREMENT_SCORE",
        payload: { score: currentQuestion?.negativePoints }
      });
    }

    setTimeout(() => {
      setClickedAnswerId("");
      setDisableClick(false);
      if (currentQuiz && questionNo + 1 === currentQuiz.questions.length) {
        navigate("/result", { replace: true });
      } else {
        dispatch({ type: "INCREMENT_QUESTION" });
      }
    }, 1000);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      <div>
        <div className="flex p-3 m-5">
          <p className="mr-8">
            Question No : {questionNo + 1}/{currentQuiz?.questions.length}
          </p>

          <p className="mr-8">Score: {score}</p>
        </div>

        <div className="m-8 border p-3 max-w-sm">
          <h3>{currentQuestion && currentQuestion.question}</h3>
        </div>
        <div className="max-w-sm m-8 flex flex-col">
          {currentQuestion &&
            currentQuestion.options.map(item => (
              <button
                disabled={disableClick}
                key={item.id}
                onClick={() => handleCheckAnswer(item.id)}
                className={`p-2 my-2 ${
                  clickedAnswerId && item.isAnswer
                    ? "bg-green-400"
                    : "bg-gray-200"
                } ${clickedAnswerId === item.id &&
                  !item.isAnswer &&
                  "bg-red-400"}`}
              >
                {item.content}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
