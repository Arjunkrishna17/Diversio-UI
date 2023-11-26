import React, { useContext, useState } from "react";

import { ProductContext } from "../../Context/Product";
import DetailsOnHover from "../Common/DetailsOnHover";
import { savedProducts } from "../Types/Types";
import { AuthContext } from "../../Context/Auth";
import useFetchNew from "../../Hooks/useFetchNew";
import { CART_PRODUCTS } from "../../Constants/Apis/ProductsAPIs";
import { ERROR_MSG } from "../../Constants/Constants";
import { ReactComponent as Spinner } from "../../Assets/Images/Spinner.svg";

interface cartCardProps {
  product: savedProducts;
}

const CartCard = ({ product }: cartCardProps) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const productCtx = useContext(ProductContext);
  const authCtx = useContext(AuthContext);
  const { httpRequest } = useFetchNew();

  let count = product ? product.quantity : 0;

  const deleteProduct = async (id: string) => {
    const requestConfig = {
      endPoint: CART_PRODUCTS + "?product-id=" + id,
      method: "DELETE",
    };

    setIsLoading(true);

    const response = await httpRequest(requestConfig);
    if (response.success) {
      productCtx.getProducts();
      setError("");
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }
    setIsLoading(false);
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
    <div className="flex flex-col space-y-3 relative w-full justify-center  px-5 py-2 bg-white border shadow-md ">
      <button
        onClick={deleteProducts}
        className="flex justify-center items-center absolute right-5 top-5 font-semi-bold border w-6 h-6 rounded-full text-center hover:bg-gray-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner className="w-5 h-5 fill-blue-500 animate-spin stroke-white" />
        ) : (
          <span>X</span>
        )}
      </button>

      <div className="flex flex-col space-y-5 items-center  justify-center sm:justify-start  sm:flex-row sm:space-x-5 sm:px-5">
        <img className="w-28 h-28" src={product.imageUrl} alt="product" />
        <div className="flex flex-col items-center sm:items-start space-y-3 w-full h-full px-5">
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
                src={require("../../Assets/Images/Dash.svg").default}
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
                src={require("../../Assets/Images/Plus.svg").default}
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
