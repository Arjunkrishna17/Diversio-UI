import React from "react";

import { productTypes } from "../Dashboard/Products/Types";

interface detailsProps {
  data: productTypes;
}

const Details = ({ data }: detailsProps) => {
  const specifications = (title: string, value: string) => {
    return (
      <div
        key={title}
        className="grid grid-cols-[10rem_auto] space-x-2 text-xs"
      >
        <h6>{title}</h6>
        <span>: {value}</span>
      </div>
    );
  };
  return (
    <div className="h-full space-y-5  lg:w-1/2 px-5 py-5 bg-white">
      <h2 className="md:text-lg ">{data.title}</h2>
      <div className="flex space-x-1 text-xl font-semibold">
        <span>₹</span>
        <span>{data.price}</span>
      </div>

      <div className="flex flex-col h-full space-y-3">
        <div className="flex items-center space-x-5">
          <h4 className="font-bold text-sm md:text-base">Specifications</h4>
        </div>

        <div className={`flex flex-col space-y-3`}>
          {Object.keys(data.specifications).map((specs) => (
            <div key={specs} className="flex flex-col space-y-3">
              {typeof data.specifications[specs] !== "object" ? (
                specifications(specs, data.specifications[specs])
              ) : (
                <>
                  <h2 className="font-bold text-xs md:ext-sm">{specs}</h2>
                  <div className="flex flex-col space-y-2">
                    {Object.keys(data.specifications[specs]).map((spec) =>
                      specifications(spec, data.specifications[specs][spec])
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
