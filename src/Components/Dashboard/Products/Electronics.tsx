import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useGetFetch from "../../../Hooks/useGetFetch";
import { GET_PRODUCTS } from "../../../Config/Apis/ProductsAPIs";
import ProductCard from "./ProductCard";
import { productTypes } from "./Types";
import { useFetchDataType } from "../../Constants/Types";

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
    slidesToShow: 5,
    slidesToScroll: 5,

    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let content;

  if (isLoading) {
    content = (
      <div className="flex flex-col h-full w-full">
        <Skeleton
          count={4}
          containerClassName="flex w-full h-full space-x-5 my-5"
          className=" h-full"
        />
      </div>
    );
  } else if (error) {
    content = (
      <p className="text-xs text-red w-full h-full  text-red-500 "> {error}</p>
    );
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
    <div className="flex flex-col w-full h-[24rem]  py-5 px-3">
      <div className="grow w-full  bg-white border px-10 py-5">
        <h3 className="font-bold">Electronics</h3>
        {content}
      </div>
    </div>
  );
};

export default Electronics;
