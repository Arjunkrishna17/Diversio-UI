export interface useFetchDataType {
  isLoading: boolean;
  error: string | undefined;
}

export interface savedProducts {
  _id?: string;
  productName: string;
  productId: string;
  quantity: number;
  imageUrl: string;
  price: number;
}

export interface orderProductsType {
  productId: string;
  quantity: number;
}
