import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// import { actions as channelActions } from './channelsSlice.js';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersReducer = createSlice({
  name: 'usersList',
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    removeUser: usersAdapter.removeOne,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(channelActions.removeChannel, (state, action) => {
  //     // console.log('channel was remove!');
  //     // const channelId = action.payload;
  //     // const getMessages = Object.values(state.entities);
  //     // const filterMessages = getMessages.filter((msg) => msg.channelId !== channelId);
  //     // messagesAdapter.setAll(state, filterMessages);
  //   });
  // },
});

export const { actions } = usersReducer;
export const selectors = usersAdapter.getSelectors((state) => state.usersReducer);
export default usersReducer.reducer;
