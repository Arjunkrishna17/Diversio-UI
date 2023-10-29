export interface address {
  _id: string;
  userId: string;
  fullName: string;
  mobileNumber: string;
  pincode: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  default: boolean;
}

export interface paymentCreationResponse {
  clientSecret: string;
  amount: number;
}
