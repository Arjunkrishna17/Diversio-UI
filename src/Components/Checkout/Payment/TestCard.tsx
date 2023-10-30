import React from "react";

const TestCard = () => {
  return (
    <div className="lg:fixed top-[22rem] w-96  flex flex-col space-y-5  h-fit  bg-white border p-5">
      <h5 className="w-full text-center">Test Card</h5>
      <div>
        <p>Card Number</p>
        <p className="font-semibold">4242 4242 4242 4242</p>
      </div>

      <div className="flex w-full space-x-5">
        <div>
          <p>Expiration</p>
          <p className="font-semibold">04/24</p>
        </div>
        <div>
          <p>CVC</p>
          <p className="font-semibold">424</p>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
