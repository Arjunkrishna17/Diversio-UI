import React from "react";

interface props {
  text: string;
  styles?: string;
}

const DetailsOnHover = ({ text, styles }: props) => {
  return (
    <div
      className={
        "absolute  shadow-md rounded-md z-10 hidden peer-hover:flex w-full bg-black text-white text-xs px-3 py-1 " +
          styles || " bottom-12"
      }
    >
      {text}
    </div>
  );
};

export default DetailsOnHover;
