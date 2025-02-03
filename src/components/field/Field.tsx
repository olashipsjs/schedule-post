import React from 'react';
import { twMerge } from 'tailwind-merge';
import FieldProvider from './Provider';

const Compound = ({
  name = '',
  children,
  ...restProps
}: Omit<
  React.ComponentProps<'div'>,
  keyof React.ComponentProps<typeof FieldProvider>
> &
  React.ComponentProps<typeof FieldProvider>) => {
  return (
    <div {...restProps}>
      <FieldProvider
        name={name}
        children={children}
      />
    </div>
  );
};

const Sheet = ({ className, ...restProps }: React.ComponentProps<'div'>) => {
  //   const { meta } = useField();

  return (
    <div
      {...restProps}
      className={twMerge(
        'ring-1 ring-gray-200 rounded-lg overflow-clip w-full flex  transition-all duration-200 ease-in-out bg-white',
        // meta.touched && 'ring-blue-500 ring-2 hover:ring-blue-500',
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
