import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import { productTypes } from "../Dashboard/Products/Types";
import useFetchNew from "../../Hooks/useFetchNew";
import { GET_PRODUCTS } from "../../Config/Apis/ProductsAPIs";
import { ERROR_MSG } from "../../Config/Constants";
import ProductCard from "../Packages/ProductCard";
import Skeleton from "react-loading-skeleton";

const ProductSearch = () => {
  const [products, setProducts] = useState<productTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { httpRequest } = useFetchNew();

  const [queryParam] = useSearchParams();

  const searchKeyword = queryParam.get("key");

  const getProducts = useCallback(
    async (searchKey: string) => {
      setIsLoading(true);

      const requestConfig = {
        endPoint: GET_PRODUCTS + "?search=" + encodeURIComponent(searchKey),
      };

      const response = await httpRequest(requestConfig);

      if (response.success) {
        setProducts(response.data.content);
      } else if (response.error) {
        setError(response.error);
      } else {
        setError(ERROR_MSG);
      }

      setIsLoading(false);
    },
    [httpRequest]
  );

  useEffect(() => {
    if (searchKeyword) {
      getProducts(searchKeyword);
    }
  }, [getProducts, searchKeyword]);

  let body;

  if (isLoading) {
    body = (
      <>
        <Skeleton
          count={5}
          className="w-44 h-44 "
          containerClassName="flex flex-col  w-full h-full "
        />
      </>
    );
  } else if (error) {
    body = <p className="text-red-500 text-sm">{error}</p>;
  } else if (!products.length) {
    body = (
      <div className="flex w-full h-full justify-center items-center">
        <p className="text-xs bg-white px-5 py-3 text-center h-fit">
          Sorry, no products found! Please try again with a different search
          keyword.
        </p>
      </div>
    );
  } else {
    body = (
      <div className="grid grid-cols-5 gap-3">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  }

  return <div className="flex w-full h-full px-10 py-5">{body}</div>;
};

export default ProductSearch;
