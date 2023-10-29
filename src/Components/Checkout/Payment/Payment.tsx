import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import useFetchNew from "../../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../../Config/Constants";
import { GET_PAYMENT_INTENT } from "../../../Config/Apis/Orders";
import { ReactComponent as Tick } from "../../../Images/Tick.svg";
import Card from "./Card";
import Button from "../../Packages/Button";

const stripePromise = loadStripe(
  "pk_test_51NGLouSGajw4zsaMLdnylQSJO1kz9gxBpBqaYd2k4UYWR9mO470bjzwYPLOFxW3QEnFzzU1yNshDg2k0rojHcKeU00jUpVcFIJ"
);

interface props {
  orderId: string;
}

const enum PAYMENT_TYPE {
  CARD,
  COD,
}

const Payment = ({ orderId }: props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentType, setPaymentType] = useState<PAYMENT_TYPE>();

  const [error, setError] = useState("");

  const { httpRequest } = useFetchNew();

  const options = {
    clientSecret:
      "pi_3O6P3KSGajw4zsaM0jVAHIj0_secret_M2v1O7mzMybgjMQgQ933Lbqmp",
    theme: "stripe",
  };

  const getClient = async () => {
    const requestConfig = {
      endPoint: GET_PAYMENT_INTENT + "?orderId=" + orderId,
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      setClientSecret(response.data.clientSecret);
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }
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
            <Card />
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
            <Button text="Confirm Order" type="primary" callback={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
