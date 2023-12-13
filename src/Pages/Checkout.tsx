import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Address from "../Components/Checkout/Address/Address";
import Payment from "../Components/Checkout/Payment/Payment";
import { ReactComponent as Tick } from "../Assets/Images/Tick.svg";
import TotalAmount from "../Components/Cart/TotalAmount";
import { CART_ROUTE, HOME } from "../Constants/RoutePoints/ProductRoutes";
import useFetchNew from "../Hooks/useFetchNew";
import { ERROR_MSG } from "../Constants/Constants";
import { GET_PAYMENT_INTENT, ORDER_API } from "../Constants/Apis/Orders";
import Skeleton from "react-loading-skeleton";
import { CS } from "../Config/LocStorage";
import Button from "../Components/Common/Button";
import TestCard from "../Components/Checkout/Payment/TestCard";
import { orderDetails, placeOrderDetails } from "../Types/Order";

const enum MENU_TYPE {
  ADDRESS,
  PAYMENT,
}

const Checkout = () => {
  const [showMenu, setShowMenu] = useState<MENU_TYPE>(MENU_TYPE.ADDRESS);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState<orderDetails[]>([]);
  const [addressSelected, setAddressSelected] = useState(false);

  const [urlParam] = useSearchParams();
  const navigate = useNavigate();
  const { httpRequest } = useFetchNew();

  const cartId = urlParam.get("id");

  const clientSecret = localStorage.getItem(CS)
    ? JSON.parse(localStorage.getItem(CS) as string)
    : undefined;

  if (!cartId) {
    navigate(HOME, { replace: true });
  }

  useEffect(() => {
    const getOrder = async () => {
      const requestConfig = { endPoint: ORDER_API + "?cartId=" + cartId };

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

    if (cartId) {
      getOrder();
    }
  }, [httpRequest, cartId]);

  useEffect(() => {
    //Remove old client secret
    localStorage.removeItem(CS);

    const getClient = async () => {
      const requestConfig = {
        endPoint: GET_PAYMENT_INTENT + "?cartId=" + cartId,
      };

      const response = await httpRequest(requestConfig);

      if (response.success) {
        localStorage.setItem(
          CS,
          JSON.stringify({ ...response.data, orderId: cartId })
        );
      } else if (response.error) {
        setError(response.error);
      } else {
        setError(ERROR_MSG);
      }
    };

    if (cartId && !clientSecret) {
      getClient();
    }
  }, [httpRequest, cartId, clientSecret]);

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

  let body = <div></div>;

  let productIds: placeOrderDetails[] = [];

  if (order.length) {
    productIds = order.map((order) => {
      return { productId: order.product._id, quantity: order.quantity };
    });
  }

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
              <Address callback={addressCallback} cartId={cartId as string} />
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
              <Payment clientSecret={clientSecret} cartId={cartId as string} />
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-5 ">
          {productIds.length && (
            <TotalAmount products={productIds} placeOrder={false} />
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
