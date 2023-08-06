import React from "react";

import { ReactComponent as Cart } from "../Images/Cart.svg";
import { ReactComponent as Bag } from "../Images/Bag.svg";
import Search from "./Search";

const Header = () => {
  return (
    <div className="flex relative w-full h-20 items-center justify-center bg-gray-200 px-5 shadow-sm border">
      <div className="flex items-center space-x-32">
        <a href="/" className="flex items-center space-x-2 ">
          <Cart className="w-12 h-12 fill-orange-500" />
          <p className="text-2xl font-bold font-poppins">Diversio</p>
        </a>

        <div className="flex w-180 border">
          <Search />
        </div>

        <button className="flex items-center justify-center font-semibold  px-5 py-2 rounded-md shadow-lg bg-orange-500 text-white hover:bg-orange-600">
          Login
        </button>

        <div className="relative">
          <Bag className="w-5 h-5 fill-black cursor-pointer" />
          <div className="absolute flex w-5 h-5 items-center justify-center text-xs rounded-full bg-orange-500 -right-3 -top-3 text-white ">
            0
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
