import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesReducer = createSlice({
  name: 'messagesList',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
  },
});

export const { actions } = messagesReducer;
export const selectors = messagesAdapter.getSelectors(
  (state) => state.messagesReducer,
);
export default messagesReducer.reducer;
