import type { Staff } from '../types';

interface BirthdayDisplayProps {
  staffForDay: Staff[];
  month: number;
  day: number;
}

function BirthdayDisplay({ staffForDay, month, day }: BirthdayDisplayProps) {
  return (
    <div className="border">
      <h2>
        {month}/{day}
      </h2>

      {staffForDay.length === 0 ? (
        <p>No one birthday</p>
      ) : (
        <>
          <p>birthday star:</p>
          <ul>
            {staffForDay.map((staff) => (
              <li key={staff.id}>{`${staff.firstName} ${staff.lastName}`}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default BirthdayDisplay;
