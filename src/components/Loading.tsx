import React from "react";
import pokeLogo from "../assets/poke-logo.png";

function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-bounce">
        <img className="w-16 animate-spin" src={pokeLogo} alt="loading" />
      </div>
      <div className="px-12 filter blur-sm opacity-70 pt-0.5 bg-black"></div>
    </div>
  );
}

export default Loading;
