# 📘 01 – Frontend Setup & Fetching

_A learning log documenting how I set up the frontend stack for the BdayTracker project, configured `.env`-based mock/backend switching, and linked useful resources._

📅 **Date Started**: 2025-06-25  
🗂️ **Category**: Frontend Setup, Data Layer, Environment Config

---

## 📚 Table of Contents

- [⚙️ React App Initial Setup](#️-react-app-initial-setup)
- [🌐 Working with External Data](#-working-with-external-data)
- [🚧 Next Learning Goal](#-next-learning-goal)

---

<!-- TODO ADD useEffect learning, the try catch, and why not use async directly on useEffect -->

## ⚙️ React App Initial Setup

Brief setup steps:

- Created the project with **Vite + React + TypeScript**
- Installed and configured **Tailwind CSS** using the plugin method
- Added **Prettier** with `prettier-plugin-tailwindcss`
- Set up **ESLint** for linting
- Enabled **Husky + lint-staged** for pre-commit formatting checks
- Created a `.env` system to toggle between mock data and backend

---

## 🌐 Working with External Data

### 🧪 Fetching Mock Data

Configured `.env` to load mock JSON data from `public/mock/...` when `VITE_USE_MOCK=true`.

```ts
const useMock = import.meta.env.VITE_USE_MOCK === 'true';
const baseURL = import.meta.env.VITE_API_BASE_URL;
const url = useMock ? '/mock/staff/today.json' : `${baseURL}/staff/today`;
```

### 🔌 Fetching from Backend

When VITE_USE_MOCK=false, the app uses VITE_API_BASE_URL to fetch from the Spring Boot backend.

### 📝 Notes on Environment Files

- `.env` is loaded in all environments by default
- `.env.local` is for your local-only overrides (not committed)
- `.env.production` is used during vite build or deployment
- This setup is helpful for working with teammates who need different API base URLs or flags like VITE_USE_MOCK
- Don’t forget to restart the dev server after changing `.env` files

### 🔗 Reference Articles

| 📘 Title                                                                                                                                                   | 💬 Description                                           | ⭐  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | --- |
| [Fetching Data From Fake APIs In The React Environment](https://medium.com/@whereanna7/fetching-data-from-fake-apis-in-the-react-environment-8820fd7bf563) | Covers multiple ways to fetch fake data in React apps    |     |
| [How to use async functions in useEffect (with examples)](https://devtrium.com/posts/async-functions-useeffect)                                            | Best practices and pitfalls for async `useEffect`        | ⭐  |
| [`.env` file in React JS (CRA-based)](https://medium.com/@bhairabpatra.iitd/env-file-in-react-js-09d11dc77924)                                             | Covers env usage in CRA, but not compatible with Vite    |     |
| [How to Use Environment Variables in React.js App with Vite](https://dev.to/ebereplenty/how-to-use-environment-variables-in-a-reactjs-app-with-vite-3lh0)  | Correct way to define and access `.env` in Vite projects |     |

---

## 🚧 Next Learning Goal

- [ ] Refactor fetch logic into reusable API module (`api.ts`)
- [ ] Explore how to handle loading/error states with custom hooks
- [ ] Learn how to mock fetches using MSW for tests/dev mode

---
