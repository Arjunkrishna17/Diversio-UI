import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Card from "./Card";
import Button from "../../Packages/Button";
import useFetchNew from "../../../Hooks/useFetchNew";
import { COD_PAYMENT_API } from "../../../Config/Apis/Orders";
import { useNavigate } from "react-router-dom";
import { ORDER_SUCCESS_PAGE } from "../../../Config/RoutePoints/Orders";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string
);

interface props {
  clientSecret: { clientSecret: string; amount: number };
  orderId: string;
}

const enum PAYMENT_TYPE {
  CARD,
  COD,
}

const Payment = ({ clientSecret, orderId }: props) => {
  const [showPaymentType, setPaymentType] = useState<PAYMENT_TYPE>(
    PAYMENT_TYPE.CARD
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { httpRequest } = useFetchNew();
  const navigate = useNavigate();

  const options = {
    clientSecret: clientSecret.clientSecret,
    theme: "stripe",
  };

  const codConfirmPayment = async () => {
    const requestConfig = {
      endPoint: COD_PAYMENT_API + "?orderId=" + orderId,
    };

    setIsLoading(true);

    const response = await httpRequest(requestConfig);

    if (response.success) {
      navigate(ORDER_SUCCESS_PAGE + "?orderId=" + orderId, { replace: true });
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(response.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div
        className={
          "flex flex-col justify-center  px-5 py-5" +
          (showPaymentType === PAYMENT_TYPE.CARD ? " bg-orange-50" : "")
        }
      >
        <div className="flex items-center space-x-1">
          <input
            onClick={() => setPaymentType(PAYMENT_TYPE.CARD)}
            type="radio"
            checked={showPaymentType === PAYMENT_TYPE.CARD}
          />
          <span className="text-sm">Credit Card / Debit Card </span>
        </div>

        {showPaymentType === PAYMENT_TYPE.CARD && (
          <Elements stripe={stripePromise} options={options}>
            <Card amount={clientSecret.amount} orderId={orderId} />
          </Elements>
        )}
      </div>

      <div
        className={
          "flex flex-col py-2 space-y-5 w-full " +
          (showPaymentType === PAYMENT_TYPE.COD ? " bg-orange-50" : "")
        }
      >
        <div className="flex items-center px-5 py-2 space-x-1">
          <input
            onClick={() => setPaymentType(PAYMENT_TYPE.COD)}
            type="radio"
            checked={showPaymentType === PAYMENT_TYPE.COD}
          />
          <span className="text-sm">COD</span>
        </div>

        {showPaymentType === PAYMENT_TYPE.COD && (
          <div className="px-9">
            <Button
              isLoading={isLoading}
              text="Confirm Order"
              type="primary"
              callback={() => codConfirmPayment()}
            />
          </div>
        )}

        {error && <p className="text-red-500 text-xs px-10">{error}</p>}
      </div>
    </div>
  );
};

export default Payment;
