import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Electronics from "./Components/Dashboard/Electronics";

const App = () => {
  return (
    <div className="flex flex-col bg-body h-screen">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Electronics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
