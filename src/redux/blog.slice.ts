import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listBlog: []
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog(state, action) {
      state.listBlog = action.payload;
    }
  }
});

export const { setBlog } = blogSlice.actions;
const blogReducer = blogSlice.reducer;
export default blogReducer;
