import React from 'react';
import { twMerge } from 'tailwind-merge';
import useField from '../field/hook';

const Textarea = ({
  rows = 1,
  onBlur,
  onFocus,
  onChange,
  className,
  ...restProps
}: React.ComponentProps<'textarea'>) => {
  const { field, helper } = useField();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null!);

  React.useEffect(() => {
    const target = textareaRef.current;

    if (!target) return;

    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  }, [field.value]);

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = ev.target.value;
    helper.setValue(value);
    onChange && onChange(ev);
  };

  const handleFocus = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
    helper.setTouched(true);
    onFocus && onFocus(ev);
  };

  const handleBlur = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
    helper.setTouched(false);
    onBlur && onBlur(ev);
  };

  return (
    <textarea
      {...restProps}
      ref={textareaRef}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onChange={handleChange}
      value={field.value as any}
      rows={rows}
      className={twMerge('w-full outline-0 resize-none', className)}
    />
  );
};

export default Textarea;
