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

type Props = {
  name: string;
  children?: ((content: Context<any>) => React.ReactNode) | React.ReactNode;
};

const FieldProvider = ({ name, children }: Props) => {
  const [field, meta, helper] = useField(name);

  const value = React.useMemo(() => {
    return { field, meta, helper };
  }, [field.value]);

  return (
    <FieldContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </FieldContext.Provider>
  );
};

export default FieldProvider;
