# 🎨 07 - Tailwind CSS v4 – Multi-Theme Color System (No `tailwind.config.js` Required)

This guide documents how to set up **custom color themes** (light, dark, red) using **CSS variables + Tailwind v4’s new CSS-first theming**. It allows for full theme switching with support for opacity like `bg-background/20`.

---

## ✅ Features

- No need for `tailwind.config.js`
- Uses native CSS variables
- Smooth transitions between themes
- React-friendly (theme controlled by state)
- Works with Tailwind utilities like `bg-background/20`

---

## 🧩 1. `index.css`

```css
@import 'tailwindcss';

@theme {
  /* Core theme variable */
  --color-background: rgba(var(--background));

  /* Optional extra token */
  --color-orange-500: #ffa500;
}

/* Transition for smoother theme color change */
* {
  @apply transition-colors duration-300;
}

/* Theme definitions */
.light {
  --background: 242, 237, 208;
}

.dark {
  --background: 21, 21, 20;
}

.red {
  --background: 225, 76, 76;
}
```

---

## ⚛️ 2. React Setup (Theme Controller)

### Theme Types

```tsx
const themes = ['light', 'dark', 'red'] as const;
type Theme = (typeof themes)[number];
```

### React Hook to Switch Theme

```tsx
const [theme, setTheme] = useState<Theme>('light');

useEffect(() => {
  // Remove old theme classes
  themes.forEach((t) => document.documentElement.classList.remove(t));
  // Apply the selected theme to <html>
  document.documentElement.classList.add(theme);
}, [theme]);
```

---

## 💡 3. Using Theme-Aware Colors in JSX

```tsx
<div className="bg-background min-h-screen p-8 text-center text-white">
  <h1 className="text-3xl font-bold">Current Theme: {theme}</h1>

  <div className="mt-4 flex justify-center gap-4">
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
```

- `bg-background` works because Tailwind v4 now supports custom CSS variables as valid theme tokens
- You can even do `bg-background/20`, `hover:bg-background/50`, etc.

---

## 🧪 Bonus: Add Local Storage (Optional)

```tsx
useEffect(() => {
  const saved = localStorage.getItem('theme') as Theme | null;
  if (saved && themes.includes(saved)) setTheme(saved);
}, []);

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);
```

---

## ✅ Summary Table

| Feature                | Method                                        |
| ---------------------- | --------------------------------------------- |
| Theme tokens           | `@theme` in `index.css`                       |
| Dynamic themes         | `.light`, `.dark`, `.red` classes on `<html>` |
| Background color usage | `bg-background`                               |
| Tailwind v4 support    | ✅ Native                                     |
| React integration      | `useState + useEffect`                        |
| Opacity variants       | `bg-background/50`, etc. work out of the box  |

---

## 📺 Video References

- [The NEW CSS-first configuration with Tailwind CSS v4 (No more tailwind.config.js)](https://www.youtube.com/watch?v=bupetqS1SMU&t=2s)  
  ▶️ Covers Tailwind v4's **CSS-first philosophy**: how to use `@theme`, CSS variables, and no `tailwind.config.js`.

- [The Best Way to Handle Dark Mode with TailwindCSS (v3)](https://www.youtube.com/watch?v=vIBKSmWAdIA&t=44s)  
  ▶️ Although based on Tailwind v3, this video gives useful background on how **theme toggling logic works** (which you can now adapt with CSS variables in v4)

---

## 🧠 Practical TypeScript typing

```ts
const themes = ['light', 'dark', 'red'] as const;
type Theme = (typeof themes)[number];
```

---

## ✅ Step-by-Step Breakdown

### 1. `as const`

```ts
const themes = ['light', 'dark', 'red'] as const;
```

This **locks** the array so its elements are treated as **literal types**, not just `string[]`.

- Without `as const` → `themes: string[]`
- With `as const` → `themes: readonly ['light', 'dark', 'red']`

Each element now has the exact type `"light"`, `"dark"`, and `"red"`, **not just `string`**.

---

### 2. `typeof themes`

This means: **give me the type of the `themes` variable**.

So:

```ts
typeof themes;
// is: readonly ["light", "dark", "red"]
```

---

### 3. `(typeof themes)[number]`

Now this part is the magic:

- You are indexing the tuple type using `number`
- In TypeScript, indexing an array type with `[number]` gives you the **union of all the element types**

```ts
type Theme = (typeof themes)[number];
```

Means:

```ts
Theme = 'light' | 'dark' | 'red';
```

---

## ✅ What You're Doing

You're defining a type `Theme` that can **only be one of the strings in the `themes` array**, and it's **derived directly from the array itself** — keeping them in sync.

---

### 📌 Summary Table

| Concept         | What It Does                                                  |
| --------------- | ------------------------------------------------------------- |
| `as const`      | Freezes the array to literal values                           |
| `typeof themes` | Gets the tuple type: `["light", "dark", "red"]`               |
| `[number]`      | Creates a union of all elements: `"light" \| "dark" \| "red"` |

---

## ✅ Why It's Awesome

This is safer and DRY:

- ✅ Your `Theme` type auto-updates if you add more to `themes`
- ✅ No manual `"light" | "dark" | "red"` duplication
- ✅ Works great in real apps for things like enums, routes, button styles, etc.
