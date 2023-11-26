import React, { useContext } from "react";

import { ReactComponent as Cart } from "../../Assets/Images/Cart.svg";

import Search from "./Search";
import Button from "../Common/Button";
import ShoppingCart from "./ShoppingCart";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CREATE_ACCOUNT,
  LOGIN,
} from "../../Constants/RoutePoints/commonEndpoints";
import { AuthContext } from "../../Context/Auth";
import Account from "./Account";

const Header = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  const hide =
    location.pathname === CREATE_ACCOUNT || location.pathname === LOGIN;

  const buttonHandler = () => {
    navigate(LOGIN);
  };

  return (
    <div className="flex flex-col shrink-0 sticky top-0 z-30 w-full space-y-2 py-3  px-8 bg-gray-200  shadow-sm border">
      <div className="flex items-center justify-between w-full space-x-5">
        <a href="/" className="flex items-center space-x-2 ">
          <Cart className="w-8 h-8 md:w-12 md:h-12 fill-orange-500" />
          <p className="text-lg md:text-xl font-bold font-poppins">Diversio</p>
        </a>

        {!hide && (
          <>
            <div className=" hidden md:flex w-full border justify-center">
              <Search />
            </div>

            <div className="flex space-x-8 items-center">
              <div>
                {!authCtx.loggedIn ? (
                  <Button
                    text={"Login"}
                    type="primary"
                    callback={() => {
                      buttonHandler();
                    }}
                  />
                ) : (
                  <Account />
                )}
              </div>

              <ShoppingCart />
            </div>
          </>
        )}
      </div>

      {!hide && (
        <div className="flex md:hidden w-full border justify-center ">
          <Search />
        </div>
      )}
    </div>
  );
};

export default Header;
