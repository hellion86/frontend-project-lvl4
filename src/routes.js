// @ts-check

const host = '';
const prefix = 'api/v1';

const errorHost = 'asdadads';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  loginUser: () => [host, prefix, 'login'].join('/'),
  signupUser: () => [host, prefix, 'signup'].join('/'),
  getData: () => [host, prefix, 'data'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  errorPath: () => [errorHost, prefix, 'channels'].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  loginPage: () => [host, 'login'].join('/'),
  signupPage: () => [host, 'signup'].join('/'),
  chatPage: () => [host, '/'].join(''),
};
