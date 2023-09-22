import React from "react";
import { useNavigate } from "react-router-dom";

import { productTypes } from "./Types";
import { PRODUCT_PAGE } from "../../../Config/ProductRoutes";

interface productCardProps {
  product: productTypes;
}

const ProductCard = ({ product }: productCardProps) => {
  const navigate = useNavigate();

  const onClickHandler = (productId: string) => {
    navigate(PRODUCT_PAGE + "/" + productId);
  };

  return (
    <div
      onClick={() => onClickHandler(product._id)}
      key={product.title}
      className="flex  flex-col items-center h-72 space-y-5 py-5 px-5 cursor-pointer border rounded-lg shadow-lg my-5"
    >
      <div className="flex justify-center items-center  h-36 py-5">
        <img src={product.images[0]} alt="product" className="h-36 w-36 " />
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
  );
};

export default ProductCard;
