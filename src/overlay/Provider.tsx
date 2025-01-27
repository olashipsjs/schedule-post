import React from 'react';

type Context = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const OverlayContext = React.createContext<Context | undefined>(
  undefined
);

type Props = {
  open?: boolean;
  children?: ((value: Context) => React.ReactNode) | React.ReactNode;
};

const OverlayProvider = ({ open = false, children }: Props) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const value = React.useMemo(() => {
    return {
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  }, [isOpen, setIsOpen]);

  return (
    <OverlayContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;
