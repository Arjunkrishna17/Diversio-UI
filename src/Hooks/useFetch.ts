import { useState, useCallback } from "react";
import { BASE_URL } from "../Config/ProductsAPIs";

interface requestConfig {
  endPoint: string;
  method?: "GET" | "PUT" | "DELETE" | "POST";
  body?: Object;
}

const useFetch = (initialLoadingOnly = false) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const fetchData = useCallback(
    async (requestConfig: requestConfig) => {
      let header = {};
      let body = {};

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
        } else {
          setData([]);
          setError(data);
        }
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError("Something went wrong!, please try again later.");
      }
    },
    [initialLoadingOnly]
  );

  return { data: data, error: error, isLoading: isLoading, fetchData };
};

export default useFetch;
