import { Form, Formik } from 'formik';
import Textarea from './components/textarea/Textarea';
import Field from './components/field/Field';

const App = () => {
  return (
    <main className='flex flex-col items-center justify-center bg-gray-50 min-h-screen'>
      <section>
        <div className='max-w-[400px] mx-auto p-3 w-full'>
          <Formik>
            <Form>
              <Field name='message'>
                <Textarea placeholder={"What's up?"} />
              </Field>
            </Form>
          </Formik>
        </div>
      </section>
    </main>
  );
};

export default App;
