import React from "react";
import appLogo from "../assets/appLogo.svg";
import { Link } from "react-router-dom";

const SecondaryHeader = () => {
  // We removed all Redux, Thunks, and Auth states
  
  return (
    <div className="flex justify-between px-12 py-6 w-full max-[500px]:px-4 max-[500px]:py-4 border-b border-gray-100">
      {/* 1. App Logo Section */}
      <div className="flex gap-2 items-center cursor-pointer">
        <Link to="/" className="flex items-center gap-2">
           <img src={appLogo} alt="app logo" />
           <p className="text-sm font-medium">App Coming soon</p>
        </Link>
      </div>

      
      <div className="flex items-center gap-6 text-lg max-[500px]:text-sm text-gray-500">
        {/* Optional: You can put a static 'Help' or 'Contact' link here if needed */}
        <span className="cursor-default hover:text-primary transition-colors">
          Delivery Task
        </span>
      </div>
    </div>
  );
};

export default SecondaryHeader;