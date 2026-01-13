import React, { useState, useMemo } from "react";
import Filter from "./FilterPart/Filter";
import FoodCarousel from "./FoodCarousel/FoodCarousel";
import BrandCarousel from "./BrandCarousel/BrandCarousel";
import DeliveryData from "./DeliveryData/DeliveryData";
import FilterModal from "../../modals/FilterModal";
import { useOutletContext } from "react-router-dom";

// 1. DATA IS DEFINED HERE TO PREVENT "UNDEFINED" ERRORS
const RESTAURANT_LIST = [
  {
    _id: "1",
    name: "Pizza Heaven",
    rating: "4.2",
    cuisine: ["Pizza", "Italian"],
    cost: "600",
    imageUrl:
      "https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "50% OFF",
    deliveryTime: "30",
    safeDelivery: true,
  },
  {
    _id: "2",
    name: "The Waffle Co.",
    rating: "4.5",
    cuisine: ["Waffles", "Desserts"],
    cost: "300",
    imageUrl:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "20% OFF",
    deliveryTime: "20",
    safeDelivery: true,
  },
  {
    _id: "3",
    name: "Burger King",
    rating: "3.9",
    cuisine: ["Burgers", "American"],
    cost: "450",
    imageUrl:
      "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "BUY 1 GET 1",
    deliveryTime: "25",
    safeDelivery: false,
  },
  {
    _id: "4",
    name: "Biryani Junction",
    rating: "4.3",
    cuisine: ["North Indian", "Biryani"],
    cost: "550",
    imageUrl:
      "https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "10% OFF",
    deliveryTime: "35",
    safeDelivery: true,
  },
  {
    _id: "5",
    name: "Leon's Grill",
    rating: "4.4",
    cuisine: ["Roasted Chicken", "Burgers"],
    cost: "400",
    imageUrl:
      "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "FREE DELIVERY",
    deliveryTime: "15",
    safeDelivery: true,
  },
  {
    _id: "6",
    name: "Healthy Bowls",
    rating: "3.6",
    cuisine: ["Salads", "Healthy Food"],
    cost: "800",
    imageUrl:
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "15% OFF",
    deliveryTime: "10",
    safeDelivery: true,
  },
  {
    _id: "7",
    name: "Sushi Zen",
    rating: "4.8",
    cuisine: ["Japanese", "Sushi"],
    cost: "1200",
    imageUrl:
      "https://images.pexels.com/photos/1148086/pexels-photo-1148086.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "10% OFF",
    deliveryTime: "45",
    safeDelivery: true,
  },
  {
    _id: "8",
    name: "China Garden",
    rating: "3.0",
    cuisine: ["Chinese", "Noodles"],
    cost: "500",
    imageUrl:
      "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "25% OFF",
    deliveryTime: "25",
    safeDelivery: true,
  },
  {
    _id: "9",
    name: "The Pasta House",
    rating: "4.3",
    cuisine: ["Italian", "Pasta"],
    cost: "700",
    imageUrl:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "FREE COKE",
    deliveryTime: "30",
    safeDelivery: true,
  },
  {
    _id: "10",
    name: "Dessert Heaven",
    rating: "4.7",
    cuisine: ["Cakes", "Pastries"],
    cost: "400",
    imageUrl:
      "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "BUY 2 GET 1",
    deliveryTime: "15",
    safeDelivery: true,
  },
  {
    _id: "11",
    name: "South Spice",
    rating: "3.4",
    cuisine: ["South Indian", "Dosa"],
    cost: "250",
    imageUrl:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
    discountText: "FREE DELIVERY",
    deliveryTime: "20",
    safeDelivery: true,
  },
  {
    _id: "12",
    name: "Steak House",
    rating: "4.5",
    cuisine: ["Continental", "Steaks"],
    cost: "1500",
    imageUrl:
      "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=800",
    discountText: "20% OFF",
    deliveryTime: "40",
    safeDelivery: true,
  },
];

const DeliveryPage = () => {
  // Read search state and setter from the outlet context so the Header search input controls this page
  const outlet = useOutletContext();
  const searchTerm = outlet?.searchTerm ?? "";
  const setSearchTerm = outlet?.setSearchTerm ?? (() => { });

  const [minRating, setMinRating] = useState(0);
  const [sortOption, setSortOption] = useState("");
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredRestaurants = useMemo(() => {
    console.log("Filtering with:", {
      searchTerm,
      minRating,
      sortOption,
      selectedCuisines,
    });

    // 1. Start with a fresh copy of the full list
    let result = [...RESTAURANT_LIST];

    // 2. Filter by Search
    if (searchTerm) {
      result = result.filter((res) =>
        res.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Filter by Rating
    if (minRating > 0) {
      result = result.filter((res) => parseFloat(res.rating) >= minRating);
    }

    // 4. Filter by Cuisines
    if (selectedCuisines.length > 0) {
      result = result.filter((res) =>
        res.cuisine.some((c) => selectedCuisines.includes(c))
      );
    }

    // 5. SORTING (The crucial part)
    if (sortOption === "ratingHigh") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortOption === "costLow") {
      result.sort((a, b) => Number(a.cost) - Number(b.cost));
    } else if (sortOption === "deliveryTime") {
      result.sort((a, b) => Number(a.deliveryTime) - Number(b.deliveryTime));
    }

    console.log("Resulting list count:", result.length);
    return result;
  }, [searchTerm, minRating, sortOption, selectedCuisines]);

  return (
    <div className="pb-20">
      <Filter
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        setMinRating={setMinRating}
        minRating={minRating}
      />

      {searchTerm === "" && <FoodCarousel />}
      {searchTerm === "" && <BrandCarousel />}

      {filteredRestaurants.length > 0 ? (
        <DeliveryData restaurants={filteredRestaurants} />
      ) : (
        <div className="flex flex-col items-center justify-center p-20">
          <img
            src="https://b.zmtcdn.com/web_assets/401908bc03930438ec66f28c11648a7b1585061685.png"
            width="250"
            alt="No results"
          />
          <h3 className="mt-5 text-xl font-light text-gray-500">
            No results found
          </h3>
        </div>
      )}

      {/* PASS EVERYTHING TO THE MODAL */}
      {isFilterOpen && (
        <FilterModal
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
          minRating={minRating}
          setMinRating={setMinRating}
          sortOption={sortOption}
          setSortOption={setSortOption}
          selectedCuisines={selectedCuisines}
          setSelectedCuisines={setSelectedCuisines}
        />
      )}
    </div>
  );
};

export default DeliveryPage;