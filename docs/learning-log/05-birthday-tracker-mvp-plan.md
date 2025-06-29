# 05 – Birthday Tracker MVP Plan

## This document outlines the core plan and logic behind the MVP of the Birthday Tracker frontend. The app reads a preprocessed array where each index (0–365) represents a day of the year, and contains an array of staff members with birthdays on that day.

## 📦 Data Structure

```ts
interface Staff {
  id: number;
  firstName: string;
  lastName: string;
}

// Main data shape: An array of 366 entries (leap year)
// birthdayData[0] = Jan 1 birthdays
// birthdayData[365] = Dec 31 birthdays

const staffByDay: Staff[][];
```

- **Leap year is always used** in the data format to simplify index alignment.
- Feb 29 is always included as index `59`, but UI can hide/show based on the actual current year.
  Empty arrays represent days with no birthdays.

---

## 🧠 Component

### 🖼️ `Display`

- Shows the list of staff with birthdays for the selected day.
- Receives one day’s array via props (e.g., `birthdayData[currentDateIndex]`).
- Shows full name and birthday.

### 📅 `Calendar`

- Displays a simple month view with buttons for each day.
- Disabled state for days with no birthdays.
- Clicking a day sets `currentDateIndex`.
- Starts on the current month; "Next" and "Prev" month supported.
- Optionally hide days outside the current month.
- Handles Feb 29:
  - Shown only if it’s a leap year or someone has a birthday on it.
  - Styled transparently if shown in a non-leap year.

### ⏩ `Next / Prev` Buttons

- Move `currentDateIndex` forward or backward to the next day *with birthdays*.
- Implementation uses simple array traversal (not a linked list).
- Efficient enough for MVP, easy to debug.
- Future: optimize with a linked list or date-index lookup map.

---

## 🧭 Logic Flow

### ⬇️ First Load

- Convert today’s date to `todayIndex` (0–365).
- Set `currentDateIndex = todayIndex`.

### 📌 Navigation State

- `todayIndex`: Tracks today (used by “Today” button).
- `currentDateIndex`: Tracks current view (updated by calendar or nav buttons).

---

## 💡 Implementation Notes

- **Use React state** to manage `currentDateIndex` and pass the corresponding array to `Display`.
- **Keep logic/data separated from UI** for better testing and code clarity.

---

## 🧠 Core Utility Logic

### Get Day Index (0–365) from Date

```tsx
const getDayIndexFromDate = (date: Date = new Date()): number => {
  const utcMonth = date.getUTCMonth();
  const utcDay = date.getUTCDate();

  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const cumulativeDays = [
    0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335,
  ];

  return cumulativeDays[utcMonth] + utcDay - 1;
};
```

### Precomputed Calendar Index Map

```tsx
const dayIndexToMonthDayMap = (() => {
  const result = [];
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (let month = 0; month < daysInMonth.length; month++) {
    for (let day = 1; day <= daysInMonth[month]; day++) {
      result.push({ month: month + 1, day });
    }
  }
  return result;
})();
```

---

## 📍 Navigation State

```tsx
const todayIndex = getDayIndexFromDate();
const [currentDateIndex, setCurrentDateIndex] = useState(todayIndex);
```

---

## ⏩ Navigation Buttons

### Go to Today

```tsx
const handleGoToToday = () => {
  setCurrentDateIndex(todayIndex);
};
```

### Go to Next Birthday

```tsx
const handleGoToNextBday = () => {
  if (staffByDay.length === 0) return;
  // Prevent infinite loop if there are no birthdays at all
  if (!staffByDay.some((day) => day.length > 0)) return;
  let nextIndex = (currentDateIndex + 1) % 366;
  while (staffByDay[nextIndex].length === 0) {
    nextIndex = (nextIndex + 1) % 366;
  }
  setCurrentDateIndex(nextIndex);
};
```

### Go to Previous Birthday

```tsx
const handleGoToPrevBday = () => {
  if (staffByDay.length === 0) return;
  // Prevent infinite loop if there are no birthdays at all
  if (!staffByDay.some((day) => day.length > 0)) return;
  let prevIndex = (currentDateIndex - 1 + 366) % 366;
  while (staffByDay[prevIndex].length === 0) {
    prevIndex = (prevIndex - 1 + 366) % 366;
  }
  setCurrentDateIndex(prevIndex);
};
```

---

## 🔹 Rendered Output

### Current Date Display

```tsx
<h2>
  {dayIndexToMonthDayMap[currentDateIndex].month}/
  {dayIndexToMonthDayMap[currentDateIndex].day}
</h2>
```

### Staff Birthday List

```tsx
<ul>
  {staffByDay[currentDateIndex]?.map((staff) => (
    <li key={staff.id}>
      {staff.firstName} {staff.lastName}
    </li>
  ))}
</ul>
```

### Calendar Buttons (1–366)

```tsx
{
  staffByDay.map((_, index) => {
    const { month, day } = dayIndexToMonthDayMap[index];
    return (
      <button key={index} onClick={() => setCurrentDateIndex(index)}>
        {month}/{day}
      </button>
    );
  });
}
```
