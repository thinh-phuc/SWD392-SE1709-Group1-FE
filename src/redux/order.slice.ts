import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  updated: boolean;
}

const initialState: OrderState = {
  updated: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<boolean>) {
      state.updated = action.payload;
    }
  }
});

export const { setOrder } = orderSlice.actions;
const orderReducer = orderSlice.reducer;
export default orderReducer;
