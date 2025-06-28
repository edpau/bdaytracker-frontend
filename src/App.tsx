import { useEffect, useState } from 'react';

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
}

function App() {
  const [staffByDay, setStaffByDay] = useState<Staff[][]>([]);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);

  // TODO: move fetch logic into api.ts and add loading/error states
  const fetchData = async () => {
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const url = useMock
      ? '/mock/staff/mock-staff-per-day.json'
      : `${baseURL}/v1/staff`;

    try {
      const response = await fetch(url);
      const json: Staff[][] = await response.json();
      console.log(json);
      if (!Array.isArray(json)) {
        throw new Error('API did not return an array');
      }
      setStaffByDay(json);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('landing error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const dayIndexToMonthDayMap = (() => {
    const result = [];
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let month = 0; month < daysInMonth.length; month++) {
      for (let day = 1; day <= daysInMonth[month]; day++) {
        result.push({ month: month + 1, day });
      }
    }
    console.log(result);
    return result;
  })();

  const handleSelectDate = (dateIndex: number) => {
    setCurrentDateIndex(dateIndex);
    console.log(dateIndex);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-center">
      <h1 className="text-3xl font-bold text-blue-600 underline">
        Staff Birthday
      </h1>

      <div className="border">
        <h2>
          {dayIndexToMonthDayMap[currentDateIndex].month}/
          {dayIndexToMonthDayMap[currentDateIndex].day}
        </h2>

        {!Array.isArray(staffByDay[currentDateIndex]) ||
        staffByDay[currentDateIndex].length === 0 ? (
          <p>No one birthday</p>
        ) : (
          <>
            <p>birthday star:</p>
            <ul>
              {staffByDay[currentDateIndex]?.map((staff) => (
                <li key={staff.id}>{`${staff.firstName} ${staff.lastName}`}</li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="mt-20">
        {staffByDay.map((_, index) => {
          const { month, day } = dayIndexToMonthDayMap[index];
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectDate(index)}
              className="m-1 border"
            >
              {month}/{day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
