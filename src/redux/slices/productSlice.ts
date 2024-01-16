import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IResponseProduct } from "@/services/productAPI";
import { getProducts, getProductById, getProductByIds } from "../actions/productAction";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface IProductState {
  all: IResponseProduct;
  selected: Product | Product[] | undefined;
}

const initialState: IProductState = {
  all: {
    data: [],
    total: 0,
    limit: 0,
    page: 0,
  },
  selected: undefined,
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {
    clearProduct: (state: IProductState, action) => {
      state.all.data = [];
      state.all.total = 0;
      state.all.limit = 0;
      state.all.page = 0;
      state.selected = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state: IProductState, action) => {
      state.all.data = action.payload.data;
      state.all.total = action.payload.total;
      state.all.limit = action.payload.limit;
      state.all.page = action.payload.page;
    });
    builder.addCase(getProductById.fulfilled, (state: IProductState, action) => {
      state.selected = action.payload.data;
    });
    builder.addCase(getProductByIds.fulfilled, (state: IProductState, action) => {
      state.selected = action.payload.data;
    });
  },
});

// export common actions
export const { clearProduct } = productSlice.actions;

// export common product selector
export const productListSelector = (store: RootState) => store.product.all.data;
export const productAllTotalSelector = (store: RootState) => store.product.all.total;

// export reducer
export default productSlice.reducer;
