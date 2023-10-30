import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";

import { ReactComponent as LoginSvg } from "../../Images/Login.svg";
import Input from "../Packages/Input";
import Button from "../Packages/Button";
import useFetch from "../../Hooks/useFetch";
import { AuthContext } from "../../Context/Auth";
import { LOGIN_API } from "../../Config/Apis/CommonAPIs";
import { CREATE_ACCOUNT, LOGIN } from "../../Config/RoutePoints/commonEndpoints";
import CreateAccount from "./CreateAccount";
import EnterHandler from "../Packages/EnterHandler";
import { HOME } from "../../Config/RoutePoints/ProductRoutes";


interface loginValues {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    isLoading,
    error,
    httpRequest: fetchData,
  } = useFetch({ loading: false });

  const authContext = useContext(AuthContext);

  console.log(location.state);

  const signIn = async (values: loginValues) => {
    const requestConfig = {
      endPoint: LOGIN_API,
      body: values,
      method: "POST",
    };

    const response = await fetchData(requestConfig);

    if (response.data) {
      authContext.loginHandler(response.data);

      //If redirect is true, need to take back to the prev user url
      if (location.state && location.state.redirect) {
        navigate(-1);
      }

      if (location.pathname === LOGIN) {
        //In initial login user will be redirected to home page not when token expired

        navigate(HOME);
      }
    }
  };

  const validation = Yup.object().shape({
    username: Yup.string().required("Please enter your email address"),
    password: Yup.string().required("Please enter your password"),
  });

  const submitHandler = () => {
    signIn(values);
  };

  let { values, touched, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submitHandler,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const inputs = [
    { name: "Email Address", inputName: "username", type: "text" },
    { name: "Password", inputName: "password", type: "password" },
  ];

  let body;

  if (location.pathname === CREATE_ACCOUNT) {
    body = <CreateAccount />;
  } else {
    body = (
      <EnterHandler callback={() => handleSubmit()}>
        <div className="flex flex-col space-y-8 ">
          <h1 className="font-bold text-lg">Login</h1>

          <div className="flex flex-col space-y-5">
            {inputs.map((inputData) => (
              <div
                key={inputData.inputName}
                className="flex flex-col  space-y-1   "
              >
                <h6 className="text-sm">{inputData.name}</h6>
                <Input
                  name={inputData.inputName}
                  callback={handleChange}
                  type={inputData.inputName}
                />
                {touched[inputData.inputName as keyof typeof touched] &&
                  errors[inputData.inputName as keyof typeof errors] && (
                    <p className="text-xs text-red-500">
                      {errors[inputData.inputName as keyof typeof errors]}
                    </p>
                  )}
              </div>
            ))}

            <div className="flex items-center justify-between text-sm">
              <div>
                <Button
                  text="Login"
                  type="primary"
                  callback={() => handleSubmit()}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex pt-5 w-full">
            <button
              onClick={() => {
                navigate(CREATE_ACCOUNT);
              }}
              className="flex w-full justify-center text-center bg-gray-50 hover:bg-gray-100 px-5 py-2  rounded-md text-sm border"
            >
              <span>Create an Account</span>
            </button>
          </div>

          <p className="text-xs text-red-500">{error && error}</p>
        </div>
      </EnterHandler>
    );
  }

  return (
    <div className="flex justify-center w-full h-full py-10 px-10 lg:px-40 xl:px-72 ">
      <div className="md:grid md:grid-cols-2 border shadow-lg w-96  md:w-full h-full bg-white">
        <div className=" hidden md:flex flex-col space-y-5 items-center h-full pb-2 ">
          <LoginSvg className="w-full h-full " />
          <div className="flex text-xs ">
            <a href="https://www.freepik.com/free-vector/online-shopping-concept-landing-page_5358350.htm#query=ecommerce&position=2&from_view=search&track=sph">
              Image by pikisuperstar
            </a>
            <span>on Freepik</span>
          </div>
        </div>

        <div className="flex flex-col justify-center w-full h-full space-y-10 px-10 py-8">
          {body}
        </div>
      </div>
    </div>
  );
};

export default Login;
