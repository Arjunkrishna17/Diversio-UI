import React, { useEffect, useState, useContext } from "react";
import Confetti from "react-confetti";
import Skeleton from "react-loading-skeleton";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ReactComponent as Tick } from "../../Assets/Images/Tick.svg";
import Button from "../Common/Button";
import { HOME } from "../../Constants/RoutePoints/ProductRoutes";
import useFetchNew from "../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../Constants/Constants";
import { PAYMENT_STATUS } from "../../Constants/Apis/Orders";
import { CS } from "../../Config/LocStorage";
import { ProductContext } from "../../Context/Product";

const CONFETTI_END_TIME = 3000;
const POLLING_END_TIME = 15; // counts
const POLLING_INTERVAL_TIME = 1000;

let timerId: NodeJS.Timer;
const OrderSuccess = () => {
  const [runConfetti, setRunConfetti] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  localStorage.removeItem(CS);

  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const { httpRequest } = useFetchNew();
  const productCtx = useContext(ProductContext);

  const getProducts = productCtx.getProducts;

  const orderId = urlParams.get("orderId");

  useEffect(() => {
    let apiCount = 0;

    const getPaymentStatus = async () => {
      const requestConfig = {
        endPoint: PAYMENT_STATUS + "?orderId=" + orderId,
      };

      const response = await httpRequest(requestConfig);

      if (response.success) {
        setStatus(response.data);

        if (response.data === "Success") {
          setRunConfetti(true);
          setTimeout(() => setRunConfetti(false), CONFETTI_END_TIME);
          getProducts();
          setIsLoading(false);
        } else if (response.data === null) {
          clearTimeout(timerId);

          if (apiCount >= POLLING_END_TIME) {
            clearTimeout(timerId);
            setIsLoading(false);
          } else {
            timerId = setTimeout(() => {
              apiCount++;
              getPaymentStatus();
            }, POLLING_INTERVAL_TIME); // polling one minute
          }
        } else {
          setIsLoading(false);
        }
      } else if (response.error) {
        setError(response.error);
      } else {
        setError(ERROR_MSG);
      }
    };

    getPaymentStatus();
  }, [httpRequest, orderId, getProducts]);

  const statusIcons = {
    Success: {
      icon: (
        <div className="flex w-20 h-20 rounded-full bg-green-500 items-center justify-center">
          <Tick className="w-10 h-10 fill-white" />
        </div>
      ),
      status: status,
      subText: "Thank you for your purchase !",
    },
    Failed: {
      icon: (
        <div className="flex w-20 h-20 rounded-full bg-red-500 items-center justify-center">
          <img
            src={require("../../Assets/Images/Failed.svg").default}
            className="w-10 h-10"
            alt="failed"
          />
        </div>
      ),
      status: status,
      subText: "If any money is deducted, it will be refunded within 3 days.",
    },
    null: {
      icon: (
        <div className="flex w-20 h-20 rounded-full bg-red-500 items-center justify-center">
          <img
            src={require("../../Assets/Images/Failed.svg").default}
            className="w-10 h-10"
            alt="failed"
          />
        </div>
      ),
      status: "Failed",
      subText: "If any money is deducted, it will be refunded within 3 days.",
    },
    "Action Needed": {
      icon: (
        <div className="flex w-20 h-20 rounded-full bg-gray-300 items-center justify-center">
          <img
            src={require("../../Assets/Images/Pending.svg").default}
            className="w-10 h-10"
            alt="pending"
          />
        </div>
      ),
      status: status,
      subText:
        "Stay relaxed, we'll inform you as soon as the payment status is updated.",
    },
  };

  let body;

  if (isLoading) {
    body = (
      <Skeleton
        count={5}
        className="w-full h-10"
        containerClassName="w-full h-full space-y-3"
      />
    );
  } else if (error) {
    body = <p className="text-xs px-5 text-red-500">{error}</p>;
  } else {
    body = (
      <>
        {statusIcons[status as keyof typeof statusIcons].icon}
        <div className="flex flex-col space-y-1 justify-center w-full items-center">
          <p className="text-lg font-semibold">
            Order {statusIcons[status as keyof typeof statusIcons].status}
          </p>
          <span className="text-center">
            {statusIcons[status as keyof typeof statusIcons].subText}
          </span>
        </div>

        <p className="opacity-60">Order ID: {orderId}</p>

        <Button
          text="Continue Shopping"
          callback={() => navigate(HOME, { replace: true })}
          type="primary"
        />
      </>
    );
  }

  return (
    <>
      <Confetti
        numberOfPieces={runConfetti ? 150 : 0}
        width={window.innerWidth}
        height={window.innerHeight}
      />

      <div className="flex w-full h-full items-center justify-center">
        <div className="bg-white flex flex-col space-y-5 items-center justify-center p-5 py-10 w-96 h-96">
          {body}
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
