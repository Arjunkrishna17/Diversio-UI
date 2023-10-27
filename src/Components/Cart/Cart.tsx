import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useNavigate } from "react-router-dom";

import CartCard from "./CartCard";
import { ProductContext } from "../../Context/Product";

import Button from "../Packages/Button";
import { savedProducts } from "../Constants/Types";
import { CHECKOUT } from "../../Config/ProductRoutes";

const Cart = () => {
  const productCtx = useContext(ProductContext);
  const navigate = useNavigate();

  let body;

  if (productCtx.isLoading) {
    body = (
      <div className="flex flex-col lg:flex-row lg:space-x-8 w-full h-full">
        <Skeleton
          className="h-20 mt-5"
          containerClassName="w-full "
          count={5}
        />
        <Skeleton
          className="w-full lg:w-1/2 h-80"
          containerClassName="w-full lg:w-1/2 h-80 mt-5"
        />
      </div>
    );
  } else if (productCtx.error) {
    body = (
      <p className="flex w-full text-red tex-xs text-red-500">
        {productCtx.error}
      </p>
    );
  } else if (!productCtx.products.length) {
    body = emptyCartHtml();
  } else {
    body = (
      <div className="flex flex-col w-full h-full space-y-2">
        {productCtx.products.map((product: savedProducts) => (
          <CartCard key={product._id} product={product} />
        ))}
      </div>
    );
  }

  const priceCalculator = (product: savedProducts[]) => {
    let price = 0;

    product.map((product) => {
      price = price + product.quantity * product.price;

      return null;
    });

    return price;
  };

  const totalPrice = priceCalculator(productCtx.products);

  const items = productCtx.products.length;

  return (
    <div className="flex  flex-col  w-full h-full   px-8 ">
      <h2 className="sticky top-[6.9rem]  md:top-[4.5rem]  border py-2 px-2 z-20 flex w-full bg-white  font-bold">
        CART
      </h2>
      <div className="flex flex-col   space-y-1 lg:flex-row lg:space-x-5 lg:space-y-0 w-full h-full ">
        <div className="flex relative flex-col py-3 space-y-5 w-full ">
          {body}
        </div>

        {items ? (
          <div className="w-full lg:w-1/2 h-full pt-3">
            <div className="sticky top-28 flex flex-col space-y-8 w-full h-fit  bg-white border p-5">
              <h3 className="font-bold text-sm">PRICE DETAILS</h3>

              <div className="grid grid-cols-[200px_auto] lg:grid-cols-[200px_auto] gap-y-5">
                <span>
                  Price {"( " + items + (items ? " items" : " item") + " ) :"}
                </span>
                <span>: ₹ {totalPrice}</span>

                <p>Delivery</p>

                <p className=" text-green-500">: Free</p>

                <p className="font-bold">Total</p>
                <p className="font-bold">: ₹ {totalPrice}</p>
              </div>

              <div className="flex w-full justify-center sm:justify-start lg:justify-center">
                <Button
                  text="PLACE ORDER"
                  callback={() => navigate(CHECKOUT)}
                  type={"primary"}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;

const emptyCartHtml = () => {
  return (
    <div className="flex w-full h-full ">
      <div className="flex flex-col space-y-5 w-full h-40 bg-white rounded-md shadow-md items-center justify-center">
        <p>Your Cart is Empty !</p>
        <Link to="/" className="text-orange-500">
          Add items
        </Link>
      </div>
    </div>
  );
};
