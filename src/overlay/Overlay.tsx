import gsap from 'gsap';
import React from 'react';
import { useGSAP } from '@gsap/react';
import useOverlay from './hook';
import OverlayProvider from './Provider';
import Button from '../components/button/Button';
import { twMerge } from 'tailwind-merge';

const Compound = React.forwardRef(
  (
    {
      open,
      children,
      ...restProps
    }: Omit<
      React.ComponentProps<'div'>,
      keyof React.ComponentProps<typeof OverlayProvider>
    > &
      React.ComponentProps<typeof OverlayProvider>,
    ref: React.ForwardedRef<React.ComponentRef<'div'>>
  ) => {
    return (
      <div
        ref={ref}
        {...restProps}
      >
        <OverlayProvider
          open={open}
          children={children}
        />
      </div>
    );
  }
);

const Trigger = ({
  onClick,
  ...restProps
}: React.ComponentProps<typeof Button>) => {
  const { open, close, isOpen } = useOverlay();

  const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    isOpen ? close() : open();
    onClick && onClick(ev);
  };

  return (
    <Button
      {...restProps}
      onClick={handleClick}
    />
  );
};

const Content = ({ className, ...restProps }: React.ComponentProps<'div'>) => {
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
      className={twMerge(
        'fixed flex flex-col items-center justify-center',
        className
      )}
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

export default Overlay;
