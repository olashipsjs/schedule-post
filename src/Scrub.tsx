import React from 'react';
import Button from './components/button/Button';
import useField from './components/field/hook';
import Field from './components/field/Field';
import { twMerge } from 'tailwind-merge';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i + 1);
const meridians = ['am', 'pm'];

const Scrub = () => {
  return (
    <React.Fragment>
      <div className='relative space-y-1 w-full text-center text-2xl leading-0 font-medium text-gray-500 p-2'>
        {hours.map((hour) => {
          return (
            <Field name='start.hour'>
              {({ field, helper }) => {
                const currentHour = field.value === hour;

                return (
                  <Button
                    key={hour}
                    onClick={() => helper.setValue(hour)}
                    className={twMerge(
                      'p-0 w-full size-8 rounded-lg bg-transparent text-gray-500 hover:bg-gray-200 text-lg',
                      currentHour && 'text-gray-900 bg-gray-200'
                    )}
                  >
                    {hour}
                  </Button>
                );
              }}
            </Field>
          );
        })}
      </div>
      <div className='w-full text-center text-2xl leading-0 font-medium text-gray-500 p-2 space-y-1'>
        {minutes.map((minute) => {
          return (
            <Field name='start.minute'>
              {({ field, helper }) => {
                const currentMinute = field.value === minute;

                return (
                  <Button
                    key={minute}
                    onClick={() => helper.setValue(minute)}
                    className={twMerge(
                      'p-0 w-full size-8 rounded-lg bg-transparent text-gray-500 hover:bg-gray-200 text-lg',
                      currentMinute && 'text-gray-900 bg-gray-200'
                    )}
                  >
                    {minute < 10 ? `0${minute}` : minute}
                  </Button>
                );
              }}
            </Field>
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
