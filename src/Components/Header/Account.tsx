import React, { useContext, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import { ReactComponent as User } from "../../Assets/Images/User.svg";
import { AuthContext } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../Constants/RoutePoints/commonEndpoints";
import { ORDERS } from "../../Constants/RoutePoints/Orders";

enum MENU_TYPE {
  USER_PROFILE,
  ORDERS,
  LOGOUT,
}

const menu = [
  { name: "Your Profile", icon: "User.svg", type: MENU_TYPE.USER_PROFILE },
  { name: "Your Orders", icon: "Order.svg", type: MENU_TYPE.ORDERS },
  { name: "Logout", icon: "Logout.svg", type: MENU_TYPE.LOGOUT },
];

const Account = () => {
  const [showMenu, setShowMenu] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const onClickMenuHandler = (type: MENU_TYPE) => {
    setShowMenu(false);

    switch (type) {
      case MENU_TYPE.ORDERS:
        navigate(ORDERS);
        break;
      case MENU_TYPE.LOGOUT:
        authCtx.logoutHandler();
        navigate(LOGIN);
        break;
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="flex space-x-2 px-5 py-2 border  bg-white hover:bg-gray-100 items-center"
      >
        <User />
        <span>Account</span>
      </button>

      {showMenu && (
        <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
          <div className="absolute flex flex-col py-5  w-44 bg-white  shadow-lg border rounded-lg ">
            {menu.map((menuDetails) => (
              <button
                disabled={menuDetails.type === MENU_TYPE.USER_PROFILE}
                key={menuDetails.name}
                onClick={() => onClickMenuHandler(menuDetails.type)}
                className="flex space-x-3 items-center text-left hover:bg-gray-100 py-2 px-5 disabled:opacity-60 disabled:hover:bg-white"
              >
                <img
                  src={require(`../../Assets/Images/${menuDetails.icon}`)}
                  alt={menuDetails.name}
                />
                <span>{menuDetails.name}</span>
              </button>
            ))}
          </div>
        </OutsideClickHandler>
      )}
    </div>
  );
};

export default Account;
