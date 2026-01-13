import React from "react";
// Ensure the path to your Carousel component is correct
import Carousel from "../../../components/DeliveryPage/Carousel";

const FoodCarousel = () => {
  const foodArray = [
    { img: "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png", name: "Pizza" },
    { img: "https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png", name: "Biryani" },
    { img: "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png", name: "Burger" },
    { img: "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png", name: "Thali" },
    { img: "https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png", name: "Cake" },
    { img: "https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png", name: "Chicken" },
    { img: "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png", name: "Rolls" },
    { img: "https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be010ef31678798444.jpeg", name: "North Indian" },
    { img: "https://b.zmtcdn.com/data/dish_images/c953e5ca07150e9a51f8b21102e20f7e1634805157.png", name: "Chole Bhature" },
    { img: "https://b.zmtcdn.com/data/o2_assets/fc641efbb73b10484257f295ef0b9b981634401116.png", name: "Sandwich" },
    { img: "https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png", name: "Dosa" },
    { img: "https://b.zmtcdn.com/data/dish_images/91c554bcbbab049353a8808fc970e3b31615960315.png", name: "Noodles" },
  ];

  return (
    <div className="bg-[#F8F8F8] px-20 max-[500px]:px-7 py-10">
      <h2 className="text-3xl max-[500px]:text-2xl mb-10 font-medium text-gray-800">
        Inspiration for your first order
      </h2>
      
      {/* Desktop Carousel */}
      <Carousel dataArray={foodArray} />

      {/* Mobile/Scroll View with Pop Effect */}
      <div className="hidden max-[500px]:flex items-center overflow-x-auto gap-8 pb-10 pt-5 no-scrollbar">
        {foodArray.map((food, index) => (
          <div key={index} className="flex flex-col items-center gap-4 cursor-pointer group shrink-0">
            <div className="relative rounded-full w-28 h-28 shadow-md transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-3">
              <img
                src={food.img}
                alt={food.name}
                className="rounded-full w-full h-full object-cover transition-transform duration-300 group-hover:scale-125"
              />
            </div>
            <span className="text-base text-center font-medium transition-all duration-300 group-hover:text-red-500 group-hover:font-bold">
              {food.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCarousel;