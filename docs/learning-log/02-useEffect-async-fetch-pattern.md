# ⚛️ 02 – useEffect, async/await, and Error Handling

This document explains why you **cannot use `async` directly on `useEffect`**, how to properly **handle async fetches and errors**, and why `Array.isArray()` is used to **validate API responses**. This is based on real-world lessons learned when building the Birthday Viewer MVP.

---

## ⚠️ Why `useEffect` Cannot Be `async`

React's `useEffect` **must return either `void` or a cleanup function**. If you write `async () => {}`, the function implicitly returns a `Promise`, which breaks this rule.

### ❌ Invalid

```tsx
useEffect(async () => {
  const data = await fetch(...);
}, []);
```

This causes **React warnings** and may result in **unexpected behavior**.

### ✅ Correct Pattern

Instead, define an `async` function **inside** the effect and call it:

```tsx
useEffect(() => {
  const fetchData = async () => {
    // your async logic here
  };

  fetchData();
}, []);
```

---

## ✅ Why You Must Use `try/catch` _Inside_ the Async Function

This is another common mistake:

```tsx
try {
  fetchData(); // ❌ won't throw here — only returns a Promise
} catch (error) {
  console.error(error); // ❌ will not catch fetch/await errors
}
```

If an error happens **inside** `fetchData`, it won’t be caught here because `useEffect` doesn't `await` anything.

### ✅ Correct

```tsx
const fetchData = async () => {
  try {
    const response = await fetch(...);
    const json = await response.json();
    setState(json);
  } catch (error) {
    console.error('Fetch error:', error);
    alert('Failed to load staff data. Please try again later.');
  }
};

useEffect(() => {
  fetchData(); // no await needed here
}, []);
```

---

## ✅ Summary

- ❌ Don’t make `useEffect` itself `async`
- ✅ Define and call an async function **inside** `useEffect`
- ✅ Wrap all `await` calls in `try/catch` inside that function

---

## 🧪 What `Array.isArray(json)` Protects Against

```js
if (!Array.isArray(json)) {
  throw new Error('API did not return an array');
}
```

Even though your mock API returns something like:

```json
[{ "id": 1, "firstName": "Anna", "lastName": "Lee", "birthday": "2000-01-01" }]
```

...in the real world, things can go wrong. Example issues:

| ❌ What could go wrong                    | 🧨 Example return          |
| ----------------------------------------- | -------------------------- |
| The API returns a single object           | `{ "error": "Not found" }` |
| You hit the wrong URL                     | `"404 Not Found"` (string) |
| Backend changes its response shape        | `{ data: [...] }`          |
| Network layer sends a null/empty response | `null`                     |

Using `Array.isArray()` is a **lightweight sanity check**.

---

## 📌 Note: Replace with Schema Validation (Later)

In the future, consider using [`zod`](https://github.com/colinhacks/zod) to fully validate the API response shape:

```ts
const StaffArray = z.array(
  z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
  }),
);
```

But for MVP, `Array.isArray()` is **good enough** and avoids extra complexity.

---

✅ **Conclusion**: Mastering `useEffect` + `async` + error handling is essential to building reliable React apps. Avoid async in the effect body, always catch errors where they happen, and validate your data to avoid silent bugs.
