import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import Skeleton from "react-loading-skeleton";

import useFetchNew from "../../../Hooks/useFetchNew";
import { ERROR_MSG } from "../../../Config/Constants";
import { ADDRESS_API } from "../../../Config/Apis/ProductsAPIs";
import AddAddress from "./AddAddress";
import Button from "../../Packages/Button";
import { ReactComponent as Tick } from "../../../Images/Tick.svg";
import { address } from "../Type";

interface props {
  callback: (addressId: string) => void;
}

const Address = ({ callback }: props) => {
  const [address, setAddress] = useState<address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<address>();
  const [showAddress, setShowAddress] = useState(true);
  const [editAddress, setEditAddress] = useState<address>();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  const { httpRequest } = useFetchNew();

  const getAddress = useCallback(
    async (needSelectedAddress = true) => {
      const requestConfig = { endPoint: ADDRESS_API };

      const response = await httpRequest(requestConfig);

      if (response.success) {
        setAddress(response.data);
        const address = response.data.find(
          (address: address) => address.default
        );

        if (needSelectedAddress) setSelectedAddress(address); // this is only required on initial render

        setError("");
      } else if (response.error) {
        setError(response.error);
      } else {
        setError(ERROR_MSG);
      }
      setIsLoading(false);
    },
    [httpRequest]
  );

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const addAddressCallback = (address: address, showAddress: boolean) => {
    setShowAddAddress(false);
    getAddress(false);
    setEditAddress(undefined);
    setSelectedAddress(address);
    setShowAddress(showAddress);
  };

  const addressButtonHandler = () => {
    setShowAddress(false);
    if (selectedAddress) callback(selectedAddress._id);
  };

  const onChangeAddress = (address: address) => {
    setSelectedAddress(address);
  };

  const editHandler = (address: address) => {
    setEditAddress(address);
    setShowAddAddress(true);
  };

  let body;

  if (isLoading) {
    body = (
      <Skeleton
        count={5}
        containerClassName="w-full h-full space-y-5 px-5"
        className="h-12"
      />
    );
  } else if (error) {
    body = <p className="text-xs text-red-500 px-5">{error}</p>;
  } else {
    body = (
      <div className="flex flex-col space-y-5 pb-5">
        {address.length &&
          address.map((value: address) => (
            <div key={value._id} className="flex px-5">
              <div
                onClick={() => onChangeAddress(value)}
                className={`flex cursor-pointer group w-full items-center justify-between  py-2 md:py-0 shadow-sm border px-5 ${
                  showAddAddress
                    ? ""
                    : value._id === selectedAddress?._id && " bg-orange-50"
                } `}
              >
                <div className="flex w-full items-center">
                  <input
                    onChange={() => onChangeAddress(value)}
                    type="radio"
                    checked={
                      showAddAddress
                        ? false
                        : value._id === selectedAddress?._id
                    }
                    className="cursor-pointer"
                  />

                  <div className="flex flex-col justify-center px-5 min-h-[5rem]">
                    <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 space-x-0 md:space-x-2 md:items-center ">
                      <h4 className="font-bold">{value.fullName}</h4>

                      <h4 className="text-gray-500 font-semibold text-sm">
                        {value.mobileNumber}
                      </h4>
                    </div>

                    <h2>
                      {value.address1 +
                        ", " +
                        value.address2 +
                        ", " +
                        value.city +
                        ", " +
                        value.state +
                        ", " +
                        value.pincode}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    editHandler(value);
                  }}
                  className="text-blue-500 hidden group-hover:flex"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}

        {!showAddAddress && (
          <div className="flex items-center px-5 bg-white  border h-10 mx-5">
            <button
              onClick={() => setShowAddAddress(true)}
              className="text-sm text-orange-500 font-semibold"
            >
              + Add a new address
            </button>
          </div>
        )}

        {showAddAddress && (
          <div className="flex flex-col mx-5 bg-orange-50 py-5 my-10">
            <div className="flex w-full justify-end px-5">
              <button
                onClick={() => setShowAddAddress(false)}
                className="flex justify-center items-center w-6 h-6 font-semibold border border-black  rounded-full"
              >
                <span>X</span>
              </button>
            </div>

            <AddAddress
              editAddress={editAddress}
              callback={addAddressCallback}
            />
            <div ref={scrollRef}></div>
          </div>
        )}

        {!showAddAddress && (
          <div className="mx-5">
            <Button
              text="Use this Address"
              callback={addressButtonHandler}
              type="primary"
            />
          </div>
        )}
      </div>
    );
  }

  return body;
};

export default Address;
