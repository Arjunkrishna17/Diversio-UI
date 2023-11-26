import React, { useEffect, useState } from "react";
import useFetchNew from "../Hooks/useFetchNew";
import { ERROR_MSG } from "../Constants/Constants";
import { ORDER_API } from "../Constants/Apis/Orders";
import { orderDetails } from "../Types/Order";
import OrderCard from "../Components/Orders/OrderCard";
import Skeleton from "react-loading-skeleton";

const Orders = () => {
  const [orders, setOrders] = useState<orderDetails[]>([]);
  const [error, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { httpRequest } = useFetchNew();

  useEffect(() => {
    const getOrders = async () => {
      const requestHandler = {
        endPoint: ORDER_API,
      };

      const response = await httpRequest(requestHandler);

      if (response.success) {
        setOrders(response.data);
      } else if (response.error) {
        setErrors(response.error);
      } else {
        setErrors(ERROR_MSG);
      }

      setIsLoading(false);
    };

    getOrders();
  }, [httpRequest]);

  let body;

  if (isLoading) {
    body = (
      <Skeleton
        containerClassName="w-full px-40 space-y-5"
        className="w-full h-52 "
        count={5}
      />
    );
  } else if (error) {
    body = <p className="text-sm tex-red-500">{error}</p>;
  } else if (orders.length) {
    body = orders.map((order) => <OrderCard key={order._id} order={order} />);
  } else {
    body = <p className="bg-white tex-center px-5 py-2">No orders yet</p>;
  }

  return (
    <div className="px-10">
      <h2 className="sticky top-[6.9rem]  md:top-[4.5rem]  border py-2 px-10 z-20 flex w-full bg-white  font-bold ">
        Your Orders
      </h2>

      <div className="flex flex-col w-full items-center space-y-3 mt-5  pb-8 ">
        {body}
      </div>
    </div>
  );
};

export default Orders;
