import axios from "@/libs/axios";

export interface IResponseProduct {
  id: number;
  name: string;
  image?: string | null;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const getProducts = async (keyword?: string): Promise<IResponseProduct[]> => {
  if (keyword) {
    return (await axios.get(`/product?name=${keyword}`)).data;
  } else {
    return (await axios.get(`/product`)).data;
  }
};

const getProductById = async (id: string) => {
  return (await axios.get(`/product/${id}`)).data;
};

const getImageProduct = async (image: string) => {
  return (await axios.get(`/product/image/${image}`, { responseType: "arraybuffer" })).data;
};

const createProduct = async (data: FormData): Promise<void> => {
  return await axios.post(`/product`, data);
};

const editProduct = async (data: FormData): Promise<IResponseProduct> => {
  return await axios.put(`/product`, data);
};

const deleteProduct = async (id?: string): Promise<void> => {
  await axios.delete(`/product/${id}`);
};

export const productService = {
  getProducts,
  getProductById,
  getImageProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
