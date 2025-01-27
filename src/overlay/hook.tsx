import React from 'react';
import { OverlayContext } from './Provider';

const useOverlay = () => {
  const context = React.useContext(OverlayContext);

  if (!context) {
    throw new Error(
      'useOverlay hook cannot be defined outside the OverlayProvider component'
    );
  }

  return context;
};

export default useOverlay;
