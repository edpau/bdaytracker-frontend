## 🛠️ Project Setup

This project uses:

- [Vite](https://vitejs.dev/) with React + TypeScript (`vite@6.3.5`)
- [Tailwind CSS](https://tailwindcss.com/) via `@tailwindcss/vite` plugin
- [Prettier](https://prettier.io/) with `prettier-plugin-tailwindcss`
- [ESLint](https://eslint.org/) for linting
- [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged) for **pre-commit formatting and lint checks**

---

## ✅ Setup Instructions

### 1. Clone and install

```bash
git clone https://github.com/edpau/bdaytracker-frontend.git
cd bdaytracker-frontend
npm install
```

---

### 2. Dev scripts

```bash
npm run dev       # Start dev server
npm run build     # Type-check + build
npm run preview   # Preview production build
npm run lint      # Manually run ESLint
```

---

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

---

## 🚦Next Steps (WIP)

- [ ] Add environment variable support via `.env`
- [ ] Add font and theme token support for light/dark mode
- [ ] Add CI check with ESLint + Prettier
- [ ] Connect to backend API (Spring Boot)

---
