import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// import { actions as channelActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesReducer = createSlice({
  name: 'messagesList',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: messagesAdapter.removeOne,
    removeAllMessages: messagesAdapter.removeMany,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(channelActions.removeChannel, (state, action) => {
  //     const channelId = action.payload;
  //     const getMessages = Object.values(state.entities);
  //     const filterMessages = getMessages.filter((msg) => msg.channelId !== channelId);
  //     messagesAdapter.setAll(state, filterMessages);
  //   });
  // },
});

export const { actions } = messagesReducer;
export const selectors = messagesAdapter.getSelectors((state) => state.messagesReducer);
export default messagesReducer.reducer;
