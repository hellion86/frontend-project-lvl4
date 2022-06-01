import { useContext } from 'react';

import { ContentContext } from '../contexts/Content.jsx';

const ChatApiContext = () => useContext(ContentContext);

export default ChatApiContext;
