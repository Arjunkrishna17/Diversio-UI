import React from "react";

interface props {
  text: string;
}

const DetailsOnHover = ({ text }: props) => {
  return (
    <div className="absolute  bottom-12 shadow-md rounded-md z-10 hidden peer-hover:flex w-full bg-black text-white text-xs px-3 py-1">
      {text}
    </div>
  );
};

export default DetailsOnHover;
