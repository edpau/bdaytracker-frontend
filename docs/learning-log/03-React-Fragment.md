# 03 – Using React.Fragment & Import Rules

## 🧩 Why Use `React.Fragment`

When rendering multiple elements — especially inside a `.map()` loop — you must wrap them in a **single parent**. Using a `<div>` works, but it adds unnecessary nodes to the DOM.

✅ **Better solution:** Use `<React.Fragment>` (or shorthand `<>...</>`) to group without adding extra markup.

### Example:

```tsx
{
  staffList.map((staff) => (
    <React.Fragment key={staff.id}>
      <p>{staff.firstName}</p>
      <p>{staff.lastName}</p>
    </React.Fragment>
  ));
}
```

### ✅ Benefit:

- No extra `<div>` clutter in the DOM
- Still allows a `key` prop for each fragment (which shorthand `<>` doesn't)

---

## ⚙️ React 17+ and `import React`

Since **React 17**, the new JSX transform means you **no longer need to import `React`** at the top of the file just to use JSX.

✅ This works now:

```tsx
const element = <h1>Hello</h1>;
```

However… 👇

### ❗ You **still need to import `React`** if you use things like:

- `React.Fragment`
- `React.Children`
- `React.cloneElement`
- Other advanced React APIs

---

## 💡 So in real projects:

It’s still common to write:

```tsx
import React from 'react';
```

…especially if you use `React.Fragment` (like in the example above).

---

## 📌 Summary

| Feature                    | Needs `import React`? |
| -------------------------- | --------------------- |
| Basic JSX (React 17+)      | ❌ No                 |
| `<React.Fragment>`         | ✅ Yes                |
| `<>...</>` (shorthand)     | ❌ No (but no `key`)  |
| `React.cloneElement`, etc. | ✅ Yes                |
