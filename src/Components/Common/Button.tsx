import React from "react";

import { ReactComponent as Spinner } from "../../Assets/Images/Spinner.svg";

interface buttonProps {
  type: "primary" | "secondary";
  text: string;
  callback: () => void;
  isLoading?: boolean;
}

const Button = ({ type, text, callback, isLoading }: buttonProps) => {
  const primaryButton =
    "flex items-center justify-center min-w-[8rem]   px-5 py-2  shadow-lg bg-orange-500 text-white hover:bg-orange-600 text-sm disabled:opacity-60";

  const secondaryButton =
    "flex items-center justify-center min-w-[8rem] px-5 py-2 shadow-lg bg-secondaryButton text-white hover:bg-secondaryButtonHover text-sm disabled:opacity-60";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        callback();
      }}
      className={type === "primary" ? primaryButton : secondaryButton}
      disabled={isLoading}
    >
      {isLoading !== undefined ? (
        isLoading ? (
          <Spinner className="w-5 h-5 fill-blue-500 animate-spin" />
        ) : (
          text
        )
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
