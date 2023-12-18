import { useCallback, useContext } from "react";

import { BASE_URL } from "../Constants/Apis/ProductsAPIs";
import { AuthContext } from "../Context/Auth";

interface requestConfig {
  endPoint: string;
  method?: string;
  body?: Object;
  noTokenNeeded?: boolean;
}

const useFetchNew = () => {
  const authCtx = useContext(AuthContext);

  const httpRequest = useCallback(
    async (requestConfig: requestConfig) => {
      let header = {};
      let body = {};
      let data;
      let success = false;
      let error = "";

      let auth = {};

      if (!requestConfig.noTokenNeeded) {
        auth = { Authorization: "Bearer " + authCtx.token };
      }

      if (requestConfig.body) {
        header = {
          headers: { "Content-Type": "application/json", ...auth },
        };
      } else {
        header = { headers: auth };
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

        const contentType = response.headers.get("Content-Type");

        let jsonData;

        if (contentType && contentType.includes("application/json")) {
          jsonData = await response.json();
        }

        if (response.ok) {
          data = jsonData;
          success = true;
        } else {
          error = jsonData;
        }
      } catch (err) {
        error = "Something went wrong!, please try again later.";
      }

      return { data: data, success: success, error: error };
    },
    [authCtx.token]
  );

  return {
    httpRequest: httpRequest,
  };
};

export default useFetchNew;
