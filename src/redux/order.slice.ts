import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  updated: boolean;
  listProduct: any[];
  totalItem: number;
}

const initialState: OrderState = {
  updated: false,
  listProduct: [],
  totalItem: 0
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<boolean>) {
      state.updated = action.payload;
    },
    setListProduct(state, action: PayloadAction<any[]>) {
      state.listProduct = action.payload;
    }
  }
});

export const { setOrder, setListProduct } = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;
