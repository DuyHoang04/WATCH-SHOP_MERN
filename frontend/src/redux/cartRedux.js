import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    quantityCart: 0,
    cartShow: false,
    loadData: false,
  },
  reducers: {
    showCart: (state, action) => {
      state.cartShow = action.payload.cartShow;
    },
    isQuantityCart: (state, action) => {
      state.quantityCart = action.payload.quantityCart;
    },
    reloadData: (state) => {
      state.loadData = !state.loadData;
    },
  },
});

export const { showCart, isQuantityCart, reloadData } = cartSlice.actions;

export const selectCartShow = (state) => state.cart.cartShow;
export const selectQuantityCart = (state) => state.cart.quantityCart;
export const selectReloadData = (state) => state.cart.loadData;

export default cartSlice.reducer;
