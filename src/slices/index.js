import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import usersReducer from './usersSlice.js';

const store = configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
    usersReducer,
  },
});

export default store;
