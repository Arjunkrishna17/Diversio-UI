import React, { useMemo, useState, useRef, useCallback } from "react";
import { throttle } from "lodash";
import { AutoComplete, Input } from "antd";

import { ReactComponent as SearchIcon } from "../../Images/Search.svg";
import useFetchNew from "../../Hooks/useFetchNew";
import { PRODUCT_SEARCH } from "../../Config/Apis/ProductsAPIs";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CHECKOUT,
  PRODUCT_SEARCH_ROUTE,
} from "../../Config/RoutePoints/ProductRoutes";

interface options {
  value: string;
  label: string;
}

interface searchResult {
  title: string;
  _id: string;
}

const Search = () => {
  const { httpRequest } = useFetchNew();
  const [searchResult, setSearchResults] = useState<options[]>([]);
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const autoCompleteRef = useRef<any>(null);

  const getSearchResult = useCallback(
    async (search: string) => {
      const requestConfig = {
        endPoint: PRODUCT_SEARCH + "?search=" + search,
      };

      let options: options[] = [];

      const response = await httpRequest(requestConfig);

      if (response.success) {
        const searchResults = response.data;

        if (searchResults.length) {
          options = searchResults.map((result: searchResult) => {
            return { value: result.title };
          });

          setSearchResults(options);
        }
      }

      return options;
    },
    [httpRequest]
  );

  const fetchResult = useMemo(
    () =>
      throttle((search: string) => getSearchResult(search), 300, {
        leading: false,
        trailing: true,
      }),
    [getSearchResult]
  );

  const navigateToSearch = (text: string) => {
    navigate(PRODUCT_SEARCH_ROUTE + "?key=" + text);
  };

  const onSelectHandler = (text: string) => {
    navigateToSearch(text);
    autoCompleteRef.current.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      autoCompleteRef.current.blur();
      navigateToSearch(input);
    }
  };

  const isCheckoutPage = location.pathname.match(CHECKOUT);

  return (
    <div
      className={
        "flex relative max-w-[40rem]  grow-0  w-full  items-center bg-red" +
        (isCheckoutPage ? " invisible" : " visible")
      }
    >
      <AutoComplete
        ref={autoCompleteRef}
        style={{
          width: "100%",
          backgroundColor: "white",
          height: "2.5rem",
        }}
        options={searchResult}
        onChange={(text) => setInput(text)}
        onSearch={(text) => fetchResult(text)}
        onSelect={onSelectHandler}
        onKeyDown={(e) => onKeyDown(e)}
        value={input}
        bordered={false}
      >
        <Input
          prefix={<SearchIcon className="w-6 h-5 cursor-default " />}
          bordered={false}
          style={{
            width: "100%",
            height: "2.5rem",
            backgroundColor: "white",
          }}
          className="rounded-sm"
        />
      </AutoComplete>
    </div>
  );
};

export default Search;
