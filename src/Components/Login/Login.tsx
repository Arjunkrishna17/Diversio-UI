import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as LoginSvg } from "../../Images/Login.svg";
import Input from "../Packages/Input";
import Button from "../Packages/Button";
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Context/Auth";
import { LOGIN_API } from "../../Config/CommonAPIs";
import { HOME } from "../../Config/ProductRoutes";
import { LOGIN } from "../../Config/commonEndpoints";

const Login = () => {
  const [loginValues, setLoginValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoading, error, fetchData } = useFetch({ loading: false });

  const authContext = useContext(AuthContext);

  const signIn = async () => {
    const requestConfig = {
      endPoint: LOGIN_API,
      body: loginValues,
      method: "POST",
    };

    const response = await fetchData(requestConfig);

    if (response.data) {
      authContext.loginHandler(response.data);

      //In initial login user will be redirected to home page not when token expired

      if (location.pathname === LOGIN) {
        navigate(HOME);
      }
    }
  };

  return (
    <div className="flex w-full h-full py-10 px-10 lg:px-40 xl:px-72 ">
      <div className="grid grid-cols-2 border shadow-lg  w-full h-full bg-white">
        <div className="flex flex-col space-y-5 items-center h-full pb-2">
          <LoginSvg className="w-full h-full " />
          <div className="flex text-xs ">
            <a href="https://www.freepik.com/free-vector/online-shopping-concept-landing-page_5358350.htm#query=ecommerce&position=2&from_view=search&track=sph">
              Image by pikisuperstar
            </a>
            <span>on Freepik</span>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full h-full space-y-10 p-10">
          <h1 className="font-bold text-lg">Login</h1>

          <div className="flex flex-col space-y-5">
            <div className="flex flex-col  space-y-1   ">
              <h6 className="text-sm">Email/Mobile number</h6>
              <Input
                callback={(input) =>
                  setLoginValues((values) => {
                    return { ...values, username: input };
                  })
                }
              />
            </div>
            <div className="flex flex-col space-y-1">
              <h6 className="text-sm">Password</h6>
              <Input
                callback={(input) =>
                  setLoginValues((values) => {
                    return { ...values, password: input };
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex space-x-1 items-center">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <button className="text-purple-500">Forgot Password</button>
            </div>

            <div>
              <Button
                text="Login"
                type="primary"
                callback={signIn}
                isLoading={isLoading}
              />
            </div>
          </div>

          <div className="flex pt-5 w-full">
            <button className="flex w-full justify-center text-center bg-gray-50 hover:bg-gray-100 px-5 py-2  rounded-md text-sm border">
              <span>Create an Account</span>
            </button>
          </div>

          <p className="text-xs text-red-500">{error && error}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
