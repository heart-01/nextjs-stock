import axios from "@/libs/axios";
import queryString from "query-string";

export interface IRequestProduct {
  name: string;
  price: number;
  stock: number;
  file?: string;
}

export interface IResponseProduct {
  data: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    created_at: string;
    updated_at: string;
  }>;
  total: number;
  limit: number;
  page: number;
}

const getProducts = async (options: { name?: string; limit: number; page: number }): Promise<IResponseProduct> => {
  // if (options.keyword) {
  //   return (await axios.get(`/product?page=${options.page}&limit=${options.limit}&name=${options.keyword}`)).data;
  // } else {
  //   return (await axios.get(`/product?page=${options.page}&limit=${options.limit}`)).data;
  // }

  return (
    await axios.get("/product", {
      params: {
        ...options,
      },
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
    })
  ).data;
};

const getProductById = async (id: string) => {
  return (await axios.get(`/product/${id}`)).data;
};

const getProductByIds = async (params: string[]) => {
  return (
    await axios.get("/product/query/multiple", {
      params: {
        ids: params,
      },
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
    })
  ).data;
};

const getImageProduct = async (image: string) => {
  return (await axios.get(`/product/image/${image}`, { responseType: "arraybuffer" })).data;
};

const createProduct = async (data: FormData): Promise<void> => {
  return await axios.post('/product', data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const editProduct = async (id: string, data: FormData): Promise<IResponseProduct> => {
  return await axios.patch(`/product/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProduct = async (id?: string): Promise<void> => {
  await axios.delete(`/product/${id}`);
};

export const productService = {
  getProducts,
  getProductById,
  getProductByIds,
  getImageProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
