import React from "react";

import { orderDetails } from "../../Types/Order";
import moment from "moment";
import DetailsOnHover from "../Common/DetailsOnHover";

interface props {
  order: orderDetails;
}

const OrderCard = ({ order }: props) => {
  const product = order.product;
  return (
    <div className="flex flex-col items-center space-y-3  border bg-white w-[20rem] md:w-[30rem] lg:w-[45rem] px-10 py-5">
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center w-full lg:space-x-5 shrink-0">
          <h4 className="text-gray-500">
            <span className="font-semi-bold">Order Id: </span>
            <span>{order._id}</span>
          </h4>

          <div>
            <h4 className="text-gray-500 relative cursor-default">
              <div className="peer">
                <span className="font-semi-bold">Created on: </span>
                <span>{moment(order.createdAt).format("Do MMM YYYY")}</span>
              </div>

              {DetailsOnHover({
                text: moment(order.createdAt)
                  .format("Do MMM YYYY HH:mm:a")
                  .toString(),
                styles: " bottom-8 ",
              })}
            </h4>
          </div>

          <div className="bg-green-600 text-white px-5 py-1 border w-fit ">
            In Transit
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center w-full  space-x-5">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-20 h-20"
          />

          <div className="flex flex-col space-y-2">
            <h3 className="">{product.title}</h3>

            <div className="flex space-x-1 text-xs font-bold">
              <span>Qty: </span>
              <span>{order.quantity}</span>
            </div>

            <div className="flex space-x-1 text-xs font-bold">
              <span>Price: </span>
              <span>₹ {product.price.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
