# 04 – UTC vs Local Dates in JavaScript

## 📅 Understanding JavaScript Dates for a Birthday Calendar

### 🔗 Reference Link

[How to get Day Month and Year from Date Object in JavaScript? – GeeksforGeeks](https://www.geeksforgeeks.org/javascript/how-to-get-day-month-and-year-from-date-object-in-javascript/)

---

## 🧩 Methods to Extract Date Parts from a `Date` Object

| Method                                                | Timezone Used                        | Example                   | Output (for same moment)                    |
| ----------------------------------------------------- | ------------------------------------ | ------------------------- | ------------------------------------------- |
| `getDate()` / `getMonth()` / `getFullYear()`          | **Local time**                       | `new Date().getDate()`    | Might be `25` in UK                         |
| `getUTCDate()` / `getUTCMonth()` / `getUTCFullYear()` | **UTC (Coordinated Universal Time)** | `new Date().getUTCDate()` | Might be `24` if you're 1 hour ahead of UTC |
| `date.toLocaleString('en-GB', options)`               | **Formatted local string**           | Custom formatting         | "25/06/2025"                                |

---

## ✅ Should I Use `UTC` in a Birthday Tracker App?

### ✅ Yes, using UTC is the best choice in my case.

### Here's why:

- My app uses a **global calendar** shared across users.
- Birthdays must be **mapped to a fixed index (0–365)** regardless of where the user is.
- Using local time might shift birthdays to the wrong day due to time zone differences (e.g., a birthday at midnight UTC+1 becomes "yesterday" in UTC).
- UTC gives me **deterministic, stable** results.

---

### 🧠 Example: Get Today’s Index Using UTC

```ts
const utcMonth = date.getUTCMonth(); // 0–11
const utcDay = date.getUTCDate(); // 1–31
```

This ensures that:

- 25 June is **always** index `175`
- Never shifts due to browser/device time zones

---

## 🔁 When Should I Use Local Time?

Use local time (`getDate()`, `getMonth()`, `getFullYear()`) only when:

- I want to show information **based on user's local clock**
- Examples:
  - Daily news or weather
  - Local event reminders
  - Calendar widgets tied to user timezone

---

## 📌 Summary

```ts
// ✅ For a global birthday viewer:
const day = date.getUTCDate();
const month = date.getUTCMonth();
const year = date.getUTCFullYear();
```

✅ Use UTC for consistency and correctness
⛔ Avoid using local time for birthday indexing

---
