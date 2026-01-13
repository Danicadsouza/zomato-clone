import React from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const RestaurantCard = ({ data }) => {
  const {
    _id = "1",
    imageUrl = "",
    discountText = "",
    name = "Restaurant",
    rating = "0.0",
    cuisine = [],
    cost = "0",
    deliveryTime = "0",
    safeDelivery = false,
  } = data || {};

  return (
    <Link
      to={`/explore/${_id}`}
      /* POP EFFECT 1: Card Lift & Shadow */
      className="group block p-3 w-full cursor-pointer rounded-2xl border border-transparent bg-white transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl hover:border-gray-100"
    >
      <div className="relative w-full h-64 overflow-hidden rounded-2xl">
        {/* POP EFFECT 2: Image Zoom inside the container */}
        <img
          src={imageUrl}
          alt={name}
          className="rounded-2xl w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {discountText && (
          <span className="absolute bottom-5 left-0 bg-[#256FEF] text-white px-2 py-1 text-xs font-bold z-10 shadow-md">
            {discountText}
          </span>
        )}
      </div>

      <section className="flex items-center justify-between mt-3">
        <span className="text-lg font-semibold truncate w-[70%] text-gray-800">
          {name.length > 20 ? name.substring(0, 20) + "..." : name}
        </span>
        
        {/* POP EFFECT 3: Rating badge color shift */}
        <div className="flex gap-1 items-center text-white bg-green-700 rounded-md px-1.5 py-0.5 transition-colors duration-300 group-hover:bg-green-600">
          <span className="text-xs font-bold">{rating}</span>
          <FaStar className="text-[8px] group-hover:animate-pulse" />
        </div>
      </section>

      <section className="flex items-center font-light justify-between text-gray-500 text-sm mt-1">
        <div className="truncate w-[60%]">
          {cuisine.join(", ").length > 25 
            ? cuisine.join(", ").substring(0, 25) + "..." 
            : cuisine.join(", ")}
        </div>
        <span className="font-normal">₹{cost} for one</span>
      </section>

      <p className="flex justify-end py-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
        {deliveryTime} min
      </p>

      {safeDelivery && (
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100 text-[10px] text-gray-400 mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <img
            src="https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png"
            alt="safe"
            className="w-10"
          />
          <p className="leading-tight">Follows all Max Safety measures</p>
        </div>
      )}
    </Link>
  );
};

export default RestaurantCard;