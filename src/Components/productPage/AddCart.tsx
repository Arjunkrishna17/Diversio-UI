import React from "react";

import Button from "../Packages/Button";
import { productTypes } from "../Dashboard/Products/Types";
import { CART } from "../../Config/LocStorage";

interface addCartProps {
  product: productTypes;
}

interface savedProducts {
  id: string;
  quantity: number;
}

const AddCart = ({ product }: addCartProps) => {
  const addToLocalStorage = (data: string) => {
    localStorage.setItem(CART, data);
  };

  const existingProductHandler = (
    product: string,
    selectedProductId: string
  ) => {
    let cartProductParsed = (JSON.parse(product) as savedProducts[]) || [];

    if (cartProductParsed.length) {
      const indexOfProduct = cartProductParsed.findIndex(
        (product) => product.id === selectedProductId
      );

      if (indexOfProduct !== -1) {
        cartProductParsed[indexOfProduct].quantity += 1;
      } else {
        cartProductParsed.push({ id: selectedProductId, quantity: 1 });
      }

      addToLocalStorage(JSON.stringify(cartProductParsed));
    }
  };

  const addToCartHandler = (productId: string) => {
    const cartProductString = localStorage.getItem("cart");

    if (cartProductString) {
      existingProductHandler(cartProductString, productId);
    } else {
      const newProduct = JSON.stringify([{ id: productId, quantity: 1 }]);
      addToLocalStorage(newProduct);
    }
  };

  return (
    <Button
      text="ADD TO CART"
      type="secondary"
      callback={() => addToCartHandler(product._id)}
    />
  );
};

export default AddCart;
