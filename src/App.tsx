import { Form, Formik } from 'formik';
import Textarea from './components/textarea/Textarea';
import Field from './components/field/Field';
import { twMerge } from 'tailwind-merge';
import Button from './components/button/Button';

const App = () => {
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
                    'bg-white rounded-3xl overflow-clip ring-1 ring-gray-200 flex-col'
                  )}
                >
                  <Textarea placeholder={"What's up?"} />
                  <div className='flex gap-2 items-center justify-end p-2'>
                    <Button>Post</Button>
                  </div>
                </Field.Sheet>
                <div className='p-1.5'>
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
