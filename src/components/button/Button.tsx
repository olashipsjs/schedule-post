import React from 'react';
import { twMerge } from 'tailwind-merge';
import Slot from '../slot/Slot';

const Button = ({
  className,
  asChild = false,
  ...restProps
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      {...restProps}
      className={twMerge(
        'cursor-pointer flex items-center justify-center text-center w-fit font-semibold bg-gray-900 text-white px-8 py-2 leading-0 rounded-[999px] text-sm hover:opacity-80',
        className
      )}
    />
  );
};

export default Button;
