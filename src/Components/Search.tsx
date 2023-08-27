import React from "react";

import { ReactComponent as SearchIcon } from "../Images/Search.svg";

const Search = () => {
  return (
    <div className="flex w-full relative justify-center items-center max-w-2xl">
      <input type="text" className="searchBar " />
      <SearchIcon className="w-5 h-5 absolute right-5 hover:fill-orange-500 cursor-pointer"/>
    </div>
  );
};

export default Search;
