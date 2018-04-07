import React from 'react';

import BridgeScreen from './bridgeScreen';

const RedAlertScreen = (props) => (
  <BridgeScreen
    {...props}
    redAlert={true}
  />
);

export default RedAlertScreen;
