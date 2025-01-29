import React from 'react';
import useBoundingClientRect from '../../hooks/useBoundingClientRect';

type Context = ReturnType<typeof useBoundingClientRect> & {
  position: 'bottom' | 'top';
  setPosition: (position: 'bottom' | 'top') => void;
};

export const SelectContext = React.createContext<Context | undefined>(
  undefined
);

type Props = {
  children?: ((value: Context) => React.ReactNode) | React.ReactNode;
};

const SelectProvider = ({ children }: Props) => {
  const [position, setPosition] = React.useState<'bottom' | 'top'>('bottom');
  const boundingRect = useBoundingClientRect();

  const value = {
    position,
    setPosition,
    ...boundingRect,
  };

  return (
    <SelectContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SelectContext.Provider>
  );
};

export default SelectProvider;
