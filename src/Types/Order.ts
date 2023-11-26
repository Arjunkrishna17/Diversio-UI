import { productTypes } from "./Product";

export interface placeOrderDetails {
  productId: string;
  delivery?: string | null;
  quantity: number;
}

export interface orderDetails {
  _id: string;
  cartId: string;
  product: productTypes;
  quantity: number;
  userId: string;
  cartAmount: number;
  paymentType?: string | null;
  paymentStatus?: null;
  expiresAt: Date;
  createdAt: Date;
}
