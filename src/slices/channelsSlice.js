/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchChannels = createAsyncThunk(
  'channelsList/fetchChannels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.getData(), {
      // const response = await axios.get(routes.errorPath(), {
        headers: getAuthHeader(),
      });
      const channels = await response.data.channels;
      if (!channels) {
        throw new Error('failFetchChannels');
      }

      return channels;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  channels: [],
  currentChannel: {},
  status: null,
  channelsError: null,
};

const channelsReducer = createSlice({
  name: 'channelsList',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      const { id, name } = action.payload;
      state.currentChannel.id = id;
      state.currentChannel.name = name;
    },
    renameChannel: (state, action) => {
      const { id, newName } = action.payload;
      const [renameChannel] = state.channels.filter((c) => c.id === id);
      renameChannel.name = newName;
    },
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload];
    },
    removeChannel: (state, action) => {
      const newState = state.channels.filter((c) => c.id !== action.payload);
      if (action.payload === state.currentChannel.id) {
        state.currentChannel.id = 1;
        state.currentChannel.name = 'general';
      }
      state.channels = newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.channelsError = action.payload;
      });
  },
});

export const { actions } = channelsReducer;

export default channelsReducer.reducer;
