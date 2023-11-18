import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IResponseProduct } from "@/services/productAPI";
import { getProducts } from "../actions/productAction";

type ProductState = {
  all: IResponseProduct[];
};

const initialState: ProductState = {
  all: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.all = action.payload;
    });
  },
});

// export common product selector
export const productSelector = (store: RootState) => store.product.all;

// export reducer
export default productSlice.reducer;
