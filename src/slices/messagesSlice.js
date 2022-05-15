/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { actions as channelActions } from './channelsSlice.js';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchMessages = createAsyncThunk(
  'messagesList/fetchMessages',
  async () => {
    const response = await axios.get(routes.getData(), {
      headers: getAuthHeader(),
    });
    const messages = await response.data.messages;
    return messages;
  },
);

const initialState = {
  messages: [],
};

const messagesReducer = createSlice({
  name: 'messagesList',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const {
        textMessage, author, channelId, id,
      } = action.payload;
      state.messages.push({
        textMessage, author, channelId, id,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(channelActions.removeChannel, (state, action) => {
        const idRemoveChannel = action.payload;
        const newState = state.messages.filter((m) => m.channelId !== idRemoveChannel);
        state.messages = newState;
      });
  },
});

export const { actions } = messagesReducer;
export default messagesReducer.reducer;
