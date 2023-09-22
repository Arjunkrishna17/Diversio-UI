import { useState, useEffect } from "react";

const useGetFetch = (endPoint: string) => {
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<undefined | string>(undefined);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
  }, [endPoint, BASE_URL]);

  return { data, isLoading, error };
};

export default useGetFetch;
