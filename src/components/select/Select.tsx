import React from 'react';
import useField from '../field/hook';
import Button from '../button/Button';
import Overlay from '../../overlay/Overlay';
import useOverlay from '../../overlay/hook';
import { twMerge } from 'tailwind-merge';
import SelectProvider from './Provider';
import useSelect from './hook';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Compound = ({
  className,
  ...restProps
}: Omit<
  React.ComponentProps<typeof SelectProvider>,
  keyof React.ComponentProps<typeof Overlay>
> &
  React.ComponentProps<typeof Overlay>) => {
  return (
    <SelectProvider>
      {({ ref }) => {
        return (
          <Overlay
            {...restProps}
            ref={ref as any}
            className={twMerge('w-full', className)}
          />
        );
      }}
    </SelectProvider>
  );
};

const Value = ({
  children,
  ...restProps
}: Omit<React.ComponentProps<'div'>, 'children'> & {
  children?: ((value: any) => React.ReactNode) | React.ReactNode;
}) => {
  const { field } = useField();

  return (
    <div {...restProps}>
      {typeof children === 'function' ? children(field.value) : children}
    </div>
  );
};

const Option = ({
  value,
  onClick,
  className,
  ...restProps
}: React.ComponentProps<typeof Button> & { value: any }) => {
  const { helper } = useField();
  const { close } = useOverlay();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    helper.setValue(value);
    onClick && onClick(event);
    close();
  };

  return (
    <Button
      {...restProps}
      onClick={handleClick}
      className={twMerge('w-full', className)}
    />
  );
};

const Content = ({
  className,
  ...restProps
}: React.ComponentProps<typeof Overlay.Content>) => {
  const { isOpen } = useOverlay();
  const contentRef = React.useRef<HTMLDivElement>(null!);
  const { rect, position, setPosition } = useSelect();

  useGSAP(() => {
    const element = contentRef.current;

    gsap.to(element, {
      width: isOpen ? '100%' : '90%',
      ease: 'back.inOut',
      duration: 2,
    });
  }, [isOpen]);

  if (!rect) return;

  React.useEffect(() => {
    if (isOpen && rect) {
      const viewportHeight = window.innerHeight;

      if (rect.bottom + 200 > viewportHeight) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  }, [isOpen, rect]);

  return (
    <Overlay.Content
      {...restProps}
      ref={contentRef}
      className={twMerge(
        'ring-1 ring-gray-200 shadow-lg shadow-gray-200',
        className
      )}
      style={{
        zIndex: 999,
        left: rect?.left || 0,
        right: rect?.right || 0,
        width: rect?.width || 0,
        top: position === 'bottom' ? rect.bottom + 8 : undefined,
        bottom:
          position === 'top' ? window.innerHeight - (rect.top - 12) : undefined,
      }}
    />
  );
};

const Select = Compound as typeof Compound & {
  Value: typeof Value;
  Option: typeof Option;
  Content: typeof Content;
  Trigger: typeof Overlay.Trigger;
};

Select.Value = Value;
Select.Option = Option;
Select.Content = Content;
Select.Trigger = Overlay.Trigger;

export default Select;
