import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/Header";
import Electronics from "./Components/Dashboard/Products/Electronics";
import ProductPage from "./Components/Dashboard/Products/ProductPage";

const App = () => {
  return (
    <div className="flex flex-col bg-body h-screen">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Electronics />} />
          <Route path="/products/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
