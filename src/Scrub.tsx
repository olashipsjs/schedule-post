import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

type ScrubProps = {
  min: number; // Minimum time (e.g., 0)
  max: number; // Maximum time (e.g., 24)
  step?: number; // Time interval (e.g., 1 hour)
  onChange?: (value: number) => void; // Callback for time change
};

const Scrub: React.FC<ScrubProps> = ({ min, max, step = 1, onChange }) => {
  const scrubberRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(min);

  const handleDrag = (yPosition: number) => {
    if (!trackRef.current) return;

    const trackBounds = trackRef.current.getBoundingClientRect();
    const trackHeight = trackBounds.height;
    const newY = Math.max(
      0,
      Math.min(yPosition - trackBounds.top, trackHeight)
    );

    // Calculate the corresponding value
    const percentage = newY / trackHeight;
    const newValue = Math.round(min + (percentage * (max - min)) / step) * step;
    setValue(newValue);

    if (onChange) onChange(newValue);

    // Move scrubber
    if (scrubberRef.current) {
      gsap.to(scrubberRef.current, {
        y: newY,
        duration: 0.2,
      });
    }
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      handleDrag(event.clientY);
      const handleMouseMove = (moveEvent: MouseEvent) => {
        handleDrag(moveEvent.clientY);
      };

      const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    if (trackRef.current) {
      trackRef.current.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      if (trackRef.current) {
        trackRef.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [min, max, step]);

  return (
    <div
      className='relative w-16 h-96 bg-gray-200 rounded-md'
      ref={trackRef}
    >
      <div
        ref={scrubberRef}
        className='absolute left-0 w-full h-8 bg-blue-500 rounded-full cursor-pointer'
        style={{ top: `${((value - min) / (max - min)) * 100}%` }}
      />
      <div className='absolute top-0 left-full ml-4 text-sm'>{value}</div>
    </div>
  );
};

export default Scrub;
