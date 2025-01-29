import React from 'react';

const useBoundingClientRect = () => {
  const elementRef = React.useRef<HTMLElement>(null!);
  const [rect, setRect] = React.useState<Omit<
    DOMRectReadOnly,
    'toJSON'
  > | null>(null);
  const abortControllerRef = React.useRef<AbortController | null>(null);

  const measure = React.useCallback(() => {
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();

      setRect({
        x: rect.x,
        y: rect.y,
        top: rect.top,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
      });
    }
  }, []);

  React.useEffect(() => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    if (elementRef.current) {
      const observer = new ResizeObserver(() => {
        if (!abortController.signal.aborted) {
          measure();
        }
      });

      observer.observe(elementRef.current);

      measure();

      return () => {
        abortController.abort();
      };
    }
  }, [measure]);

  return { rect, ref: elementRef };
};

export default useBoundingClientRect;
