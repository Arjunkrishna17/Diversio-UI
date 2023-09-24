import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Bag } from "../../Images/Bag.svg";
import { ProductContext } from "../../Context/Product";
import { CART_ROUTE } from "../../Config/ProductRoutes";

const ShoppingCart = () => {
  const productCtx = useContext(ProductContext);
  const navigate = useNavigate();

  const cartCount = productCtx.cartProducts.length;

  const onClickHandler = () => {
    navigate(CART_ROUTE);
  };

  return (
    <button onClick={onClickHandler} className="relative">
      <Bag className="w-5 h-5 fill-black cursor-pointer" />
      <div className="absolute flex min-w-[1.25rem] min-h-[1.25rem] items-center justify-center text-xs rounded-full bg-orange-500 -right-3 -top-3 text-white ">
        {cartCount}
      </div>
    </button>
  );
};

export default ShoppingCart;
