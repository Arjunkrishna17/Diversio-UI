import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { GET_PRODUCTS } from "../../Constants/Apis/ProductsAPIs";
import ProductCard from "./ProductCard";
import { productTypes } from "../../Types/Product"
import useFetchNew from "../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../Constants/Constants";

interface props {
  categoryFilter: string;
  sectionName: string;
}

const ProductSection = ({ categoryFilter, sectionName }: props) => {
  const [data, setData] = useState<productTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { httpRequest } = useFetchNew();

  useEffect(() => {
    const getProducts = async () => {
      const requestConfig = {
        endPoint: GET_PRODUCTS + "?category=" + categoryFilter,
      };

      const response = await httpRequest(requestConfig);

      if (response.success) {
        setData(response.data.content);
      } else if (response.error) {
        setError(response.error);
      } else {
        setError(ERROR_MSG);
      }

      setIsLoading(false);
    };

    getProducts();
  }, [httpRequest, categoryFilter]);

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
    <div className="flex flex-col w-full h-[21rem]  px-3 pt-3">
      <div className="grow w-full  px-10 py-5 bg-white border">
        <h3 className="font-bold pb-3">{sectionName}</h3>
        {content}
      </div>
    </div>
  );
};

export default ProductSection;
