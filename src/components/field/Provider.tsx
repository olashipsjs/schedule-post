import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  useField,
} from 'formik';
import React from 'react';

type Context<T extends unknown> = {
  field: FieldInputProps<T>;
  meta: FieldMetaProps<T>;
  helper: FieldHelperProps<T>;
};

export const FieldContext = React.createContext<Context<unknown> | undefined>(
  undefined
);

const FieldProvider = ({
  name,
  children,
}: React.PropsWithChildren & { name: string }) => {
  const [field, meta, helper] = useField(name);

  return (
    <FieldContext.Provider value={{ field, meta, helper }}>
      {children}
    </FieldContext.Provider>
  );
};

export default FieldProvider;
