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
              <Field name='message'>
                <Field.Sheet
                  className={twMerge('rounded-3xl flex-col bg-gray-100')}
                >
                  <div className='bg-white rounded-3xl overflow-clip border-b border-b-gray-200'>
                    <Textarea placeholder={"What's up?"} />
                    <div className='flex gap-2 items-center justify-end p-1.5'>
                      <Button>Post</Button>
                    </div>
                  </div>
                  <div className='p-2'>
                    <p className='text-center text-gray-500 text-sm font-medium'>
                      Will be posted on 25 Feb, 9:30AM
                    </p>
                  </div>
                </Field.Sheet>
              </Field>
            </Form>
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default App;
