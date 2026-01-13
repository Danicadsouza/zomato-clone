import React from "react";
import logoBlack from "../../assets/zomatoBlack.png";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center justify-between px-20 py-4 border-b bg-white">
      <Link to="/">
        <img src={logoBlack} alt="logo" className="w-32" />
      </Link>

      <div className="flex items-center gap-2 border p-2 rounded-lg shadow-sm w-1/2">
        <CiSearch className="text-gray-400 text-xl" />
        <input 
          type="text"
          value={searchTerm}
          placeholder="Search for restaurant, cuisine or a dish" 
          className="w-full outline-none text-sm"
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="w-32"></div> 
    </div>
  );
};

export default Header;