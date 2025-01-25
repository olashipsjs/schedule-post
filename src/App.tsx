import { Form, Formik } from 'formik';
import Textarea from './components/textarea/Textarea';
import Field from './components/field/Field';
import { twMerge } from 'tailwind-merge';
import Button from './components/button/Button';
import { useGSAP } from '@gsap/react';
import React from 'react';
import gsap from 'gsap';
import DismissIcon from './components/icons/DismissIcon';
import CalenderIcon from './components/icons/CalenderIcon';

const App = () => {
  const [isHidden, setIsHidden] = React.useState(true);

  useGSAP(() => {
    gsap.to('#action-btn', {
      duration: 0.2,
      ease: 'elastic.inOut',
      transformOrigin: 'center',
      scaleX: isHidden ? '100%' : '100%',
    });
    gsap.to('#notification', {
      duration: 0.2,
      ease: 'elastic.inOut',
      zIndex: isHidden ? -1 : 1,
      marginTop: isHidden ? -32 : 0,
      opacity: isHidden ? 0 : 1,
    });
  }, [isHidden]);

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
                  <div
                    className={twMerge(
                      'flex gap-2 justify-end p-2',
                      isHidden ? 'flex-row items-center' : 'flex-col'
                    )}
                  >
                    {isHidden ? (
                      <Button
                        onClick={() => setIsHidden(false)}
                        className={'bg-gray-200 text-gray-900 p-2'}
                      >
                        <CalenderIcon />
                      </Button>
                    ) : (
                      <div className='bg-gray-100 p-0.5 w-full rounded-full'>
                        <Button
                          onClick={() => setIsHidden(true)}
                          className={'bg-gray-200 p-0.5 text-gray-500 size-6'}
                        >
                          <DismissIcon />
                        </Button>
                      </div>
                    )}
                    <Button
                      className='w-full'
                      id='action-btn'
                    >
                      Post
                    </Button>
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
