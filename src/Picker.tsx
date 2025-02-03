import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface TimePickerProps {
  onTimeChange?: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const [selectedHour, setSelectedHour] = useState<number>(12);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('AM');

  const scrollSnap = (
    container: HTMLDivElement | null,
    setValue: (value: number | string) => void,
    items: any[]
  ) => {
    if (!container) return;
    const scrollPosition = container.scrollTop;
    const itemHeight = container.scrollHeight / items.length;
    const selectedIndex = Math.round(scrollPosition / itemHeight);
    const value = items[selectedIndex];

    gsap.to(container, {
      scrollTo: { y: selectedIndex * itemHeight },
      duration: 0.3,
      ease: 'power2.out',
    });

    setValue(value);
    if (onTimeChange) {
      onTimeChange(
        `${selectedHour}:${String(selectedMinute).padStart(
          2,
          '0'
        )} ${selectedPeriod}`
      );
    }
  };

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement>,
    setValue: (value: any) => void,
    items: any[]
  ) => {
    if (!ref.current) return;
    const container = ref.current;
    container.addEventListener('scroll', () => {
      scrollSnap(container, setValue, items);
    });
  };

  useEffect(() => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const periods = ['AM', 'PM'];

    handleScroll(hoursRef, setSelectedHour, hours);
    handleScroll(minutesRef, setSelectedMinute, minutes);
    handleScroll(periodRef, setSelectedPeriod, periods);
  }, []);

  const renderItems = (items: any[], selectedValue: any) =>
    items.map((item) => (
      <div
        key={item}
        style={{
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: item === selectedValue ? 'bold' : 'normal',
          fontSize: item === selectedValue ? '18px' : '16px',
        }}
      >
        {item}
      </div>
    ));

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'center',
      }}
    >
      {/* Hours */}
      <div
        ref={hoursRef}
        style={{
          height: '120px',
          width: '50px',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          scrollSnapType: 'y mandatory',
        }}
      >
        {renderItems(
          Array.from({ length: 12 }, (_, i) => i + 1),
          selectedHour
        )}
      </div>

      {/* Minutes */}
      <div
        ref={minutesRef}
        style={{
          height: '120px',
          width: '50px',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          scrollSnapType: 'y mandatory',
        }}
      >
        {renderItems(
          Array.from({ length: 60 }, (_, i) => i),
          selectedMinute
        )}
      </div>

      {/* AM/PM */}
      <div
        ref={periodRef}
        style={{
          height: '120px',
          width: '50px',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          scrollSnapType: 'y mandatory',
        }}
      >
        {renderItems(['AM', 'PM'], selectedPeriod)}
      </div>
    </div>
  );
};

export default TimePicker;
