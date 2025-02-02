import React from 'react';
import Button from './components/button/Button';
import { ChevronUp } from './components/icons/ChevronUp';
import { ChevronDown } from './components/icons/ChevronDown';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i + 1);
const meridians = ['am', 'pm'];

const Scrub = () => {
  return (
    <React.Fragment>
      <div className='relative w-full text-center text-2xl leading-0 font-medium text-gray-500 p-2 flex flex-col items-center py-10'>
        <Button className='p-1 text-gray-500 bg-transparent hover:text-gray-900 absolute top-1'>
          <ChevronUp
            width={24}
            height={24}
          />
        </Button>
        {hours.map((hour) => {
          return (
            <div
              className='h-10 flex justify-center items-center'
              key={hour}
            >
              <span>{hour}</span>
            </div>
          );
        })}
        <Button className='p-1 text-gray-500 bg-transparent hover:text-gray-900 absolute top-56'>
          <ChevronDown
            width={24}
            height={24}
          />
        </Button>
      </div>
      <div className='w-full text-center text-2xl leading-0 font-medium text-gray-500 p-2'>
        {minutes.map((minute) => {
          return (
            <div
              className='h-10 flex justify-center items-center'
              key={minute}
            >
              <span>{minute < 10 ? `0${minute}` : `${minute}`}</span>
            </div>
          );
        })}
      </div>
      <div className='w-full text-center text-2xl leading-0 font-medium text-gray-500 uppercase p-2'>
        {meridians.map((meridian) => {
          return (
            <div
              className='h-10 flex justify-center items-center'
              key={meridian}
            >
              <span>{meridian}</span>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Scrub;
