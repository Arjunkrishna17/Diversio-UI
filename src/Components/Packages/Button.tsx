import React from "react";

interface buttonProps {
  type: "primary" | "secondary";
  text: string;
  callback: () => void;
}

const Button = ({ type, text, callback }: buttonProps) => {
  const primaryButton =
    "flex items-center justify-center font-semibold  px-5 py-2 rounded-md shadow-lg bg-orange-500 text-white hover:bg-orange-600 text-sm";

  const secondaryButton =
    "flex items-center justify-center font-semibold  px-5 py-2 rounded-md shadow-lg bg-secondaryButton text-white hover:bg-secondaryButtonHover text-sm";

  return (
    <button
      onClick={callback}
      className={type === "primary" ? primaryButton : secondaryButton}
    >
      {text}
    </button>
  );
};

export default Button;
