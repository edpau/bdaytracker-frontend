import { useEffect, useState } from 'react';

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
}

const getDayIndexFromDate = (date: Date = new Date()): number => {
  const utcMonth = date.getUTCMonth(); // 0-based
  const utcDay = date.getUTCDate(); // 1-based

  if (utcMonth < 0 || utcMonth > 11) {
    throw new Error(`Invalid Month: ${utcMonth}`);
  }

  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (utcDay < 1 || utcDay > daysInMonth[utcMonth]) {
    throw new Error(`Invalid Day: ${utcDay} for Month: ${utcMonth + 1}`);
  }

  const cumulativeDays = [
    0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335,
  ];

  const index = cumulativeDays[utcMonth] + utcDay - 1;

  if (index < 0 || index >= 366) {
    throw new Error('Unexpected error calculating day index');
  }

  return index;
};

const dayIndexToMonthDayMap: { month: number; day: number }[] = (() => {
  const result = [];
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let month = 0; month < daysInMonth.length; month++) {
    for (let day = 1; day <= daysInMonth[month]; day++) {
      result.push({ month: month + 1, day });
    }
  }
  return result;
})();

const todayIndex: number = getDayIndexFromDate();

function App() {
  const [staffByDay, setStaffByDay] = useState<Staff[][]>([]);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(todayIndex);

  // TODO: move fetch logic into api.ts and add loading/error states
  const fetchData = async (): Promise<void> => {
    const useMock = import.meta.env.VITE_USE_MOCK === 'true';
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const url = useMock
      ? '/mock/staff/mock-staff-per-day.json'
      : `${baseURL}/v1/staff`;

    try {
      const response = await fetch(url);
      const json: Staff[][] = await response.json();
      if (!Array.isArray(json)) {
        throw new Error('API did not return an array');
      }
      setStaffByDay(json);
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to load staff data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectDate = (dateIndex: number): void => {
    setCurrentDateIndex(dateIndex);
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
