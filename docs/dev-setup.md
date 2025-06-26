# 🛠️ Frontend Development Setup

This document explains how the frontend project is configured with tools for styling, code formatting, and Git hygiene.  
It’s a reference for current contributors and for setting up future tooling (e.g. dark mode, Vitest, CI).

> 📁 This file complements the main [`README.md`](../README.md), which focuses on project overview and installation.

---

## 📦 Included Tools

| Tool         | Purpose                                      |
| ------------ | -------------------------------------------- |
| Tailwind CSS | Utility-first styling                        |
| Prettier     | Code formatting with Tailwind sorting        |
| ESLint       | Code linting for TypeScript/React            |
| Husky        | Git hooks to prevent bad commits             |
| lint-staged  | Run formatting/linting only on changed files |

## 🎨 Tailwind Setup (Plugin Method)

Tailwind is integrated using the plugin-based method:

- Installed:

  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```

- Configured in `vite.config.ts`:

  ```ts
  import tailwindcss from '@tailwindcss/vite';
  plugins: [react(), tailwindcss()];
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
