import React, { useContext, useState } from "react";

import { ProductContext } from "../../Context/Product";
import DetailsOnHover from "../Packages/DetailsOnHover";
import { savedProducts } from "../Constants/Types";
import { AuthContext } from "../../Context/Auth";
import useFetchNew from "../../Hooks/useFetchNew";
import { CART_PRODUCTS } from "../../Config/ProductsAPIs";
import { ERROR_MSG } from "../../Config/Constants";

interface cartCardProps {
  product: savedProducts;
}

const CartCard = ({ product }: cartCardProps) => {
  const [error, setError] = useState("");

  const productCtx = useContext(ProductContext);
  const authCtx = useContext(AuthContext);
  const { httpRequest } = useFetchNew();

  let count = product ? product.quantity : 0;

  const deleteProduct = async (id: string) => {
    const requestConfig = {
      endPoint: CART_PRODUCTS + "?product-id=" + id,
      method: "DELETE",
    };

    const response = await httpRequest(requestConfig);
    if (response.success) {
      productCtx.getProducts();
      setError("");
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }
  };

  const updateQty = async (isAdd: boolean) => {
    const oldProductData = { ...product };

    if (isAdd) {
      oldProductData.quantity = oldProductData.quantity + 1;
    } else {
      oldProductData.quantity = oldProductData.quantity - 1;
    }

    const requestConfig = {
      endPoint: CART_PRODUCTS,
      method: "PUT",
      body: oldProductData,
    };

    const response = await httpRequest(requestConfig);
    if (response.success) {
      productCtx.getProducts();
      setError("");
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }
  };

  const addQty = () => {
    if (authCtx.loggedIn) {
      updateQty(true);
    } else {
      productCtx.addProduct(product);
    }
  };

  const subtractQty = () => {
    if (authCtx.loggedIn) {
      updateQty(false);
    } else {
      productCtx.subtractQty(product.productId);
    }
  };

  const deleteProducts = () => {
    if (authCtx.loggedIn) {
      deleteProduct(product._id as string);
    } else {
      productCtx.removeProduct(product.productId);
    }
  };

  return (
    <div className="flex flex-col space-y-3 relative w-full justify-center  px-5  bg-white border shadow-md h-48">
      <button
        onClick={deleteProducts}
        className="absolute right-5 top-5 font-semi-bold"
      >
        X
      </button>

      <div className="flex space-x-5 px-5">
        <img className="w-36 h-36" src={product.imageUrl} alt="product" />
        <div className="flex flex-col space-y-6 w-full h-full px-5">
          <div className="relative cursor-default">
            <h4 className="line-clamp-2 peer">{product.productName}</h4>
            <DetailsOnHover text={product.productName} />
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
                src={require("../../Images/Dash.svg").default}
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
                src={require("../../Images/Plus.svg").default}
                alt="plus"
              />
            </button>
          </div>
        </div>
      </div>

      {error && <p className="flex w-full text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default CartCard;
