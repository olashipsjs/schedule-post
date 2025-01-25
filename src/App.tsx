import { Form, Formik } from 'formik';
import Textarea from './components/textarea/Textarea';
import Field from './components/field/Field';
import { twMerge } from 'tailwind-merge';
import Button from './components/button/Button';
import { useGSAP } from '@gsap/react';
import React from 'react';
import gsap from 'gsap';

const App = () => {
  const [isHidden, setIsHidden] = React.useState(true);

  useGSAP(() => {
    gsap.to('#action-btn', {
      duration: 0.2,
      ease: 'power3.inOut',
      width: isHidden ? 'fit-content' : '100%',
    });
    gsap.to('#notification', {
      duration: 0.2,
      ease: 'power3.inOut',
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
                  <div className='flex gap-2 items-center justify-end p-2'>
                    {isHidden ? (
                      <Button
                        id='switch-btn'
                        onClick={() => setIsHidden(!isHidden)}
                        className={'bg-gray-200 text-gray-900'}
                      >
                        Schedule
                      </Button>
                    ) : (
                      <div className='bg-gray-100 p-0.5 w-ful'></div>
                    )}
                    <Button id='action-btn'>Post</Button>
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
