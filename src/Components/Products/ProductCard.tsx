import React from "react";
import { useNavigate } from "react-router-dom";

import { productTypes } from "../../Types/Product";
import { PRODUCT_PAGE } from "../../Constants/RoutePoints/ProductRoutes";
import { ReactComponent as Rupees } from "../../Assets/Images/Rupees.svg";

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
      className="flex  flex-col items-center h-60 space-y-5 py-5 px-5 cursor-pointer border rounded-lg shadow-lg  bg-white hover:bg-gray-100 mb-3"
    >
      <div className="flex justify-center items-center">
        <img src={product.images[0]} alt="product" className="h-24 w-24 " />
      </div>
      <div className="flex w-full justify-center items-center space-x-1  font-bold">
        <Rupees className="w-3 h-3 " />

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
