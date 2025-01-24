import React from 'react';
import { FieldContext } from './Provider';
import { FieldHelperProps, FieldInputProps, FieldMetaProps } from 'formik';

const useField = <T extends any>() => {
  const context = React.useContext(FieldContext);

  if (!context) {
    throw new Error('useField must be used within a FieldProvider');
  }

  const { field, meta, helper } = context;

  return {
    field: field as FieldInputProps<T>,
    meta: meta as FieldMetaProps<T>,
    helper: helper as FieldHelperProps<T>,
  };
};

export default useField;
