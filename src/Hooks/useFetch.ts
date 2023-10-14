import { useState, useCallback } from "react";
import { BASE_URL } from "../Config/ProductsAPIs";

interface requestConfig {
  endPoint: string;
  method?: string;
  body?: Object;
}

interface props {
  initialLoadingOnly?: boolean;
  loading?: boolean;
}

const useFetch = ({ initialLoadingOnly = false, loading = true }: props) => {
  const [isLoading, setIsLoading] = useState(loading);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>(undefined);

  const fetchData = useCallback(
    async (requestConfig: requestConfig) => {
      let header = {};
      let body = {};
      let jsonData;

      if (!initialLoadingOnly) {
        setIsLoading(true);
      }

      setError("");

      if (requestConfig.body) {
        header = requestConfig.body
          ? { headers: { "Content-Type": "application/json" } }
          : "";
      }

      if (requestConfig.body) {
        body = { body: JSON.stringify(requestConfig.body) };
      }

      try {
        const response = await fetch(BASE_URL + requestConfig.endPoint, {
          method: requestConfig.method || "GET",
          ...header,
          ...body,
        });

        const data = await response.json();

        if (response.ok) {
          setData(data);
          jsonData = data;
        } else {
          setData(undefined);
          setError(data);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Something went wrong!, please try again later.");
      }

      return { data: jsonData };
    },
    [initialLoadingOnly]
  );

  return { data: data, error: error, isLoading: isLoading, fetchData };
};

export default useFetch;
