import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { ReactComponent as Loading } from "../../../Images/Spinner.svg";
import { STRIPE_CONFIRM_RETURN_URL } from "../../../Config/RoutePoints/Orders";

const Card = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: STRIPE_CONFIRM_RETURN_URL,
      },
    });

    if (
      response.error.type === "card_error" ||
      response.error.type === "validation_error" ||
      response.error.type === "invalid_request_error"
    ) {
      setError(response.error.message as string);
    } else {
      setError("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form className="flex flex-col w-full h-fit  " id="payment-form">
      <div className="flex flex-col space-y-2  w-full ">
        <div className="flex flex-col w-full px-4 py-5 space-y-5">
          <PaymentElement id="payment-element" options={{ layout: "tabs" }} />

          <div>
            <button
              className="flex items-center justify-center min-w-[8rem]   px-5 py-2  shadow-lg bg-orange-500 text-white hover:bg-orange-600 text-sm"
              disabled={isLoading || !stripe || !elements}
              onClick={handleSubmit}
              id="submit"
            >
              {isLoading ? (
                <Loading className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex space-x-2 items-center text-sm">
                  Pay $240
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Card;
