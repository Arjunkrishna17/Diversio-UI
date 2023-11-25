import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Components/Header/Header";
import ProductSection from "./Components/Products/ProductSection";
import ProductPage from "./Pages/ProductPage";
import Cart from "./Components/Cart/Cart";
import Login from "./Pages/Login/Login";
import { CREATE_ACCOUNT, LOGIN } from "./Constants/RoutePoints/commonEndpoints";
import {
  CHECKOUT,
  HOME,
  PRODUCT_PAGE,
  PRODUCT_SEARCH_ROUTE,
} from "./Constants/RoutePoints/ProductRoutes";
import { CART } from "./Config/LocStorage";
import { AuthContext } from "./Context/Auth";
import Checkout from "./Pages/Checkout";
import { ORDER_SUCCESS_PAGE } from "./Constants/RoutePoints/Orders";
import OrderSuccess from "./Components/Checkout/OrderSuccess";
import NotFound from "./Utils/NotFound";
import ProductSearch from "./Components/Products/ProductSearch";
import Dashboard from "./Pages/Dashboard";

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

            <Route path={HOME} element={<Dashboard />} />

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

            <Route path={PRODUCT_SEARCH_ROUTE} element={<ProductSearch />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
