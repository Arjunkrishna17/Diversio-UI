import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import useGetFetch from "../../Hooks/useGetFetch";
import { GET_PRODUCTS } from "../../Config/ProductsAPIs";

interface productDataTypes {
  title: string;
  images: string;
  price: number;
}

interface useFetchDataType {
  data: any;
  isLoading: boolean;
  error: string | undefined;
}

const Electronics = () => {
  const { data, isLoading, error }: useFetchDataType =
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
        {data.map((product: productDataTypes) => (
          <div
            key={product.title}
            className="flex  flex-col items-center h-72 space-y-5 py-5 px-5 border rounded-lg shadow-lg my-5"
          >
            <div className="flex justify-center items-center  h-36 py-5">
              <img
                src={product.images[0]}
                alt="product"
                className="h-36 w-36 "
              />
            </div>
            <div className="flex w-full justify-center space-x-1 text-sm font-semibold">
              <span>Rs.</span>
              <span>{product.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-center">
              <p className="text-xs font-semibold  line-clamp-2 opacity-80">
                {product.title}
              </p>
            </div>
          </div>
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
