import { useState, useEffect } from "react";

const useGetFetch = (endPoint: string) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<undefined | string>(undefined);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + endPoint);

        if (response.ok) {
          const jsonData = await response.json();

          setData(jsonData);
        } else {
          throw new Error("Something went wrong, please try again later");
        }
        setIsLoading(false);
      } catch (error) {
        setError(error as string);
      }
    };

    fetchData();
  }, [endPoint, BASE_URL]);

  return { data, isLoading, error };
};

export default useGetFetch;
