import React from 'react';
import { twMerge } from 'tailwind-merge';
import FieldProvider from './Provider';

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
  return (
    <div
      {...restProps}
      className={twMerge('ring-1 ring-gray-200', className)}
    />
  );
};

const Field = Compound as typeof Compound & {
  Sheet: typeof Sheet;
};

Field.Sheet = Sheet;

export default Field;
