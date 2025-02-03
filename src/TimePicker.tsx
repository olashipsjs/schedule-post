import React from 'react';
import Button from './components/button/Button';
import Field from './components/field/Field';
import { twMerge } from 'tailwind-merge';

const hours = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = Array.from({ length: 60 }, (_, i) => i);
const meridians = ['am', 'pm'];

const TimePicker = ({ fieldName }: { fieldName: string }) => {
  return (
    <React.Fragment>
      <div className='space-y-1 w-full p-2'>
        {hours.map((hour) => {
          return (
            <Field name={`${fieldName}.hour`}>
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
      <div className='w-full p-2 space-y-1'>
        {minutes.map((minute) => {
          return (
            <Field name={`${fieldName}.minute`}>
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
      <div className='w-full p-2 space-y-1'>
        {meridians.map((meridian) => {
          return (
            <Field name={`${fieldName}.meridian`}>
              {({ field, helper }) => {
                const currentMeridian = field.value === meridian;

                return (
                  <Button
                    key={meridian}
                    onClick={() => helper.setValue(meridian)}
                    className={twMerge(
                      'p-0 w-full size-8 rounded-lg bg-transparent uppercase text-gray-500 hover:bg-gray-200 text-base',
                      currentMeridian && 'text-gray-900 bg-gray-200'
                    )}
                  >
                    {meridian}
                  </Button>
                );
              }}
            </Field>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default TimePicker;
