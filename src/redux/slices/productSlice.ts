import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IResponseProduct } from "@/services/productAPI";
import { getProducts } from "../actions/productAction";

type ProductState = {
  all: IResponseProduct;
};

const initialState: ProductState = {
  all: {
    data: [],
    total: 0,
    limit: 0,
    page: 0,
  },
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.all.data = action.payload.data;
      state.all.total = action.payload.total;
      state.all.limit = action.payload.limit;
      state.all.page = action.payload.page;
    });
  },
});

// export common product selector
export const productListSelector = (store: RootState) => store.product.all.data;
export const productAllTotalSelector = (store: RootState) => store.product.all.total;

// export reducer
export default productSlice.reducer;
