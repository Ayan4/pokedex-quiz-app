import React from "react";
import Navbar from "../components/Navbar";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";

function ErrorRoute() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar home={false} />
      <h1 className="text-light font-poppins mb-8 text-gray-700 text-4xl md:mt-40">
        404 Not Found
      </h1>
      <button
        onClick={() => navigate("/")}
        className="flex items-center bg-gray-200 text-gray-800 border py-2 px-3 rounded-lg shadow-boxStrong"
      >
        <BiArrowBack className="text-2xl mr-2 mt-0.5" />
        <p className="text-lg">Back To Quizzes</p>
      </button>
    </div>
  );
}

export default ErrorRoute;
