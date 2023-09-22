import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useGetFetch from "../../../Hooks/useGetFetch";
import { GET_PRODUCTS } from "../../../Config/ProductsAPIs";
import ProductCard from "./ProductCard";
import { productTypes } from "./Types";
import { useFetchDataType } from "../../Types/Types";

interface electronicDataFetch extends useFetchDataType {
  data: productTypes[];
}

const Electronics = () => {
  const { data, isLoading, error }: electronicDataFetch =
    useGetFetch(GET_PRODUCTS);

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  let content;

  if (isLoading) {
    content = (
      <Skeleton
        count={4}
        containerClassName="flex w-full h-full space-x-5 my-5"
        className=" h-full"
      />
    );
  } else if (error) {
    content = <p className="text-xs text-red w-full"> {error}</p>;
  } else {
    content = (
      <Slider {...settings}>
        {data.map((product: productTypes) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Slider>
    );
  }

  return (
    <div className="w-screen min-h-[24rem]  py-5 px-3">
      <div className="flex flex-col h-full w-full justify-center bg-white border px-10 py-5">
        <h3 className="font-bold">Electronics</h3>
        {content}
      </div>
    </div>
  );
};

export default Electronics;
