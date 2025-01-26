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
      delay: 0.1,
      duration: 0.4,
      ease: 'back.inOut',
      transformOrigin: 'center',
      opacity: isHidden ? 0 : 1,
      width: isHidden ? 'fit-content' : '100%',
      stagger: 0.2,
    });

    gsap.to('#notification', {
      duration: 0.2,
      ease: 'power4.inOut',
      zIndex: isHidden ? -1 : 1,
      marginTop: isHidden ? -32 : 0,
      opacity: isHidden ? 0 : 1,
    });
  }, [isHidden]);

  const handleSchedule = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <main className='flex flex-col items-center justify-center bg-gray-50 min-h-screen'>
      <section className='w-full'>
        <div className='max-w-[400px] mx-auto p-3 w-full'>
          <Formik
            initialValues={{ message: '' }}
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
                  <div className='p-2'>
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
                      className='flex gap-2 justify-center items-center flex-col'
                    >
                      <div className='bg-gray-100 p-0.5 w-full rounded-full scaleX'>
                        <Button
                          onClick={() => setIsHidden(true)}
                          className={'bg-transparent p-1.5 text-gray-500'}
                        >
                          <DismissIcon />
                        </Button>
                      </div>
                      <Button className='scaleX'>Schedule</Button>
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
