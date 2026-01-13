import React, { useState, useEffect, useRef } from "react";
import locationSvg from "../assets/location.svg";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { MdGpsFixed } from "react-icons/md";
import { Spinner } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { RiArrowRightSFill } from "react-icons/ri";
import { Link } from "react-router-dom";

// ... STATIC_RESTAURANTS remains the same ...

const SearchBar = () => {
  const [userLocation, setUserLocation] = useState("Mumbai, Maharashtra");
  const [locationModal, setLocationModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurantsMatched, setRestaurantsMatched] = useState([]);
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Logic for handleClickOutside and handleDetectLocation stays same...
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && inputRef.current.contains(event.target)) {
        setIsSearchModal(true);
      } else if (modalRef.current && modalRef.current.contains(event.target)) {
        setTimeout(() => setIsSearchModal(false), 400);
      } else {
        setIsSearchModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDetectLocation = () => {
    setIsLoading(true);
    setTimeout(() => {
        setUserLocation("Detecting Current Location...");
        setTimeout(() => {
            setUserLocation("Powai, Mumbai");
            setIsLoading(false);
            setLocationModal(false);
        }, 1000);
    }, 500);
  };

  const searchTermHandling = (term) => {
    if (!term) {
      setRestaurantsMatched([]);
      return;
    }
    const matched = STATIC_RESTAURANTS.filter((res) => 
      res.name.toLowerCase().includes(term.toLowerCase()) ||
      res.cuisine.some(c => c.toLowerCase().includes(term.toLowerCase()))
    );
    setRestaurantsMatched(matched);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    searchTermHandling(e.target.value);
    setIsSearchModal(true);
  };

  return (
    <div className="flex gap-2 items-center bg-white p-4 rounded-lg text-black w-full relative shadow border border-gray-100">
      {isLoading ? (
        <Spinner size="sm" color="red.400" />
      ) : (
        /* POP EFFECT 1: Location SVG */
        <img 
          src={locationSvg} 
          alt="loc" 
          className="max-[500px]:hidden transition-transform duration-200 hover:scale-125 cursor-pointer" 
        />
      )}
      <input
        type="text"
        placeholder="Detect Location"
        className="outline-none text-sm capitalize text-gray-500 max-[500px]:hidden w-32 cursor-pointer"
        value={userLocation}
        readOnly
        onClick={() => setLocationModal(!locationModal)}
      />
      
      {/* POP EFFECT 2: Arrows */}
      {locationModal ? (
        <TiArrowSortedUp 
          className="cursor-pointer max-[500px]:hidden transition-transform duration-200 hover:scale-150 text-gray-600" 
          onClick={() => setLocationModal(!locationModal)} 
        />
      ) : (
        <TiArrowSortedDown 
          className="cursor-pointer max-[500px]:hidden transition-transform duration-200 hover:scale-150 text-gray-600" 
          onClick={() => setLocationModal(!locationModal)} 
        />
      )}
      
      <div className="text-gray-300 max-[500px]:hidden mx-2">|</div>
      
      {/* POP EFFECT 3: Search Icon */}
      <CiSearch className="text-2xl text-gray-400 transition-transform duration-200 hover:scale-125 hover:text-red-500 cursor-pointer" />
      
      <input
        type="text"
        placeholder="Search for restaurant, cuisine or a dish"
        className="outline-none text-sm flex-grow"
        ref={inputRef}
        value={searchTerm}
        onChange={handleSearchInputChange}
      />

      {/* Location Detection Modal */}
      {locationModal && (
        <div
          onClick={handleDetectLocation}
          className="flex gap-2 bg-white border border-gray-200 shadow-xl p-3 rounded-lg z-50 cursor-pointer absolute top-16 left-0 w-[250px] group"
        >
          {/* POP EFFECT 4: GPS Icon - pops when the parent is hovered */}
          <MdGpsFixed className="text-red-500 text-lg transition-transform duration-200 group-hover:scale-125" />
          <div className="flex flex-col">
            <p className="text-red-500 text-sm font-medium">Detect current location</p>
            <p className="text-gray-400 text-xs">Using GPS</p>
          </div>
        </div>
      )}

      {/* Search Results Modal stays same... */}
      {/* ... */}
    </div>
  );
};

export default SearchBar;