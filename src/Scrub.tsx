import React from 'react';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);

const Scrub = () => {
  return (
    <React.Fragment>
      <div>
        {hours.map((hour) => {
          return (
            <div
              key={hour}
              className='flex items-center justify-between'
            >
              <span>{hour}</span>
              <span>:</span>
              <span>00</span>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Scrub;
