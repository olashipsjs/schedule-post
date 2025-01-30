import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const TimePicker: React.FC = () => {
  const [selectedHour, setSelectedHour] = useState(9);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [meridian, setMeridian] = useState<'AM' | 'PM'>('AM');

  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const meridianRef = useRef<HTMLDivElement>(null);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0 to 59
  const meridians = ['AM', 'PM'];
  const presets = [9, 12, 16, 18]; // Example presets: 9AM, 12PM, 4PM, 6PM

  // Function to handle GSAP snapping
  const scrollToSelection = (
    containerRef: React.RefObject<HTMLDivElement>,
    selectedIndex: number
  ) => {
    if (containerRef.current) {
      const items = containerRef.current.children;
      const target = items[selectedIndex] as HTMLElement;

      if (target) {
        const yOffset = target.offsetTop - containerRef.current.offsetTop;

        // Smooth animation with GSAP
        gsap.to(containerRef.current, {
          scrollTop: yOffset,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    }
  };

  // Scroll to the selected values when they change
  useEffect(() => {
    const hourIndex = selectedHour - 1; // Convert 1-12 to 0-based index
    const minuteIndex = selectedMinute;
    const meridianIndex = meridian === 'AM' ? 0 : 1;

    scrollToSelection(hoursRef, hourIndex);
    scrollToSelection(minutesRef, minuteIndex);
    scrollToSelection(meridianRef, meridianIndex);
  }, [selectedHour, selectedMinute, meridian]);

  const handlePresetClick = (hour: number) => {
    setSelectedHour(hour > 12 ? hour - 12 : hour);
    setMeridian(hour >= 12 ? 'PM' : 'AM');
    setSelectedMinute(0);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-50'>
      <h1 className='mb-6 text-lg font-semibold text-gray-800'>Time</h1>

      {/* Time Selector */}
      <div className='flex items-center justify-center space-x-4'>
        {/* Hours */}
        <div
          className='relative w-12 h-40 overflow-hidden rounded-md bg-gray-200'
          ref={hoursRef}
        >
          <div className='flex flex-col items-center space-y-2'>
            {hours.map((hour) => (
              <div
                key={hour}
                className={`text-lg cursor-pointer ${
                  hour === selectedHour
                    ? 'font-bold text-black'
                    : 'text-gray-400'
                }`}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </div>
            ))}
          </div>
        </div>

        {/* Colon */}
        <span className='text-lg font-bold'>:</span>

        {/* Minutes */}
        <div
          className='relative w-12 h-40 overflow-hidden rounded-md bg-gray-200'
          ref={minutesRef}
        >
          <div className='flex flex-col items-center space-y-2'>
            {minutes.map((minute) => (
              <div
                key={minute}
                className={`text-lg cursor-pointer ${
                  minute === selectedMinute
                    ? 'font-bold text-black'
                    : 'text-gray-400'
                }`}
                onClick={() => setSelectedMinute(minute)}
              >
                {minute.toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>

        {/* AM/PM */}
        <div
          className='relative w-12 h-40 overflow-hidden rounded-md bg-gray-200'
          ref={meridianRef}
        >
          <div className='flex flex-col items-center space-y-2'>
            {meridians.map((m) => (
              <div
                key={m}
                className={`text-lg cursor-pointer ${
                  m === meridian ? 'font-bold text-black' : 'text-gray-400'
                }`}
                onClick={() => setMeridian(m as 'AM' | 'PM')}
              >
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className='flex items-center justify-center mt-6 space-x-4'>
        {presets.map((preset) => (
          <button
            key={preset}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              selectedHour === (preset > 12 ? preset - 12 : preset) &&
              meridian === (preset >= 12 ? 'PM' : 'AM')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handlePresetClick(preset)}
          >
            {preset > 12 ? preset - 12 : preset} {preset >= 12 ? 'PM' : 'AM'}
          </button>
        ))}
      </div>

      {/* Done Button */}
      <button className='px-6 py-3 mt-6 font-medium text-white bg-blue-500 rounded-lg'>
        Done
      </button>
    </div>
  );
};

export default TimePicker;
