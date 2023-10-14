import React from "react";

interface props {
  callback: (input: string) => void;
}

const Input = ({ callback }: props) => {
  return (
    <input
      onChange={(e) => callback(e.target.value)}
      type="text"
      className="flex w-full h-fit text-xs  px-3 py-2 rounded-md border border-stone-300 shadow-inner outline-none"
    />
  );
};

export default Input;
