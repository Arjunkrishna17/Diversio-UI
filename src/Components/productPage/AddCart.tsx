import React, { useContext, useState } from "react";

import Button from "../Packages/Button";
import { productTypes } from "../Dashboard/Products/Types";
import { ProductContext } from "../../Context/Product";

interface addCartProps {
  product: productTypes;
}

const AddCart = ({ product }: addCartProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const productCtx = useContext(ProductContext);

  const addToCartHandler = (productId: string) => {
    setIsLoading(true);

    const timeId = setTimeout(() => {
      productCtx.addProduct(productId);
      setIsLoading(false);
      clearTimeout(timeId);
    }, 500);
  };

  return (
    <Button
      text="ADD TO CART"
      type="secondary"
      isLoading={isLoading}
      callback={() => addToCartHandler(product._id)}
    />
  );
};

export default AddCart;
