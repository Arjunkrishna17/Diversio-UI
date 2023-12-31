import React, { useContext, useState } from "react";

import Button from "../Common/Button";
import { productTypes } from "../../Types/Product";
import { ProductContext } from "../../Context/Product";
import { AuthContext } from "../../Context/Auth";
import useFetchNew from "../../Hooks/useFetchNew";
import { savedProducts } from "../Types/Types";
import { CART_PRODUCTS } from "../../Constants/Apis/ProductsAPIs";

interface addCartProps {
  product: productTypes;
}

const AddCart = ({ product }: addCartProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const { httpRequest } = useFetchNew();

  const productCtx = useContext(ProductContext);
  const authCtx = useContext(AuthContext);

  const addToCart = async (body: savedProducts) => {
    const requestConfig = {
      endPoint: CART_PRODUCTS,
      method: "POST",
      body: [body],
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      productCtx.getProducts(); //refresh the cart
    }

    setIsLoading(false);
  };

  const addToCartHandler = () => {
    setIsLoading(true);

    const saveProduct = {
      productId: product._id,
      productName: product.title,
      price: product.price,
      imageUrl: product.images[0],
      quantity: 1,
    };

    if (authCtx.loggedIn) {
      const timeId = setTimeout(() => {
        addToCart(saveProduct);
        clearTimeout(timeId);
      }, 100);
    } else {
      const timeId = setTimeout(() => {
        productCtx.addProduct(saveProduct);

        setIsLoading(false);
        clearTimeout(timeId);
      }, 500);
    }
  };

  return (
    <Button
      text="ADD TO CART"
      type="secondary"
      isLoading={isLoading}
      callback={() => addToCartHandler()}
    />
  );
};

export default AddCart;
