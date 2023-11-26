import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import useFetchNew from "../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../Constants/Constants";
import { ORDER_API } from "../../Constants/Apis/Orders";
import { CHECKOUT } from "../../Constants/RoutePoints/ProductRoutes";
import Button from "../Common/Button";
import { CART_PRODUCTS } from "../../Constants/Apis/ProductsAPIs";
import { productTypes } from "../../Types/Product";
import { ProductContext } from "../../Context/Product";
import { AuthContext } from "../../Context/Auth";
import { LOGIN } from "../../Constants/RoutePoints/commonEndpoints";

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

  const body = {
    productId: product._id,
    quantity: 1,
  };

  const addToCart = async () => {
    setIsLoading(true);

    const requestConfig = {
      endPoint: CART_PRODUCTS,
      method: "POST",
      body: [
        {
          ...body,
          productName: product.title,
          imageUrl: product.images[0],
          price: product.price,
        },
      ],
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
      body: { products: [body] },
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      navigate(CHECKOUT + "?id=" + response.data.cartId);
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
