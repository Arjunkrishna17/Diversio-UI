import React, { useEffect, useState } from "react";

import Address from "./Address/Address";
import Payment from "./Payment/Payment";
import { ReactComponent as Tick } from "../../Images/Tick.svg";
import TotalAmount from "../Cart/TotalAmount";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CART_ROUTE, HOME } from "../../Config/RoutePoints/ProductRoutes";
import useFetchNew from "../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../Config/Constants";
import { GET_PAYMENT_INTENT, ORDER_API } from "../../Config/Apis/Orders";
import { orderProductsType } from "../Constants/Types";
import Skeleton from "react-loading-skeleton";
import { CS } from "../../Config/LocStorage";
import Button from "../Packages/Button";
import TestCard from "./Payment/TestCard";

const enum MENU_TYPE {
  ADDRESS,
  PAYMENT,
}

interface orderDetails {
  products: orderProductsType[];
}

const Checkout = () => {
  const [showMenu, setShowMenu] = useState<MENU_TYPE>(MENU_TYPE.ADDRESS);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<orderDetails>();
  const [addressSelected, setAddressSelected] = useState(false);

  const [urlParam] = useSearchParams();
  const navigate = useNavigate();
  const { httpRequest } = useFetchNew();

  const orderId = urlParam.get("orderId");

  const clientSecret = localStorage.getItem(CS)
    ? JSON.parse(localStorage.getItem(CS) as string)
    : undefined;

  if (!orderId) {
    navigate(HOME, { replace: true });
  }

  useEffect(() => {
    const getOrder = async () => {
      const requestConfig = { endPoint: ORDER_API + "?orderId=" + orderId };

      const response = await httpRequest(requestConfig);
      if (response.success) {
        setOrder(response.data);
      } else if (response.error) {
        setError(response.error);
        localStorage.removeItem(CS);
      } else {
        setError(ERROR_MSG);
        localStorage.removeItem(CS);
      }
      setIsLoading(false);
    };

    if (orderId) {
      getOrder();
    }
  }, [httpRequest, orderId]);

  useEffect(() => {
    const getClient = async () => {
      const requestConfig = {
        endPoint: GET_PAYMENT_INTENT + "?orderId=" + orderId,
      };

      const response = await httpRequest(requestConfig);

      if (response.success) {
        localStorage.setItem(
          CS,
          JSON.stringify({ ...response.data, orderId: orderId })
        );
      } else if (response.error) {
        setError(response.error);
      } else {
        setError(ERROR_MSG);
      }
    };

    if (orderId && !clientSecret) {
      getClient();
    }
  }, [httpRequest, orderId, clientSecret]);

  const addressCallback = () => {
    setShowMenu(MENU_TYPE.PAYMENT);
    setAddressSelected(true);
  };

  const paymentMenuHandler = () => {
    if (addressSelected) setShowMenu(MENU_TYPE.PAYMENT);
  };

  const showAddressHandler = () => {
    //Ensure payment menu cannot be open until new address is selected
    setShowMenu(MENU_TYPE.ADDRESS);
    setAddressSelected(false);
  };

  console.log(order);

  let body;

  if (isLoading) {
    body = (
      <div className="flex w-full h-full justify-center px-28 space-x-5">
        <Skeleton className="h-full" containerClassName="w-full" />
        <Skeleton
          className="h-64 w-full"
          containerClassName="w-full w-[22rem]"
        />
      </div>
    );
  } else if (error) {
    body = (
      <div className="flex flex-col space-y-5 w-full h-full items-center justify-center ">
        <div className="flex flex-col w-80 h-44 bg-white justify-center items-center border shadow-sm">
          <p className="text-red-500 text-xs  px-5 py-5">{error}</p>

          <Button
            text="Go back to Cart"
            type="primary"
            callback={() => navigate(CART_ROUTE, { replace: true })}
          />
        </div>
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col px-10 lg:px-24 space-y-1 lg:flex-row lg:space-x-5 lg:space-y-0 w-full h-full">
        <div className="flex flex-col w-full h-fit mt-9  bg-white border">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center h-16 border-b w-full ">
              <button onClick={showAddressHandler} className="px-5 font-bold ">
                Your Address
              </button>

              {addressSelected && <Tick className="w-5 h-5 fill-green-600" />}
            </div>
            {showMenu === MENU_TYPE.ADDRESS && (
              <Address callback={addressCallback} orderId={orderId as string} />
            )}

            {error && <p className="text-xs text-red-500 px-5">{error}</p>}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center h-16 border-y w-full">
              <button
                onClick={paymentMenuHandler}
                className={
                  "px-5 font-bold " +
                  (addressSelected ? " cursor-pointer" : " cursor-default")
                }
              >
                Payment
              </button>
            </div>
            {showMenu === MENU_TYPE.PAYMENT && clientSecret && (
              <Payment clientSecret={clientSecret} />
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-5 ">
          {order?.products && order.products.length && (
            <TotalAmount products={order.products} placeOrder={false} />
          )}
          <TestCard />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-24 lg:pb-0 w-full h-full">
      {body}
      <div className="fixed bottom-0 min-h-[3rem]  w-full bg-red-400 text-white text-sm flex items-center justify-center">
        <span>
          Attention: This is a demo e-commerce application. Please do not use
          your real payment information. Use test card details provided for
          testing.
        </span>
      </div>
    </div>
  );
};

export default Checkout;
