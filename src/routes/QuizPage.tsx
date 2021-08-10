import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/quizContext";
import { Question, Option } from "../API/quizTypes";
import { getSingleQuiz } from "../API/quizData";
import Navbar from "../components/Navbar";
import { BiCrown } from "react-icons/bi";
import { AiFillStar } from "react-icons/ai";
import Loading from "../components/Loading";

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

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl font-poppins m-auto md:mt-28">
      <Navbar home={false} />
      <div className="flex justify-between items-center px-5 my-6">
        <div className="flex items-center px-2 py-0.5 rounded-xl shadow-box">
          {currentQuiz?.questions.map((item, index) => (
            <div
              key={item.id}
              className={`w-7 h-1.5 mx-0.5 bg-gray-200 rounded-full ${index ===
                questionNo && "bg-yellow-400"} ${item.clickedOption &&
                "bg-yellow-400"}`}
            ></div>
          ))}
          <div className="flex items-center ml-2 text-lg">
            <BiCrown className="text-yellow-500 mr-1.5" />
            <p className="text-base font-medium text-gray-700">
              {questionNo + 1}
              <span className="text-sm font-light">/</span>
              {currentQuiz?.questions.length}
            </p>
          </div>
        </div>
        <div className="flex items-center border px-1.5 py-0.5 rounded-xl shadow-box">
          <AiFillStar className="text-lg text-yellow-500 mr-1" />
          <p>{score}</p>
        </div>
      </div>

      <p className="text-2xl mt-14 mb-8 text-gray-700 px-5">
        {currentQuestion && currentQuestion.question}
      </p>

      <div className="px-5 flex flex-col text-gray-600">
        {currentQuestion &&
          currentQuestion.options.map(item => (
            <button
              disabled={disableClick}
              key={item.id}
              onClick={() => handleCheckAnswer(item.id)}
              className={`py-7 px-4 rounded-xl transition-all shadow-boxStrong border text-xl my-2.5 ${
                clickedAnswerId && item.isAnswer
                  ? "bg-green-400 text-gray-800"
                  : "bg-white"
              } ${clickedAnswerId === item.id &&
                !item.isAnswer &&
                "bg-red-400 text-gray-800"}`}
            >
              {item.content}
            </button>
          ))}
      </div>
    </div>
  );
}

export default QuizPage;
