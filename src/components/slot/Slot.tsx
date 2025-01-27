import React from 'react';

const Slot = <T extends keyof JSX.IntrinsicElements>(
  props: React.ComponentProps<T>
) => {
  const { children, ...restProps } = props;
  return React.cloneElement(children as any, restProps as any);
};

export default Slot;
