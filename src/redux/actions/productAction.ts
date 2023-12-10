import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "@/services/productAPI";
import { store } from "../store";

export const getProducts = createAsyncThunk("product/get", async (options: { keyword?: string; limit: number; page: number }) => {
  const productList = await productService.getProducts(options);
  const productWithImageBlob = [];
  for (const product of productList.data) {
    if (product.image) {
      const arrayBuffer = await productService.getImageProduct(product.image);
      const blob = new Blob([arrayBuffer]);
      const objectUrl = URL.createObjectURL(blob);
      product.image = objectUrl;
    }
    productWithImageBlob.push({
      ...product,
    });
  }
  return {
    data: productWithImageBlob,
    total: productList.total,
    limit: productList.limit,
    page: productList.page,
  };
});

export const deleteProduct = createAsyncThunk("product/delete", async (id: string) => {
  await productService.deleteProduct(id);
  store.dispatch(getProducts({ page: 0, limit: 10 }));
});
