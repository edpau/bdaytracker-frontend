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

// theme controller
const themes = ['light', 'dark', 'red'] as const;
type Theme = (typeof themes)[number];

function App() {
  const [staffByDay, setStaffByDay] = useState<Staff[][]>([]);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(todayIndex);

  const [theme, setTheme] = useState<Theme>('light');

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

  // theme controller
  useEffect(() => {
    // Remove all theme classes
    themes.forEach((t) => document.documentElement.classList.remove(t));
    // Add selected theme
    document.documentElement.classList.add(theme);
  }, [theme]);

  const handleSelectDate = (dateIndex: number): void => {
    setCurrentDateIndex(dateIndex);
  };

  const handleGoToToday = (): void => {
    setCurrentDateIndex(todayIndex);
  };

  const handleGoToNextBday = (): void => {
    if (staffByDay.length === 0) return;

    if (!staffByDay.some((day) => day.length > 0)) return;

    let nextIndex = (currentDateIndex + 1) % 366;

    while (staffByDay[nextIndex].length === 0) {
      nextIndex = (nextIndex + 1) % 366;
    }

    setCurrentDateIndex(nextIndex);
  };

  const handleGoToPrevBday = (): void => {
    if (staffByDay.length === 0) return;

    if (!staffByDay.some((day) => day.length > 0)) return;

    let prevIndex = (currentDateIndex - 1 + 366) % 366;

    while (staffByDay[prevIndex].length === 0) {
      prevIndex = (prevIndex - 1 + 366) % 366;
    }

    setCurrentDateIndex(prevIndex);
  };

  return (
    <div className="bg-background min-h-screen p-8 text-center">
      {/* theme controller */}
      <div className="flex flex-col items-center justify-center gap-4 text-white">
        <h1 className="text-3xl font-bold">Current Theme: {theme}</h1>
        <div className="flex gap-4">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className="rounded bg-white px-4 py-2 text-black shadow transition-transform hover:scale-105"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

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

      <div className="m-5 flex justify-center gap-3">
        <button className="border" type="button" onClick={handleGoToPrevBday}>
          previous
        </button>
        <button className="border" type="button" onClick={handleGoToToday}>
          Today
        </button>
        <button className="border" type="button" onClick={handleGoToNextBday}>
          Next
        </button>
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
