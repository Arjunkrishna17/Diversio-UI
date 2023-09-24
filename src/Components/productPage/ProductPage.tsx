import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useFetchDataType } from "../Constants/Types";
import useGetFetch from "../../Hooks/useGetFetch";
import { GET_PRODUCTS } from "../../Config/ProductsAPIs";
import { productTypes } from "../Dashboard/Products/Types";
import Button from "../Packages/Button";
import Details from "./Details";
import Skelton from "./Skelton";
import AddCart from "./AddCart";

interface productFetch extends useFetchDataType {
  data: productTypes;
}

const selectedImgStyle = "border-blue-600 border-2";

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const { id } = useParams();

  const productFilter = "?product-id=" + id;

  const { data, isLoading, error }: productFetch = useGetFetch(
    GET_PRODUCTS + productFilter
  );

  const buyNowHandler = () => {};

  let body;

  if (isLoading) {
    body = <Skelton />;
  } else if (error) {
    body = (
      <div className="w-full h-full">
        <p className="text-red-500 text-xs">{error}</p>
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col h-full  md:flex-row  w-full md:px-5  space-y-5 md:space-y-0 flex-grow-0">
        <div className="flex flex-col lg:grow lg:flex-row relative w-full md:px-5  space-y-5 lg:space-y-0 h-full">
          <div className="flex flex-col relative lg:w-1/2 h-full border px-5 bg-white shadow-md ">
            <div className="sticky top-28 flex items-center  justify-center  w-full pt-5  ">
              <div className="flex flex-col  space-x-5 justify-center items-center space-y-5 ">
                <div className="flex flex-col-reverse md:flex-row md:space-x-5 md:mt-10 xl:mt-0">
                  <div className="flex md:flex-col space-x-5 md:space-x-0  md:space-y-5 justify-center">
                    {data.images.map((img) => (
                      <img
                        key={img}
                        onClick={() => setSelectedImage(img)}
                        className={`flex mt-5 md:mt-0  w-16 h-16 border p-2 hover:scale-105 hover:border-blue-600 hover:border-2 rounded-md cursor-pointer  ${
                          selectedImage === img ? selectedImgStyle : ""
                        } ${
                          !selectedImage && img === data.images[0]
                            ? selectedImgStyle
                            : " "
                        }`}
                        src={img}
                        alt=""
                      />
                    ))}
                  </div>

                  <div className="flex w-52 h-52 md:w-80 md:h-80  xl:w-130 xl:h-130 xl:p-16 ">
                    <img
                      className="flex w-full h-full"
                      src={selectedImage ? selectedImage : data.images[0]}
                      alt=""
                    />
                  </div>
                </div>

                <div className="flex w-full justify-center space-x-5 py-5">
                  <AddCart product={data} />
                  <Button
                    text="BUY NOW"
                    type="primary"
                    callback={buyNowHandler}
                  />
                </div>
              </div>
            </div>
          </div>

          <Details data={data} />
        </div>
      </div>
    );
  }

  return <div className="w-full h-full py-5 px-5 ">{body}</div>;
};

export default ProductPage;
