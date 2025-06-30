# 🛠️ Frontend Development Setup

This document explains how the frontend project is configured with tools for styling, code formatting, and Git hygiene.  
It’s a reference for current contributors and for setting up future tooling (e.g. dark mode, Vitest, CI).

> 📁 This file complements the main [`README.md`](../README.md), which focuses on project overview and installation.

---

## 📦 Included Tools

| Tool           | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| Tailwind CSS   | Utility-first styling                                   |
| Prettier       | Code formatting with Tailwind sorting                   |
| ESLint         | Code linting for TypeScript/React                       |
| Husky          | Git hooks to prevent bad commits                        |
| lint-staged    | Run formatting/linting only on changed files            |
| `cn()` utility | Conditional and conflict-free Tailwind class management |

## 🎨 Tailwind Setup (Plugin Method)

Tailwind is integrated using the plugin-based method:

- Installed:

  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```

- Configured in `vite.config.ts`:

  ```ts
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import tailwindcss from '@tailwindcss/vite';

  export default defineConfig({
    plugins: [react(), tailwindcss()],
  });
  ```

- CSS entry (`src/index.css`):

  ```css
  @import 'tailwindcss';

  * {
    @apply transition-colors duration-300;
  }
  ```

---

## 🧹 Code Style: Prettier + Tailwind Plugin

- Installed:

  ```bash
  npm install -D prettier prettier-plugin-tailwindcss
  ```

- `.prettierrc` includes:

  ```json
  {
    "singleQuote": true,
    "semi": true,
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```

---

## 🎨 Color Theme System with Tailwind v4

- [07 - Tailwind CSS v4 – Multi-Theme Color System (No `tailwind.config.js` Required)](./learning-log/07-Tailwind_multi-theme-color-system.md)

---

## 🛡 Husky + lint-staged Pre-commit Hook

To ensure code is always linted and formatted before committing:

### Installed:

```bash
npm install -D husky lint-staged
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```

### `.husky/pre-commit`

```sh
#!/bin/sh
npx lint-staged
```

> ⚠️ Legacy `husky.sh` line removed — ready for Husky v10.

---

### `package.json` → lint-staged config:

```json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix"],
  "*.{js,jsx,ts,tsx,json,css,md}": ["prettier --write"]
}
```

---

## ⚙️ Conditional Class Management: cn() Utility

To handle conditional and conflicting Tailwind CSS classes smoothly, the project uses a custom utility combining clsx and tailwind-merge.

- Source: [`src/utils/misc.ts`](src/utils/misc.ts)

### Installed:

```bash
npm install clsx tailwind-merge
```

### Utility function example (src/utils/misc.ts or src/lib/utils.ts):

```tsx
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
```

### Usage:

```tsx
import { cn } from './utils/misc';

function MyButton({ isActive }: { isActive: boolean }) {
  return (
    <button className={cn('base-class', isActive && 'active-class')}>
      Click me
    </button>
  );
}
```
