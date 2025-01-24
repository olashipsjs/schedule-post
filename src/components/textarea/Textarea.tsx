import React from 'react';
import { twMerge } from 'tailwind-merge';

const Textarea = ({
  className,
  rows,
  ...restProps
}: React.ComponentProps<'textarea'>) => {
  return (
    <textarea
      {...restProps}
      rows={rows}
      className={twMerge('w-full outline-0 resize-none', className)}
    />
  );
};

export default Textarea;
