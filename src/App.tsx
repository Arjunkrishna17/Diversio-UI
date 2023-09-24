import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header";
import Electronics from "./Components/Dashboard/Products/Electronics";
import ProductPage from "./Components/productPage/ProductPage";
import Cart from "./Components/Packages/Cart/Cart";

const App = () => {
  return (
    <div className="flex flex-col  relative bg-body h-screen overflow-x-hidden ">
      <BrowserRouter>
        <Header />

        <div className="grow">
          <Routes>
            <Route path="/" element={<Electronics />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
