import { useState, useEffect } from "react";
import { BASE_URL } from "../Config/ProductsAPIs";

const useGetFetch = (endPoint: string) => {
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<undefined | string>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + endPoint);
        const jsonData = await response.json();

        if (response.ok) {
          setData(jsonData);
        } else {
          setError(jsonData);
        }
        setIsLoading(false);
      } catch (error) {
        setError(
          ("Something went wrong, please try again later, Error: " +
            error) as string
        );
      }
    };

    fetchData();
  }, [endPoint]);

  return { data, isLoading, error };
};

export default useGetFetch;
