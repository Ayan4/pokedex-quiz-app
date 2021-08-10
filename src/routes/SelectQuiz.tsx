import React, { useEffect } from "react";
import { useQuiz } from "../context/quizContext";
import { Link } from "react-router-dom";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

function SelectQuiz() {
  const { state, loading, dispatch } = useQuiz();

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className="flex flex-col h-screen items-center font-poppins relative md:flex-row">
      <Navbar home />
      <div className="p-8 hidden md:block bg-red-600 h-full"></div>
      {state.quizzes &&
        state.quizzes.map(item => (
          <Link
            key={item.id}
            className="w-full md:w-1/2 border h-full group flex flex-col items-center relative transition-all md:hover:bg-red-200"
            to={`/quiz/${item.id}`}
          >
            <div className="p-8 m-5 h-full flex items-center">
              <img src={item.coverImageUrl} alt="thumbnail" />
            </div>
            <div className="flex flex-col justify-center rounded-lg px-5 py-2 text-gray-600 mb-28 absolute -bottom-24 z-20 md:bottom-0 md:hidden group-hover:block">
              <p className="w-full text-2xl">Start Quiz</p>
              <HiOutlineChevronDoubleDown className="text-2xl text-yellow-600 w-full mt-2 animate-bounce" />
            </div>
          </Link>
        ))}
      <div className="p-8 bg-yellow-500 hidden md:block h-full"></div>
    </div>
  );
}

export default SelectQuiz;
