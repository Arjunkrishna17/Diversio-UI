import React from "react";

import { ReactComponent as Cart } from "../../Images/Cart.svg";

import Search from "./Search";
import Button from "../Packages/Button";
import ShoppingCart from "./ShoppingCart";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../Config/commonEndpoints";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col shrink-0 sticky top-0 z-30 w-full space-y-2 py-3  px-8 bg-gray-200  shadow-sm border">
      <div className="flex items-center justify-between w-full space-x-5">
        <a href="/" className="flex items-center space-x-2 ">
          <Cart className="w-8 h-8 md:w-12 md:h-12 fill-orange-500" />
          <p className="text-lg md:text-xl font-bold font-poppins">Diversio</p>
        </a>

        <div className="hidden md:flex w-full border justify-center">
          <Search />
        </div>

        <div className="flex space-x-5 items-center">
          <Button
            text="Login"
            type="primary"
            callback={() => navigate(LOGIN)}
          />

          <ShoppingCart />
        </div>
      </div>

      <div className="flex md:hidden w-full border justify-center ">
        <Search />
      </div>
    </div>
  );
};

export default Header;
