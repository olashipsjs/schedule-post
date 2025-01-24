import React from 'react';
import { FieldContext } from './Provider';

const useField = <T extends any>() => {
  const context = React.useContext(FieldContext);

  if (!FieldContext) {
    throw new Error('useField must be used within a FieldProvider');
  }

  return context;
};
