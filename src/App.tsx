import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // TODO: move fetch logic into api.ts and add loading/error states
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const url = useMock ? '/mock/staff/test.json' : `${baseURL}/v1/staff`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.error('Fetch error:', error);
        alert('landing error');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-center">
      <h1 className="text-3xl font-bold text-blue-600 underline">
        Hello Tailwind!
      </h1>
    </div>
  );
}

export default App;
