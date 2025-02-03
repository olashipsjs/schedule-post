import { Form, Formik } from 'formik';
import Textarea from './components/textarea/Textarea';
import Field from './components/field/Field';
import { twMerge } from 'tailwind-merge';
import Button from './components/button/Button';
import React from 'react';
import gsap from 'gsap';
import DismissIcon from './components/icons/DismissIcon';
import CalenderIcon from './components/icons/CalenderIcon';
import { useGSAP } from '@gsap/react';
import Select from './components/select/Select';
import TimePicker from './TimePicker';
const App = () => {
  const [isHidden, setIsHidden] = React.useState(true);

  useGSAP(() => {
    gsap.to('#post-box', {
      duration: 0.1,
      opacity: isHidden ? 1 : 0,
      height: isHidden ? 'auto' : 0,
      visibility: isHidden ? 'visible' : 'hidden',
    });

    gsap.to('#schedule-box', {
      duration: 0.1,
      opacity: isHidden ? 0 : 1,
      width: isHidden ? 0 : '100%',
      height: isHidden ? 0 : 'auto',
      visibility: isHidden ? 'hidden' : 'visible',
    });

    gsap.to('.scaleX', {
      stagger: 0.1,
      duration: 0.4,
      ease: 'back.inOut',
      opacity: isHidden ? 0 : 1,
      width: isHidden ? 'fit-content' : '100%',
    });

    gsap.to('#notification', {
      duration: 0.3,
      ease: 'back.inOut',
      opacity: isHidden ? 0 : 1,
      zIndex: isHidden ? -1 : 1,
      delay: isHidden ? 0.15 : 0.3,
      marginTop: isHidden ? -32 : 0,
    });
  }, [isHidden]);

  const handleSchedule = () => {
    setIsHidden((prev) => !prev);
  };

  const date = new Date();

  return (
    <main className='flex flex-col items-center justify-end bg-gray-50 min-h-screen'>
      <section className='w-full'>
        <div className='max-w-[400px] mx-auto p-3 w-full'>
          <Formik
            initialValues={{
              message: '',
              startTime: {
                hour: date.getHours(),
                minute: date.getMinutes(),
                meridian: 'am',
              },
              endTime: {
                hour: date.getHours(),
                minute: date.getMinutes(),
                meridian: 'am',
              },
            }}
            onSubmit={() => null!}
          >
            <Form>
              <Field
                name='message'
                className={twMerge(
                  'rounded-3xl flex-col ring-1 ring-gray-200 bg-gray-100 flex overflow-clip'
                )}
              >
                <Field.Sheet
                  className={twMerge(
                    'bg-white rounded-3xl overflow-clip ring-1 ring-gray-200 flex-col gap-3'
                  )}
                >
                  <Textarea placeholder={"What's up?"} />
                  <div className='p-2 min-h-28 flex flex-col justify-end'>
                    <div
                      id={'post-box'}
                      className='flex gap-2 justify-end items-stretch'
                    >
                      <Button
                        onClick={() => handleSchedule()}
                        className={'bg-gray-200 text-gray-900 p-2'}
                      >
                        <CalenderIcon />
                      </Button>
                      <Button id='post-btn'>Post</Button>
                    </div>

                    <div
                      id='schedule-box'
                      className='flex gap-2 justify-center items-center flex-col-reverse'
                    >
                      <Button className='scaleX'>Schedule</Button>
                      <div className='bg-gray-100 p-0.5 w-full rounded-full scaleX flex gap-1'>
                        <Field
                          name='startTime'
                          className='w-full'
                        >
                          <Field.Sheet className='rounded-full w-full'>
                            <Select>
                              <Select.Trigger className='bg-transparent text-gray-900 w-full py-1'>
                                <Select.Value className='text-lg'>
                                  {(value) => {
                                    return `${value.hour}:${
                                      value.minute < 10
                                        ? '0' + value.minute
                                        : value.minute
                                    } ${value.meridian.toUpperCase()}`;
                                  }}
                                </Select.Value>
                              </Select.Trigger>
                              <Select.Content className='bg-white rounded-2xl grid grid-cols-3 items-start h-64 overflow-y-scroll no-scrollbar'>
                                <TimePicker fieldName='startTime' />
                              </Select.Content>
                            </Select>
                          </Field.Sheet>
                        </Field>
                        <Field
                          name='endTime'
                          className='w-full'
                        >
                          <Field.Sheet className='rounded-full w-full'>
                            <Select>
                              <Select.Trigger className='bg-transparent text-gray-900 w-full py-1'>
                                <Select.Value className='text-lg'>
                                  {(value) => {
                                    return `${value.hour}:${
                                      value.minute < 10
                                        ? '0' + value.minute
                                        : value.minute
                                    } ${value.meridian.toUpperCase()}`;
                                  }}
                                </Select.Value>
                              </Select.Trigger>
                              <Select.Content className='bg-white rounded-2xl grid grid-cols-3 items-start h-64 overflow-y-scroll no-scrollbar'>
                                <TimePicker fieldName='endTime' />
                              </Select.Content>
                            </Select>
                          </Field.Sheet>
                        </Field>
                        <Button
                          onClick={() => setIsHidden(true)}
                          className={'bg-transparent p-1.5 text-gray-500'}
                        >
                          <DismissIcon />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Field.Sheet>
                <div
                  id='notification'
                  className='p-1.5 mt-[-32px] opacity-0 -z-10'
                >
                  <p className='text-center text-gray-500 text-sm font-medium'>
                    Will be posted on 25 Feb, 9:30AM
                  </p>
                </div>
              </Field>
            </Form>
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default App;
