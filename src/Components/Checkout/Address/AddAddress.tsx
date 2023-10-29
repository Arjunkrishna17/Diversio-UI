import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import Button from "../../Packages/Button";
import { ADDRESS_API } from "../../../Config/Apis/ProductsAPIs";
import useFetchNew from "../../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../../Config/Constants";
import { address } from "../Type";

interface props {
  callback: (address: address, closeAddress: boolean) => void;
  editAddress: address | undefined;
}

const AddAddress = ({ callback, editAddress }: props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { httpRequest } = useFetchNew();

  const inputDetails1 = [
    { label: "Full Name", name: "fullName", type: "text" },
    { label: "Mobile Number", name: "mobileNumber", type: "number" },
    { label: "Pin Code", name: "pincode", type: "number" },
    { label: "Flat No", name: "address1", type: "text" },
  ];

  const inputDetails2 = [
    { label: "City", name: "city", type: "text" },
    { label: "State", name: "state", type: "text" },
    {
      label: "Landmark",
      name: "landmark",
      type: "text",
    },
  ];

  const validation = Yup.object().shape({
    fullName: Yup.string().required("Please enter your name"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Please enter your mobile number"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "pin code must be 6 digits")
      .required("Please enter your pin code"),
    address1: Yup.string().required("Please enter your flat no."),
    address2: Yup.string().required("Please enter your address"),
    city: Yup.string().required("Please enter your city"),
    state: Yup.string().required("Please enter your state"),
    landmark: Yup.string().required("Please enter your landmark"),
  });

  const onSubmit = () => {
    addAddress();
  };

  let { values, handleSubmit, handleChange, errors, touched } = useFormik({
    initialValues: {
      fullName: editAddress ? editAddress.fullName : "",
      mobileNumber: editAddress ? editAddress.mobileNumber : "",
      address1: editAddress ? editAddress.address1 : "",
      address2: editAddress ? editAddress.address2 : "",
      pincode: editAddress ? editAddress.pincode : "",
      city: editAddress ? editAddress.city : "",
      state: editAddress ? editAddress.state : "",
      landmark: editAddress ? editAddress.landmark : "",
      default: editAddress ? editAddress.default : false,
    },
    onSubmit,
    validationSchema: validation,
    validateOnBlur: true,
    validateOnMount: false,
  });

  const addAddress = async () => {
    setIsLoading(true);
    const requestConfig = {
      endPoint: ADDRESS_API + (editAddress ? "?id=" + editAddress?._id : ""),
      method: editAddress ? "PUT" : "POST",
      body: values,
    };

    const response = await httpRequest(requestConfig);

    if (response.success) {
      editAddress
        ? callback(response.data, true)
        : callback(response.data, false);
    } else if (response.error) {
      setError(response.error);
    } else {
      setError(ERROR_MSG);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col space-y-2 ">
      <h4 className="font-semibold px-5 pb-3">Add Address</h4>
      <div className="grid grid-cols-2 gap-x-5 gap-y-2 items-center px-5">
        {inputDetails1.map((data, i) => (
          <div
            key={data.name}
            className="flex flex-col justify-center space-y-1 "
          >
            <label htmlFor={data.name} className="text-xs">
              {data.label}
            </label>
            <input
              autoFocus={i === 0}
              onChange={handleChange}
              value={values[data.name as keyof typeof values].toString()}
              name={data.name}
              className="border  h-10 bg-white outline-blue-500 px-2 py-2 shadow-inner"
            />
            {touched[data.name as keyof typeof touched] &&
              errors[data.name as keyof typeof errors] && (
                <p className="text-xs text-red-500">
                  {errors[data.name as keyof typeof errors]}
                </p>
              )}
          </div>
        ))}
      </div>
      <div className="mx-5">
        <label htmlFor="address" className="text-xs">
          Address
        </label>
        <textarea
          name="address2"
          value={values.address2}
          onChange={handleChange}
          className="border h-20 w-full outline-blue-500 px-2 py-2 shadow-inner"
        />
        {touched.address2 && errors.address2 && (
          <p className="text-xs text-red-500">{errors.address2}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-2 items-center px-5">
        {inputDetails2.map((data) => (
          <div
            key={data.name}
            className="flex flex-col justify-center space-y-1 "
          >
            <label htmlFor={data.name} className="text-xs">
              {data.label}
            </label>
            <input
              onChange={handleChange}
              value={values[data.name as keyof typeof values].toString()}
              name={data.name}
              className="border text-sm h-10 bg-white outline-blue-500 px-2 py-2 shadow-inner   "
            />
            {touched[data.name as keyof typeof touched] &&
              errors[data.name as keyof typeof errors] && (
                <p className="text-xs text-red-500">
                  {errors[data.name as keyof typeof errors]}
                </p>
              )}
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 text-xs mx-5">
        <input
          name="default"
          checked={values.default}
          onChange={handleChange}
          type="checkbox"
        />
        <span>Make this as default address</span>
      </div>
      <div className="mx-5 pt-6">
        <Button
          type="primary"
          text={editAddress ? "Save this address" : "Save and use this address"}
          callback={() => handleSubmit()}
          isLoading={isLoading}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default AddAddress;
