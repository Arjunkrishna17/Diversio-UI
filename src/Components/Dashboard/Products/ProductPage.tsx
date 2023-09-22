import React from "react";

import { useFetchDataType } from "../../Types/Types";
import useGetFetch from "../../../Hooks/useGetFetch";
import { GET_PRODUCTS } from "../../../Config/ProductsAPIs";
import { useParams } from "react-router-dom";
import { productTypes } from "./Types";
import Button from "../../Packages/Button";

interface productFetch extends useFetchDataType {
  data: productTypes;
}

const ProductPage = () => {
  const { id } = useParams();

  const productFilter = "?product-id=" + id;

  const { data, isLoading, error }: productFetch = useGetFetch(
    GET_PRODUCTS + productFilter
  );

  let body;

  const buyNowHandler = () => {};

  const addToCartHandler = () => [];

  if (data) {
    body = (
      <div className="flex w-full px-5 h-full">
        <div className="flex flex-col w-1/2 border">
          <div className="flex items-center  justify-center space-x-8 w-full py-5  h-full  ">
            <div className="flex flex-col  space-y-5 justify-center">
              {data.images.map((img) => (
                <img
                  className="w-20 border p-2 h-20 bg-white hover:scale-105 hover:border-blue-600 hover:border-2 rounded-md cursor-pointer"
                  src={img}
                  alt=""
                />
              ))}
            </div>

            <div className="flex w-130 h-130 p-16 bg-white rounded-lg shadow-md ">
              <img className="flex w-full h-full" src={data.images[0]} alt="" />
            </div>
          </div>

          <div className="flex w-full justify-center space-x-5 py-5">
            <Button
              text="ADD TO CART"
              type="secondary"
              callback={addToCartHandler}
            />
            <Button text="BUY NOW" type="primary" callback={buyNowHandler} />
          </div>
        </div>

        <div className="flex w-1/2">
          <h2>{}</h2>
        </div>
      </div>
    );
  }
  return <div className="w-full h-full py-5 px-5">{body}</div>;
};

export default ProductPage;
