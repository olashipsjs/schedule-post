import Textarea from './components/textarea/Textarea';

const App = () => {
  return (
    <main className='flex flex-col items-center justify-center bg-gray-50 min-h-screen'>
      <section>
        <div className='max-w-[400px] mx-auto p-3 w-full'>
          <Textarea placeholder={"What's up?"} />
        </div>
      </section>
    </main>
  );
};

export default App;
