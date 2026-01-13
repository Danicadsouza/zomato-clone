import React from "react";
import RestaurantCard from "../../../components/DeliveryPage/RestaurantCard";

// 1. Remove all Redux and Thunk imports
// 2. Accept 'restaurants' as a prop from DeliveryPage.jsx
const DeliveryData = ({ restaurants }) => {
  
  // 3. Simple logic for the list or the empty state
  const deliveryRestaurantsJsx =
    restaurants.length > 0 ? (
      restaurants.map((res) => (
        <RestaurantCard
          key={res._id || res.id} 
          data={res} // Passing the static object to the card
        />
      ))
    ) : (
      // 4. Requirement: Professional Empty State
      <div className="flex flex-col items-center py-10 w-full">
        <img 
          src="https://b.zmtcdn.com/web_assets/401908bc03930438ec66f28c11648a7b1585061685.png" 
          alt="no-results" 
          className="w-48 mb-4"
        />
        <p className="text-xl font-medium text-gray-600">No restaurants found.</p>
        <p className="text-gray-400 text-sm">Try searching for something else!</p>
      </div>
    );

  return (
    <div className="px-20 max-[500px]:px-7 py-8">
      <h2 className="text-3xl max-[500px]:text-2xl mb-8 font-semibold">
        Delivery Restaurants in Your Area
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
        {/* No more isLoading check needed because data is static/instant */}
        {deliveryRestaurantsJsx}
      </div>
    </div>
  );
};

export default DeliveryData;