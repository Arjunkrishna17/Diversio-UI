import React, { useState, useEffect, useCallback } from "react";

import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import useFetchNew from "../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../Constants/Constants";
import Skeleton from "react-loading-skeleton";
import { CHECKOUT } from "../../Constants/RoutePoints/ProductRoutes";
import { GET_TOTAL_PAYMENT, ORDER_API } from "../../Constants/Apis/Orders";
import { placeOrderDetails } from "../../Types/Order";

interface totalAmountDetails {
  totalAmount: number;
  totalItems: number;
}

interface props {
  products: placeOrderDetails[];

  placeOrder?: boolean;
}

const TotalAmount = ({ products, placeOrder = true }: props) => {
  const [amountDetails, setAmountDetails] = useState<totalAmountDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();
  const { httpRequest } = useFetchNew();

  const createOrder = async () => {
    setButtonLoading(true);

    const requestConfig = {
      endPoint: ORDER_API,
      method: "POST",
      body: { products: products },
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      navigate(CHECKOUT + "?id=" + response.data.cartId);
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }

    setButtonLoading(false);
  };

  const getTotalAmount = useCallback(async () => {
    const requestConfig = {
      endPoint: GET_TOTAL_PAYMENT,
      body: { products },
      method: "POST",
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      setAmountDetails(response.data);
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }

    setIsLoading(false);
  }, [httpRequest, products]);

  useEffect(() => {
    getTotalAmount();
  }, [getTotalAmount]);

  let body;

  if (isLoading) {
    body = <Skeleton className="h-64" containerClassName="w-full " count={1} />;
  } else if (error) {
    body = <p className="px-5 text-xs text-red-500">{error}</p>;
  } else {
    body = (
      <div className="sticky top-28 flex flex-col space-y-8 w-full h-fit  bg-white border p-5">
        <h3 className="font-bold text-sm">PRICE DETAILS</h3>

        <div className="grid grid-cols-[200px_auto] lg:grid-cols-[200px_auto] gap-y-5">
          <span>
            Price{" "}
            {"( " +
              amountDetails?.totalItems +
              (amountDetails?.totalItems ? " items" : " item") +
              " ) :"}
          </span>
          <span>: ₹ {amountDetails?.totalAmount}</span>

          <p>Delivery</p>

          <p className=" text-green-500">: Free</p>

          <p className="font-bold">Total</p>
          <p className="font-bold">: ₹ {amountDetails?.totalAmount}</p>
        </div>

        <div className="flex w-full justify-center sm:justify-start lg:justify-center">
          {placeOrder && (
            <Button
              isLoading={isLoading || buttonLoading}
              text="PLACE ORDER"
              callback={() => createOrder()}
              type={"primary"}
            />
          )}
        </div>
      </div>
    );
  }

  return <div className="flex w-full lg:w-96 h-full pt-3 relative">{body}</div>;
};

export default TotalAmount;
