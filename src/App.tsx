import React from 'react';
import { useEffect, useState } from 'react';

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
}

function App() {
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    // TODO: move fetch logic into api.ts and add loading/error states
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const url = useMock ? '/mock/staff/test.json' : `${baseURL}/v1/staff`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json: Staff[] = await response.json();
        console.log(json);
        if (!Array.isArray(json)) {
          throw new Error('API did not return an array');
        }
        setStaffList(json);
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
        Staff Birthday
      </h1>
      {staffList.map((staff) => (
        <React.Fragment key={staff.id}>
          <p>{staff.firstName}</p>
          <p>{staff.lastName}</p>
          <p>{staff.birthday}</p>
        </React.Fragment>
      ))}
    </div>
  );
}

export default App;
