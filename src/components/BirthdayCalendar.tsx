import type { Staff } from '../types';
import { cn } from '../utils/misc';

interface BirthdayCalendarProps {
  staffByDay: Staff[][];
  currentDateIndex: number;
  dayIndexToMonthDayMap: { month: number; day: number }[];
  onSelect: (index: number) => void;
}

function BirthdayCalendar({
  staffByDay,
  currentDateIndex,
  dayIndexToMonthDayMap,
  onSelect,
}: BirthdayCalendarProps) {
  return (
    <div className="mt-20">
      {staffByDay.map((_, index) => {
        const { month, day } = dayIndexToMonthDayMap[index];
        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(index)}
            className={cn(
              'm-1 border',
              index === currentDateIndex && 'bg-blue-200',
            )}
          >
            {month}/{day}
          </button>
        );
      })}
    </div>
  );
}

export default BirthdayCalendar;
