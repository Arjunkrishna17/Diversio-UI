import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

import { CART } from "../Config/LocStorage";
import { savedProducts } from "../Components/Constants/Types";
import { AuthContext } from "./Auth";
import useFetchNew from "../Hooks/useFetchNew";
import { CART_PRODUCTS } from "../Config/Apis/ProductsAPIs";
import { ERROR_MSG } from "../Config/Constants";

interface productCtx {
  children: React.ReactNode;
}

interface productInitial {
  products: savedProducts[] | [];
  addProduct: (product: savedProducts, addBy?: number) => void;
  subtractQty: (id: string) => void;
  removeProduct: (id: string) => void;
  getProducts: () => void;
  error: string;
  isLoading: boolean;
}

export const ProductContext = createContext<productInitial>({
  products: [],
  addProduct: (product: savedProducts, addBy?: number) => {},
  subtractQty: (id: string) => {},
  removeProduct: (id: string) => {},
  getProducts: () => {},
  error: "",
  isLoading: false,
});

let isInitialRender = true;

export const ProductProvider = ({ children }: productCtx) => {
  const authCtx = useContext(AuthContext);

  const [tempCartProducts, setTempCartProducts] = useState<savedProducts[]>([]);

  const [isLoading, setIsLoading] = useState(authCtx.loggedIn ? true : false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState<savedProducts[]>(tempCartProducts);

  const { httpRequest } = useFetchNew();

  const getProducts = useCallback(async () => {
    const requestConfig = {
      endPoint: CART_PRODUCTS,
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      //combine products only in initial render
      if (isInitialRender) {
        setProducts((existingProduct) => {
          return [...existingProduct, ...response.data];
        });

        isInitialRender = false;
      } else {
        setProducts(response.data);
      }
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }

    setIsLoading(false);
  }, [httpRequest]);

  useEffect(() => {
    if (authCtx.loggedIn) {
      getProducts();
    }
  }, [authCtx.loggedIn, getProducts]);

  const uploadCartProducts = useCallback(async () => {
    const requestConfig = {
      endPoint: CART_PRODUCTS,
      method: "POST",
      body: tempCartProducts,
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      localStorage.removeItem(CART);
    }
  }, [httpRequest, tempCartProducts]);

  useEffect(() => {
    if (authCtx.loggedIn && tempCartProducts.length) {
      uploadCartProducts();
    }
  }, [uploadCartProducts, authCtx.loggedIn, tempCartProducts.length]);

  const updateCart = () => {
    const products = localStorage.getItem(CART);
    if (products) {
      const parsedProducts = JSON.parse(products);
      setTempCartProducts(parsedProducts);
    }
  };

  const addToLocalStorage = (data: string) => {
    localStorage.setItem(CART, data);
    updateCart();
  };

  const checkExistingProd = (productId: string) => {
    const indexOfProduct = tempCartProducts.length
      ? tempCartProducts.findIndex((product) => product.productId === productId)
      : -1;

    return indexOfProduct;
  };

  const addProduct = (product: savedProducts, addBy = 1) => {
    let newProducts = [...tempCartProducts];

    const indexOfProduct = checkExistingProd(product.productId);
    if (indexOfProduct !== -1) {
      newProducts[indexOfProduct].quantity += addBy;
    } else {
      newProducts.push(product);
    }

    addToLocalStorage(JSON.stringify(newProducts));
  };

  const subtractQty = (selectedProductId: string) => {
    const indexOfProduct = checkExistingProd(selectedProductId);
    let newProducts = [...tempCartProducts];

    newProducts[indexOfProduct].quantity -= 1;

    addToLocalStorage(JSON.stringify(newProducts));
  };

  const removeProduct = (selectedProductId: string) => {
    const newProducts = tempCartProducts.filter(
      (product) => product.productId !== selectedProductId
    );

    addToLocalStorage(JSON.stringify(newProducts));
  };

  useEffect(() => {
    updateCart();
  }, []);

  const context = {
    products: authCtx.loggedIn ? products : tempCartProducts,
    addProduct: addProduct,
    subtractQty: subtractQty,
    removeProduct: removeProduct,
    getProducts: getProducts,
    error: error,
    isLoading: isLoading,
  };

  return (
    <ProductContext.Provider value={context}>
      {children}
    </ProductContext.Provider>
  );
};
