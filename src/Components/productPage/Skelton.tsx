import React from "react";

import Skeleton from "react-loading-skeleton";

const Skelton = () => {
  return (
    <div className="flex flex-col space-y-5 md:space-y-0 items-center md:flex-row w-full h-full">
      <div className="w-full md:w-1/2 h-full">
        <div className="flex flex-col-reverse md:flex-row w-full h-full justify-end md:space-x-5 ">
          <div className="w-full md:w-20">
            <Skeleton
              className="w-20 h-20 mt-5 md:mt-0"
              containerClassName="flex md:flex-col w-full h-full space-x-2 md:space-x-0"
              count={4}
            />
          </div>

          <Skeleton containerClassName="w-full h-96" className="h-full" />
        </div>
      </div>
      <div className="flex flex-col w-full md:w-1/2 h-full px-5 space-y-5">
        <Skeleton className="h-16" />
        <Skeleton count={5} className="h-10 mt-5" />
      </div>
    </div>
  );
};

export default Skelton;
