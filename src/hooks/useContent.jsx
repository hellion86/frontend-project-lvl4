import { useContext } from 'react';

import { ContentContext } from '../contexts/Content.jsx';

const chatApiContext = () => useContext(ContentContext);

export default chatApiContext;
