import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const SecondaryLayout = () => {
  return (
    <main>
      <div className="flex items-center border-b-[1px] border-gray-200 px-20 max-[500px]:hidden">
        
        <NavLink to="delivery">
          {({ isActive }) => (
            <div className={`flex items-center gap-2 py-4 px-6 border-b-2 ${isActive ? 'border-primary' : 'border-transparent'}`}>
              <div className={`rounded-full p-4 ${isActive ? 'bg-[#FCEEC0]' : 'bg-[#F8F8F8]'}`}>
                <img
                  src={isActive 
                    ? "https://b.zmtcdn.com/data/o2_assets/c0bb85d3a6347b2ec070a8db694588261616149578.png" 
                    : "https://b.zmtcdn.com/data/o2_assets/246bbd71fbba420d5996452be3024d351616150055.png"}
                  alt="delivery icon"
                  className="w-8"
                />
              </div>
              <span className={`text-xl font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                Delivery
              </span>
            </div>
          )}
        </NavLink>

      </div>

      <Outlet />
    </main>
  );
};

export default SecondaryLayout;