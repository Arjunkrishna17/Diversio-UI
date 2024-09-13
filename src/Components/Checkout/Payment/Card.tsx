import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";

import { ReactComponent as Loading } from "../../../Assets/Images/Spinner.svg";
import { STRIPE_CONFIRM_RETURN_URL } from "../../../Constants/RoutePoints/Orders";
import { ReactComponent as Rupees } from "../../../Assets/Images/Rupees.svg";
import { address } from "../../../Types/User";

interface props {
  amount: number;
  cartId: string;
  selectedAddress: address;
}

const Card = ({ amount, cartId, selectedAddress }: props) => {
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
        return_url: STRIPE_CONFIRM_RETURN_URL + "?cartId=" + cartId,
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

          <AddressElement
            options={{
              mode: "billing",
              defaultValues: {
                name: selectedAddress.fullName,
                address: {
                  line1: selectedAddress.address1,
                  line2: selectedAddress.address2,
                  country: "IN",
                  city: selectedAddress.city,
                  state: selectedAddress.state,
                  postal_code: selectedAddress.pincode,
                },
              },
            }}
          />

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
                <div className="flex flex-wrap space-x-1 items-center text-sm">
                  <p>Pay</p>
                  <div className="flex items-center">
                    <Rupees className="w-3 h-3 fill-white stroke-white" />
                    <span>{amount.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </button>
          </div>

          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
      </div>
    </form>
  );
};

export default Card;
