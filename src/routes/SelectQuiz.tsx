import React, { useEffect } from "react";
import { useQuiz } from "../context/quizContext";
import { Link } from "react-router-dom";

function SelectQuiz() {
  const { state, loading, dispatch } = useQuiz();

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  if (loading) return <h1>Loading....</h1>;

  return (
    <div className="flex h-screen items-center relative">
      <div className="absolute border border-red-500 w-20 top-0 right-1/2">
        <img
          src="https://i.pinimg.com/originals/b7/71/f7/b771f703146b090f240660dfc13002ba.jpg"
          alt=""
        />
        PokeDrago Quiz
      </div>
      <div className="p-8 bg-red-500 h-full"></div>
      {state.quizzes &&
        state.quizzes.map(item => (
          <Link
            key={item.id}
            className="w-1/2 border h-full flex items-center transition-all hover:bg-red-200"
            to={`/quiz/${item.id}`}
          >
            <div className="p-8 m-5 h-full flex items-center">
              <img src={item.coverImageUrl} alt="thumbnail" />
            </div>
          </Link>
        ))}
      <div className="p-8 bg-yellow-500 h-full"></div>
    </div>
  );
}

export default SelectQuiz;
