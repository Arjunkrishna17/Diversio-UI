import React from "react";

interface props {
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
}

const Input = ({ callback, type, name }: props) => {
  return (
    <input
      onChange={callback}
      name={name}
      type={type ? type : "text"}
      className="flex w-full h-fit text-xs  px-3 py-2 rounded-md border border-stone-300 shadow-inner outline-none"
    />
  );
};

export default Input;
