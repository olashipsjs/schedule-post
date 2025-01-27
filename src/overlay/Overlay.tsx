import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useOverlay from './useOverlay';
import OverlayProvider from './Provider';
import Button from '../components/button/Button';

const Compound = ({
  open,
  children,
  ...restProps
}: Omit<
  React.ComponentProps<'div'>,
  keyof React.ComponentProps<typeof OverlayProvider>
> &
  React.ComponentProps<typeof OverlayProvider>) => {
  return (
    <div {...restProps}>
      <OverlayProvider
        open={open}
        children={children}
      />
    </div>
  );
};

const Trigger = ({
  onClick,
  ...restProps
}: React.ComponentProps<typeof Button>) => {
  const { open } = useOverlay();

  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    open();
    onClick && onClick(ev);
  };

  return (
    <Button
      {...restProps}
      onClick={handleClick}
    />
  );
};

const Content = ({ ...restProps }: React.ComponentProps<'div'>) => {
  const { isOpen } = useOverlay();
  const ref = React.useRef<HTMLDivElement>(null!);

  useGSAP(() => {
    const current = ref.current;
    gsap.to(current, {
      ease: 'power1.inOut',
      duration: 0.2,
      opacity: isOpen ? 1 : 0,
    });
  }, [isOpen]);

  return (
    <div
      ref={ref}
      {...restProps}
    />
  );
};

const Overlay = Compound as typeof Compound & {
  Trigger: typeof Trigger;
  Content: typeof Content;
};

Overlay.Trigger = Trigger;
Overlay.Content = Content;
