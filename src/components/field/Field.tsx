import React from 'react';
import { twMerge } from 'tailwind-merge';
import FieldProvider from './Provider';
import useField from './hook';

const Compound = ({
  name = '',
  ...restProps
}: React.ComponentProps<typeof FieldProvider>) => {
  return (
    <FieldProvider
      name={name}
      {...restProps}
    />
  );
};

const Sheet = ({ className, ...restProps }: React.ComponentProps<'div'>) => {
  const { meta } = useField();

  return (
    <div
      {...restProps}
      className={twMerge(
        'ring-1 ring-gray-200 rounded-lg overflow-clip w-full flex hover:ring-gray-400 transition-all duration-200 ease-in-out',
        meta.touched && 'ring-blue-500 ring-2 hover:ring-blue-500',
        className
      )}
    />
  );
};

const Field = Compound as typeof Compound & {
  Sheet: typeof Sheet;
};

Field.Sheet = Sheet;

export default Field;
