# 🎂 BdayTracker Frontend

A birthday calendar web app for internal company use.  
Built with Vite + React + Tailwind. Connects to a Spring Boot backend to display today’s and upcoming birthdays.

## 🛠️ Project Stack

![Vite](https://img.shields.io/badge/Vite-6.3.5-blueviolet)
![TypeScript](https://img.shields.io/badge/TypeScript-React-blue)
![Prettier](https://img.shields.io/badge/Prettier-enabled-lightgrey)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Enabled-38bdf8)
![Husky](https://img.shields.io/badge/Pre--commit-Husky-cc0000)

This project uses:

- [Vite](https://vitejs.dev/) with React + TypeScript (`vite@6.3.5`)
- [Tailwind CSS](https://tailwindcss.com/) via `@tailwindcss/vite` plugin
- [Prettier](https://prettier.io/) with `prettier-plugin-tailwindcss`
- [ESLint](https://eslint.org/) for linting
- [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/okonet/lint-staged) for **pre-commit formatting and lint checks**

📄 **Full developer setup:**  
👉 [`docs/dev-setup.md`](./docs/dev-setup.md)

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

## ⚙️ Environment Variables

Create a `.env` file in the project root. Here's the recommended setup:

```env
# Base API URL for local backend
VITE_API_BASE_URL=http://localhost:8080/api

# Toggle between using mock data or backend
VITE_USE_MOCK=true
```

📄 See `.env.example` for a template you can copy.

### 🔁 Don’t forget:

If you change `.env`, restart the dev server (`npm run dev`) for changes to take effect.

---

## 📒 Developer Notes

Personal learning logs documenting key decisions, setup patterns, and dev research.

- [01 – Frontend Setup & Fetching](./docs/learning-log/01-frontend-setup-and-fetching.md)
- [02 – useEffect, async/await, and Error Handling](./docs/learning-log/02-useEffect-async-fetch-pattern.md)
- [03 – Using React.Fragment & Import Rules](./docs/learning-log/03-React-Fragment.md)
- [04 – UTC vs Local Dates in JavaScript ](./docs/learning-log/04-Date-UTC-vs-Local.md)
- [05 – Birthday Tracker MVP Plan ](./docs/learning-log/05-birthday-tracker-mvp-plan.md)
- Coming soon: Testing log, dark mode design log, backend integration notes

---

## 🚦Next Steps (WIP)

- [x] Add environment variable support via `.env`
- [ ] Add font and theme token support for light/dark mode
- [ ] Add CI check with ESLint + Prettier
- [ ] Connect to backend API (Spring Boot)

---

## After MVP

- [ ]Add Zod later to validate backend data shape — helps catch unexpected API changes, ensures type safety, and avoids runtime bugs in production.
