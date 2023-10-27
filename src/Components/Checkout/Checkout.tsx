import React from "react";
import Address from "./Address/Address";

const Checkout = () => {
  const addressCallback = (addressId: string) => {};
  return (
    <div className="flex justify-center items-center  py-5 w-full h-full">
      <div className="flex flex-col space-y-5 w-[44rem]  h-full bg-white border">
        <Address callback={addressCallback} />
      </div>
    </div>
  );
};

export default Checkout;
