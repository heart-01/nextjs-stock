import { createAsyncThunk } from "@reduxjs/toolkit";
import { productService } from "@/services/productAPI";
import { store } from "../store";

export const getProducts = createAsyncThunk("product/get", async (keyword?: string) => {
  return await productService.getProducts(keyword);
});

export const deleteProduct = createAsyncThunk("product/delete", async (id: string) => {
  await productService.deleteProduct(id);
  store.dispatch(getProducts());
});
