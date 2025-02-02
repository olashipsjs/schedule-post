import React from 'react';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i + 1);
const meridians = ['am', 'pm'];

const Scrub = () => {
  return (
    <React.Fragment>
      {/* <div className='absolute flex flex-col bg-red-200'></div> */}

      <div className='w-full text-center text-2xl space-y-1 font-medium text-gray-900'>
        {hours.map((hour) => {
          return (
            <div key={hour}>
              <span>{hour}</span>
            </div>
          );
        })}
      </div>
      <div className='w-full text-center text-2xl space-y-1 font-medium text-gray-900'>
        {minutes.map((minute) => {
          return (
            <div key={minute}>
              <span>{minute}</span>
            </div>
          );
        })}
      </div>
      <div className='w-full text-center text-2xl space-y-1 font-medium text-gray-900 uppercase'>
        {meridians.map((meridian) => {
          return (
            <div key={meridian}>
              <span>{meridian}</span>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Scrub;
