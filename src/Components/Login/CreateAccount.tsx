import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import Button from "../Packages/Button";
import useFetch from "../../Hooks/useFetch";
import { CREATE_ACCOUNT } from "../../Config/CommonAPIs";
import { AuthContext } from "../../Context/Auth";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../Config/ProductRoutes";
import EnterHandler from "../Packages/EnterHandler";
import { LOGIN } from "../../Config/commonEndpoints";

interface userInfo {
  user: string;
  username: string;
  password: string;
  mobileNumber: string;
}

const CreateAccount = () => {
  const { error, isLoading, fetchData } = useFetch({ loading: false });
  const [showSuccess, setShowSuccess] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const createAccount = async (userInfo: userInfo) => {
    const requestConfig = {
      endPoint: CREATE_ACCOUNT,
      method: "POST",
      body: userInfo,
    };

    const response = await fetchData(requestConfig);

    if (response.data) {
      authCtx.loginHandler(response.data);

      setShowSuccess(true);

      const timerId = setTimeout(() => {
        setShowSuccess(true);
        navigate(HOME);

        clearTimeout(timerId);
      }, 800);
    }
  };

  const onSubmit = () => {
    createAccount(values);
  };

  const validation = Yup.object().shape({
    user: Yup.string().required("Please Enter your name"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Please enter your mobile number"),
    username: Yup.string().required("Please enter your email adress"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Please enter your password"),
  });

  let { values, touched, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      user: "",
      username: "",
      password: "",
      mobileNumber: "",
    },
    onSubmit: onSubmit,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const inputs = [
    { name: "Name", inputName: "user", type: "text" },
    { name: "Email Address", inputName: "username", type: "text" },
    { name: "Mobile Number", inputName: "mobileNumber", type: "text" },
    { name: "Password", inputName: "password", type: "password" },
  ];

  return (
    <EnterHandler callback={() => handleSubmit()}>
      <div className="flex flex-col space-y-5">
        <h1 className="font-bold text-lg">Create Account</h1>

        <div className="flex flex-col space-y-5">
          {inputs.map((inputData) => (
            <div className="flex flex-col  space-y-1  text-xs ">
              <h6 className="text-sm">{inputData.name}</h6>
              <input
                type={inputData.type}
                name={inputData.inputName}
                onChange={handleChange}
                className="flex w-full h-fit text-xs  px-3 py-2 rounded-md border border-stone-300 shadow-inner outline-none"
              />
              {touched[inputData.inputName as keyof typeof touched] &&
                errors[inputData.inputName as keyof typeof errors] && (
                  <p className="text-xs text-red-500">
                    {errors[inputData.inputName as keyof typeof errors]}
                  </p>
                )}
            </div>
          ))}

          <div>
            <Button
              text="Create"
              type="primary"
              isLoading={isLoading}
              callback={() => handleSubmit()}
            />
          </div>
        </div>

        {error && <p className="w-full text-xs text-red-500">{error}</p>}

        {showSuccess && (
          <p className="text-xs bg-green-100 px-5 py-1 w-fit">
            Your account has been created successfully.
          </p>
        )}

        <div className="flex w-full text-xs space-x-1">
          <p>Already have an account?</p>
          <button onClick={() => navigate(LOGIN)} className="text-blue-500">
            Login
          </button>
        </div>
      </div>
    </EnterHandler>
  );
};

export default CreateAccount;
