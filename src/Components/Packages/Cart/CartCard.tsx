import React, { useContext } from "react";

import { productTypes } from "../../Dashboard/Products/Types";
import { ProductContext } from "../../../Context/Product";
import DetailsOnHover from "../DetailsOnHover";

interface cartCardProps {
  product: productTypes;
}

const CartCard = ({ product }: cartCardProps) => {
  const productCtx = useContext(ProductContext);
  let count = 0;

  if (productCtx.cartProducts.length) {
    const products = productCtx.cartProducts.find(
      (cartProduct) => cartProduct.id === product._id
    );

    count = products?.quantity || 0;
  }

  const addQty = () => {
    productCtx.addProduct(product._id);
  };

  const subtractQty = () => {
    productCtx.subtractQty(product._id);
  };

  const deleteProducts = () => {
    productCtx.removeProduct(product._id);
  };

  return (
    <div className="flex relative w-full items-center px-5  bg-white border shadow-md h-48">
      <button
        onClick={deleteProducts}
        className="absolute right-5 top-5 font-semi-bold"
      >
        X
      </button>

      <div className="flex space-x-5 px-5">
        <img className="w-36 h-36" src={product.images[0]} alt="product" />
        <div className="flex flex-col space-y-6 w-full h-full px-5">
          <div className="relative cursor-default">
            <h4 className="line-clamp-2 peer">{product.title}</h4>
            <DetailsOnHover text={product.title} />
          </div>

          <div className="flex font-bold">
            <span>₹</span>
            <span>{product.price}</span>
          </div>

          <div className="flex space-x-2">
            <button
              disabled={count === 1}
              onClick={subtractQty}
              className="flex flex-col items-center justify-center w-6 h-6 font-bold rounded-full border bg-gray-50 disabled:opacity-40 "
            >
              <img
                className="w-5 h-5"
                src={require("../../../Images/Dash.svg").default}
                alt="plus"
              />
            </button>
            <p>{count}</p>
            <button
              onClick={addQty}
              className="flex flex-col items-center justify-center w-6 h-6 rounded-full border bg-gray-50 text-xl"
            >
              <img
                className="w-5 h-5"
                src={require("../../../Images/Plus.svg").default}
                alt="plus"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
