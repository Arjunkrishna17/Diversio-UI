import React from "react";

interface props {
  children: React.ReactNode;
  callback: () => void;
}

const EnterHandler = ({ children, callback }: props) => {
  const keyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      callback();
    }
  };

  return (
    <div onKeyDown={keyDownHandler} className="content">
      {children}
    </div>
  );
};

export default EnterHandler;
