/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

// const channelsAdapter = createEntityAdapter();

// const initialState = channelsAdapter.getInitialState();
const initialState = {
  channels: [],
  currentChannel: '',
};

const channelsReducer = createSlice({
  name: 'channelsList',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      // console.log('dispatch channels !');
      state.channels.push(...action.payload);
    },
    setCurrentChannel: (state, action) => {
      // console.log(action)
      state.currentChannel = action.payload;
    },
    renameChannel: (state, action) => {
      const { id, name } = action;
      const idRenameChannel = state.channels.filter((c) => c.id === id);
      idRenameChannel.name = name;
      state.channels.push(...state.channels, idRenameChannel);
      //state.channels.p
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    // addChannels: channelsAdapter.addMany,
    // addChannel: channelsAdapter.addOne,
    // removeChannel: channelsAdapter.removeOne,
    // renameChannel: channelsAdapter.updateOne,
  },
});

export const { actions } = channelsReducer;
// export const selectors = channelsAdapter.getSelectors((state) => state.channelsReducer);

export default channelsReducer.reducer;
