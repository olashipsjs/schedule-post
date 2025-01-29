import React from 'react';
import { SelectContext } from './Provider';

const useSelect = () => {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error(
      'useSelect must be defined within the SelectProvider component.'
    );
  }

  return context;
};

export default useSelect;
