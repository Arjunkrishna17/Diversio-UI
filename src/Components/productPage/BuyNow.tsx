import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useFetchNew from "../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../Config/Constants";
import { ORDER_API } from "../../Config/Apis/Orders";
import { CHECKOUT } from "../../Config/RoutePoints/ProductRoutes";
import Button from "../Packages/Button";
import { CART_PRODUCTS } from "../../Config/Apis/ProductsAPIs";
import { productTypes } from "../Dashboard/Products/Types";
import { ProductContext } from "../../Context/Product";
import { AuthContext } from "../../Context/Auth";
import { LOGIN } from "../../Config/RoutePoints/commonEndpoints";

interface props {
  product: productTypes;
}

const BuyNow = ({ product }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { httpRequest } = useFetchNew();
  const navigate = useNavigate();
  const productCtx = useContext(ProductContext);
  const authCtx = useContext(AuthContext);

  const addToCart = async () => {
    setIsLoading(true);

    const body = {
      productId: product._id,
      productName: product.title,
      price: product.price,
      imageUrl: product.images[0],
      quantity: 1,
    };

    const requestConfig = {
      endPoint: CART_PRODUCTS,
      method: "POST",
      body: [body],
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      productCtx.getProducts(); //refresh the cart
      createOrder();
    }
  };

  const createOrder = async () => {
    const requestConfig = {
      endPoint: ORDER_API,
      method: "POST",
      body: { products: [{ productId: product._id, quantity: 1 }] },
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      navigate(CHECKOUT + "?orderId=" + response.data.orderId);
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }
    setIsLoading(false);
  };

  const buyNowHandler = () => {
    if (authCtx.loggedIn) {
      addToCart();
    } else {
      navigate(LOGIN, { state: { redirect: true } });
    }
  };

  return (
    <div className="relative">
      {error && (
        <p className="text-red-500 text-xs absolute -left-20 -top-9 w-full">
          {error}
        </p>
      )}
      <Button
        text="Buy Now"
        callback={buyNowHandler}
        type="primary"
        isLoading={isLoading}
      />
    </div>
  );
};

export default BuyNow;
