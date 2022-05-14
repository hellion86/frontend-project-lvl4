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
  async () => {
    const data = await axios.get(routes.getData(), {
      headers: getAuthHeader(),
    });
    const channels = await data.data.channels;
    // console.log(channels);
    console.log('fetch work')
    return channels;
  },
);
// const channelsAdapter = createEntityAdapter();

// const initialState = channelsAdapter.getInitialState();
const initialState = {
  channels: [],
  currentChannel: {},
  status: null,
  error: false,
};

const channelsReducer = createSlice({
  name: 'channelsList',
  initialState,
  reducers: {
    // addChannels: (state, action) => {
    //   const newState = [...action.payload];
    //   state.channels = newState;
    // },
    setCurrentChannel: (state, action) => {
      const { id, name } = action.payload;
      state.currentChannel.id = id;
      state.currentChannel.name = name;
    },
    renameChannel: (state, action) => {
      // console.log(action)
      // const { id, newName } = action.payload;
      // const idRenameChannel = state.channels.filter((c) => c.id === id);
      // console.log(idRenameChannel);
      // idRenameChannel[0].name = newName;
      // state.channels = [...state.channels, ...idRenameChannel ]
      // const newState = state.channels.filter((c) => c.id !== id);
      // state = [...newState, idRenameChannel[0]];
    },
    addChannel: (state, action) => {
      // console.log(action);
      // console.log(state.channels);
      state.channels = [...state.channels, action.payload]
      // state.channels.push(action.payload);
      // state.channels = [...state.channels, action.payload];
    },
    removeChannel: (state, action) => {
      const newState = state.channels.filter((c) => c.id !== action.payload);
      if (action.payload === state.currentChannel.id) {
        // state.currentChannel.id = 1;
        // state.currentChannel.name = 'general';
        channelsReducer.actions.setCurrentChannel({ id: 1, name: 'general' });
      }
      state.channels = newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state, action) => {
        console.log(action);
        state.status = 'loading';
        state.error = false;
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        console.log(action);
        state.status = 'loading';
        state.error = true;
      });
  },
  // addChannels: channelsAdapter.addMany,
  // addChannel: channelsAdapter.addOne,
  // removeChannel: channelsAdapter.removeOne,
  // renameChannel: channelsAdapter.updateOne,
});

export const { actions } = channelsReducer;
// export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);

export default channelsReducer.reducer;
