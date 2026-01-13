import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { cuisines } from "../utils/cuisinesArray";

const FilterModal = ({
  isFilterOpen,
  setIsFilterOpen,
  minRating,
  setMinRating,
  sortOption,
  setSortOption,
  selectedCuisines,
  setSelectedCuisines
}) => {
  const [activeFilterCategory, setActiveFilterCategory] = useState("Sort By");
  const [tempSelectedCuisines, setTempSelectedCuisines] = useState(selectedCuisines);
  const [tempMinRating, setTempMinRating] = useState(minRating);
  const [tempSortOption, setTempSortOption] = useState(sortOption);

  useEffect(() => {
    if (isFilterOpen) {
      setTempSelectedCuisines(selectedCuisines);
      setTempMinRating(minRating);
      setTempSortOption(sortOption);
    }
  }, [isFilterOpen, selectedCuisines, minRating, sortOption]);

  if (!isFilterOpen) return null;

  const handleClearAll = () => {
    // Clear both temp and applied filters and close modal
    setTempMinRating(0);
    setTempSortOption("");
    setTempSelectedCuisines([]);
    setMinRating(0);
    setSortOption("");
    setSelectedCuisines([]);
    setIsFilterOpen(false);
  };

  return (
    <main className="fixed inset-0 bg-black/60 flex justify-center items-center z-[1000] backdrop-blur-sm">
      <div className="bg-white w-[50%] max-[500px]:w-[90%] rounded-xl h-[80%] shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-5 border-b">
          <span className="text-2xl font-semibold">Filters</span>
          <RxCross2
            onClick={() => setIsFilterOpen(false)}
            className="cursor-pointer text-2xl hover:text-red-500 transition-colors"
          />
        </header>

        {/* Content Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <section className="bg-gray-100 w-[35%] border-r">
            <div className="flex flex-col">
              {["Sort By", "Cuisines", "Rating", "Cost"].map((cat) => (
                <div
                  key={cat}
                  onClick={() => setActiveFilterCategory(cat)}
                  className={`p-5 text-lg font-medium cursor-pointer border-l-4 transition-all ${activeFilterCategory === cat
                    ? "bg-white border-red-500 text-red-500"
                    : "border-transparent text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </section>

          {/* Right Content Area */}
          <section className="flex-1 p-6 overflow-y-auto">
            {activeFilterCategory === "Sort By" && (
              <div className="flex flex-col gap-4">
                {[
                  { id: "ratingHigh", label: "Rating: High to Low" },
                  { id: "deliveryTime", label: "Delivery Time" },
                  { id: "costLow", label: "Cost: Low to High" }
                ].map((opt) => (
                  <label key={opt.id} className="flex gap-3 items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="sortBy"
                      checked={tempSortOption === opt.id}
                      onChange={() => setTempSortOption(opt.id)}
                      className="w-5 h-5 accent-red-500"
                    />
                    <span className="group-hover:text-red-500">{opt.label}</span>
                  </label>
                ))}
              </div>
            )}

            {activeFilterCategory === "Cuisines" && (
              <div className="grid grid-cols-2 gap-3">
                {cuisines.map((cuisine) => (
                  <label key={cuisine} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempSelectedCuisines.includes(cuisine)}
                      onChange={() => {
                        const next = tempSelectedCuisines.includes(cuisine)
                          ? tempSelectedCuisines.filter(c => c !== cuisine)
                          : [...tempSelectedCuisines, cuisine];
                        setTempSelectedCuisines(next);
                      }}
                      className="w-4 h-4 accent-red-500"
                    />
                    <span className="text-sm">{cuisine}</span>
                  </label>
                ))}
              </div>
            )}

            {activeFilterCategory === "Rating" && (
              <div className="flex flex-col gap-4">
                {[0, 3, 4].map((num) => (
                  <label key={num} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={tempMinRating === num}
                      onChange={() => setTempMinRating(num)}
                      className="w-5 h-5 accent-red-500"
                    />
                    <span>{num === 0 ? "All Ratings" : `${num}.0+ Ratings`}</span>
                  </label>
                ))}
              </div>
            )}

            {activeFilterCategory === "Cost" && (
              <p className="text-gray-400 italic">Static Version: Cost filtering coming soon!</p>
            )}
          </section>
        </div>

        {/* Footer */}
        <footer className="flex gap-4 justify-end p-5 border-t bg-gray-50">
          <button onClick={handleClearAll} className="px-4 py-2 text-gray-500 font-medium hover:text-black">
            Clear All
          </button>
          <button
            onClick={() => {
              // Commit temp selections to parent and close modal
              setMinRating(tempMinRating);
              setSortOption(tempSortOption);
              setSelectedCuisines(tempSelectedCuisines);
              setIsFilterOpen(false);
            }}
            className="bg-red-500 text-white px-10 py-2 rounded-lg font-bold hover:bg-red-600 shadow-lg shadow-red-200"
          >
            Apply
          </button>
        </footer>
      </div>
    </main>
  );
};

export default FilterModal;