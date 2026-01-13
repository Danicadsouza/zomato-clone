import React from "react";
import filterSvg from "../../../assets/filter.svg";
// Remove Redux imports - we are using props now

const Filter = ({ setIsFilterOpen, setMinRating, minRating }) => {
  return (
    <div className="flex gap-4 px-20 py-4 items-center">
      {/* 1. Main Filter Button */}
      <button 
        onClick={() => setIsFilterOpen(true)}
        className="border p-2 rounded-lg flex gap-2 items-center"
      >
        Filters
      </button>

      {/* 2. Rating 4.0+ Button */}
      <button 
        onClick={() => {
          // Toggle logic: If already 4, reset to 0. If not, set to 4.
          const newValue = minRating === 4 ? 0 : 4;
          setMinRating(newValue);
        }}
        className={`border p-2 rounded-lg transition-colors ${
          minRating === 4 ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-500"
        }`}
      >
        Rating: 4.0+
      </button>

      {/* 3. Clear Filter (Optional but helpful) */}
      {minRating > 0 && (
        <button onClick={() => setMinRating(0)} className="text-red-500 text-sm font-bold">
          Clear All
        </button>
      )}
    </div>
  );
};
export default Filter;