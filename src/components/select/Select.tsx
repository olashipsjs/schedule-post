import React from 'react';
import useField from '../field/hook';
import Button from '../button/Button';
import Overlay from '../../overlay/Overlay';
import useOverlay from '../../overlay/hook';

const Compound = ({ ...restProps }: React.ComponentProps<typeof Overlay>) => {
  return <Overlay {...restProps} />;
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
    />
  );
};

const Select = Compound as typeof Compound & {
  Value: typeof Value;
  Option: typeof Option;
  Trigger: typeof Overlay.Trigger;
  Options: typeof Overlay.Content;
};

export default Select;
