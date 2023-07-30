import React from "react";

import { ReactComponent as Cart } from "../Images/Cart.svg";
import Search from "./Search";

const Header = () => {
  return (
    <div className="flex relative w-full h-20 items-center justify-center bg-gray-200 px-5 shadow-sm border">
      <div className="flex absolute items-center space-x-2 left-5 top-3 ">
        <Cart className="w-12 h-12 fill-orange-500" />
        <p className="text-2xl font-bold font-poppins">Diversio</p>
      </div>

      <div className="flex w-180 ">
        <Search />
      </div>

      <div className="flex "></div>
    </div>
  );
};

export default Header;
