import React from "react";
import pokeLogo from "../assets/poke-logo.png";
import { Link } from "react-router-dom";

type NavbarProps = {
  home: boolean;
};

function Navbar({ home }: NavbarProps) {
  return (
    <nav
      className={`md:absolute z-20 bg-gray-800 text-white border border-gray-800 px-8 flex justify-center py-4 rounded-b-lg top-0 md:left-1/2 transform md:-translate-x-1/2 w-full ${
        home ? "md:w-96" : "w-full"
      }`}
    >
      <Link className="flex items-center justify-center w-96" to="/">
        <img className="w-12 mr-3" src={pokeLogo} alt="logo" />
        <p className="text-4xl font-light">Pokedex Quiz</p>
      </Link>
    </nav>
  );
}

export default Navbar;
