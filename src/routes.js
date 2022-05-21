// @ts-check

const host = '';
const prefix = 'api/v1';

const errorHost = 'asdadads';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  signupUser: () => [host, prefix, 'signup'].join('/'),
  loginUser: () => [host, prefix, 'login'].join('/'),
  getData: () => [host, prefix, 'data'].join('/'),
  errorPath: () => [errorHost, prefix, 'channels'].join('/'),
  loginPage: () => [host, 'login'].join('/'),
  signupPage: () => [host, 'signup'].join('/'),
  chatPage: () => [host, '/'].join(''),
  anyPath: () => [host, '*'].join(''),
};
