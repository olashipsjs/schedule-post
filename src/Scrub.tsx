import React from 'react';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i + 1);

const Scrub = () => {
  return (
    <React.Fragment>
      <div className='w-full text-center'>
        {hours.map((hour) => {
          return (
            <div key={hour}>
              <span>{hour}</span>
            </div>
          );
        })}
      </div>
      <div className='w-full text-center'>
        {minutes.map((minute) => {
          return (
            <div key={minute}>
              <span>{minute}</span>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Scrub;
