import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header";
import Electronics from "./Components/Dashboard/Products/Electronics";
import ProductPage from "./Components/productPage/ProductPage";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import { CREATE_ACCOUNT, LOGIN } from "./Config/commonEndpoints";
import { HOME, PRODUCT_PAGE } from "./Config/ProductRoutes";
import { CART } from "./Config/LocStorage";

const App = () => {
  return (
    <div className="flex flex-col  relative bg-body h-screen overflow-x-hidden ">
      <BrowserRouter>
        <Header />

        <div className="grow">
          <Routes>
            <Route path={LOGIN} element={<Login />} />
            <Route path={CREATE_ACCOUNT} element={<Login />} />
            <Route path={HOME} element={<Electronics />} />
            <Route path={PRODUCT_PAGE + "/:id"} element={<ProductPage />} />
            <Route path={CART} element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
