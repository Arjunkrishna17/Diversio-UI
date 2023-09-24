import React, { useState, useEffect, createContext } from "react";

import { CART } from "../Config/LocStorage";
import { savedProducts } from "../Components/Constants/Types";

interface productCtx {
  children: React.ReactNode;
}

interface productInitial {
  cartProducts: savedProducts[] | [];
  addProduct: (id: string, addBy?: number) => void;
  subtractQty: (id: string) => void;
  removeProduct: (id: string) => void;
}

export const ProductContext = createContext<productInitial>({
  cartProducts: [],
  addProduct: (id: string, addBy?: number) => {},
  subtractQty: (id: string) => {},
  removeProduct: (id: string) => {},
});

export const ProductProvider = ({ children }: productCtx) => {
  const [cartProducts, setCartProducts] = useState<savedProducts[]>([]);

  const updateCart = () => {
    const products = localStorage.getItem(CART);
    if (products) {
      const parsedProducts = JSON.parse(products);
      setCartProducts(parsedProducts);
    }
  };

  const addToLocalStorage = (data: string) => {
    localStorage.setItem(CART, data);
    updateCart();
  };

  const checkExistingProd = (productId: string) => {
    const indexOfProduct = cartProducts.length
      ? cartProducts.findIndex((product) => product.id === productId)
      : -1;

    return indexOfProduct;
  };

  const addProduct = (selectedProductId: string, addBy = 1) => {
    let newProducts = [...cartProducts];

    const indexOfProduct = checkExistingProd(selectedProductId);
    if (indexOfProduct !== -1) {
      newProducts[indexOfProduct].quantity += addBy;
    } else {
      newProducts.push({ id: selectedProductId, quantity: addBy });
    }

    addToLocalStorage(JSON.stringify(newProducts));
  };

  const subtractQty = (selectedProductId: string) => {
    const indexOfProduct = checkExistingProd(selectedProductId);
    let newProducts = [...cartProducts];

    newProducts[indexOfProduct].quantity -= 1;

    addToLocalStorage(JSON.stringify(newProducts));
  };

  const removeProduct = (selectedProductId: string) => {
    const newProducts = cartProducts.filter(
      (product) => product.id !== selectedProductId
    );

    addToLocalStorage(JSON.stringify(newProducts));
  };

  useEffect(() => {
    updateCart();
  }, []);

  const context = {
    cartProducts: cartProducts,
    addProduct: addProduct,
    subtractQty: subtractQty,
    removeProduct: removeProduct,
  };

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};
