import React, { useEffect, useCallback, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

import { GET_CART_PRODUCTS } from "../../Config/ProductsAPIs";
import useFetch from "../../Hooks/useFetch";
import CartCard from "./CartCard";
import { ProductContext } from "../../Context/Product";
import { productTypes } from "../Dashboard/Products/Types";
import Button from "../Packages/Button";

const Cart = () => {
  const { isLoading, error, data, fetchData } = useFetch({
    initialLoadingOnly: true,
  });

  const productCtx = useContext(ProductContext);

  const getCartProducts = useCallback(
    async (ids: string) => {
      const url = GET_CART_PRODUCTS + "?productIds=" + ids;

      const requestConfig = {
        endPoint: url,
      };
      fetchData(requestConfig);
    },
    [fetchData]
  );

  useEffect(() => {
    let ids: string[] = [];

    productCtx.cartProducts.length &&
      productCtx.cartProducts.map((product) => {
        ids.push(product.id);
        return null;
      });

    const param = ids.length ? ids.join(",") : "";

    getCartProducts(param);
  }, [productCtx.cartProducts, getCartProducts]);

  let body;

  let price = 0;

  if (isLoading) {
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
  } else if (error) {
    body = <p className="flex w-full text-red tex-xs">{error}</p>;
  } else if (!data || (data && !data.length)) {
    body = (
      <div className="flex w-full h-full ">
        <div className="flex flex-col space-y-5 w-full h-40 bg-white rounded-md shadow-md items-center justify-center">
          <p>Your Cart is Empty !</p>
          <Link to="/" className="text-orange-500">
            {" "}
            Add items
          </Link>
        </div>
      </div>
    );
  } else {
    data.map((product: productTypes) => {
      const qty =
        productCtx.cartProducts.find(
          (cartProduct) => cartProduct.id === product._id
        )?.quantity || 0;

      price = price + product.price * qty;

      return null;
    });

    body = (
      <div className="flex flex-col w-full h-full space-y-2">
        {data.map((product: productTypes) => (
          <CartCard key={product._id} product={product} />
        ))}
      </div>
    );
  }

  const items = productCtx.cartProducts.length;

  return (
    <div className="flex  flex-col  w-full h-full   px-8">
      <h2 className="sticky top-28 lg:top-20 border py-2 px-2 z-20 flex w-full bg-white  font-bold">
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
                <span>: ₹ {price.toLocaleString()}</span>

                <p>Delivery</p>

                <p className=" text-green-500">: Free</p>

                <p className="font-bold">Total</p>
                <p className="font-bold">: ₹ {price.toLocaleString()}</p>
              </div>

              <div className="flex w-full justify-center sm:justify-start lg:justify-center">
                <Button
                  text="PLACE ORDER"
                  callback={() => {}}
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
