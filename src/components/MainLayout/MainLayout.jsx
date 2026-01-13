import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header"; // Adjust path as needed

const MainLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="main-layout">
      {/* 1. Pass search state to Header */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* 2. Pass search state and setter to all pages via Context */}
      <main>
        <Outlet context={{ searchTerm, setSearchTerm }} />
      </main>
    </div>
  );
};

export default MainLayout;