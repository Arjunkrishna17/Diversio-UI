import React, { useState } from "react";

import Address from "./Address/Address";
import Payment from "./Payment/Payment";
import { ReactComponent as Tick } from "../../Images/Tick.svg";

const enum MENU_TYPE {
  ADDRESS,
  PAYMENT,
}

const Checkout = () => {
  const [orderId, setOrderId] = useState("");
  const [showMenu, setShowMenu] = useState<MENU_TYPE>(MENU_TYPE.ADDRESS);

  const addressCallback = (id: string) => {
    setOrderId(id);
    setShowMenu(MENU_TYPE.PAYMENT);
  };

  const paymentMenuHandler = () => {
    if (orderId) setShowMenu(MENU_TYPE.PAYMENT);
  };

  return (
    <div className="flex justify-center items-center  py-5 w-full h-full">
      <div className="flex flex-col w-[44rem]  h-full bg-white border">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center h-16 border-b w-full ">
            <button
              onClick={() => setShowMenu(MENU_TYPE.ADDRESS)}
              className="px-5 font-bold "
            >
              Your Address
            </button>

            {showMenu !== MENU_TYPE.ADDRESS && (
              <Tick className="w-5 h-5 fill-green-600" />
            )}
          </div>
          {showMenu === MENU_TYPE.ADDRESS && (
            <Address callback={addressCallback} />
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center h-16 border-y w-full">
            <button onClick={paymentMenuHandler} className="px-5 font-bold ">
              Payment
            </button>
          </div>
          {showMenu === MENU_TYPE.PAYMENT && <Payment orderId={orderId} />}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
