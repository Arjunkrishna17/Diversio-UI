import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header";
import Electronics from "./Components/Dashboard/Products/Electronics";
import ProductPage from "./Components/productPage/ProductPage";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import { CREATE_ACCOUNT, LOGIN } from "./Config/RoutePoints/commonEndpoints";
import {
  CHECKOUT,
  HOME,
  PRODUCT_PAGE,
} from "./Config/RoutePoints/ProductRoutes";
import { CART } from "./Config/LocStorage";
import { AuthContext } from "./Context/Auth";
import Checkout from "./Components/Checkout/Checkout";
import { ORDER_SUCCESS_PAGE } from "./Config/RoutePoints/Orders";
import OrderSuccess from "./Components/Checkout/OrderSuccess";

const App = () => {
  const authCtx = useContext(AuthContext);

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
            <Route
              path={CHECKOUT}
              element={authCtx.loggedIn ? <Checkout /> : <Login />}
            />
            <Route
              path={ORDER_SUCCESS_PAGE}
              element={authCtx.loggedIn ? <OrderSuccess /> : <Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
