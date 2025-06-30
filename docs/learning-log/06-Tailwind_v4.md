# 🌈 06 - Tailwind CSS v4 Notes – CSS-First Configuration, Breakpoints, Themes & Resources

Tailwind CSS v4 introduces a new **CSS-first configuration system**, removing the need for `tailwind.config.js` and even `tsconfig.json` in many setups. This note documents how to customize your theme using global CSS via `@theme`, how to redefine breakpoints, and how to prevent flicker when switching themes like light/dark/red.

---

## 📦 CSS-First Setup

Tailwind v4 now supports full theme customization inside CSS using `@theme` and CSS variables. You no longer need `tailwind.config.js` or `tsconfig.json` for basic configuration.

```css
@import 'tailwindcss';

@theme {
  /* 🧱 Redefine all breakpoints (replaces default completely) */
  --breakpoint-*: initial; /* Clears all built-in breakpoints */
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 976px;

  /* 🎨 Define your custom color variables */
  --color-background: rgba(var(--background));
}
```

> ⚠️ Note: Using `--breakpoint-* : initial;` resets all default breakpoints. You must define all the ones you intend to use manually.

---

## 🎨 Custom Themes with CSS Variables

Tailwind v4 encourages defining themes using classes and CSS variables:

```css
:root {
  --background: 21, 21, 20; /* fallback if no class applied */
}

.light {
  --background: 242, 237, 208;
}

.dark {
  --background: 0, 0, 0;
}

.red {
  --background: 225, 76, 76;
}
```

Then use in JSX/HTML:

```tsx
<div className="bg-background text-white">Current Theme</div>
```

And Tailwind will automatically use:

```css
background-color: var(--color-background);
```

---

## 🚫 Prevent Theme Flicker on Page Load

To avoid a flicker between the default theme and the user’s saved theme (e.g., "red"), inject the theme class into `<html>` **before** Tailwind CSS runs.

### In `index.html` (before main script):

```html
<script>
  try {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }
  } catch (_) {}
</script>
```

> This ensures the theme class (`.dark`, `.light`, `.red`) is applied **before React renders or Tailwind CSS loads**, preventing a flash of incorrect background color.

---

## 🧠 Summary Table

| Feature / Concept          | Tailwind v4 CSS-First Way             | Tailwind v3 (JS Config) Way       |
| -------------------------- | ------------------------------------- | --------------------------------- |
| Theme configuration        | `@theme` in global CSS                | `tailwind.config.js`              |
| Custom colors              | Use `--color-*` variables             | Extend `theme.colors`             |
| Breakpoints                | `--breakpoint-*` in CSS               | Extend `theme.screens`            |
| Light/dark/red modes       | Use `.light`, `.dark`, `.red` classes | Use `darkMode: 'class'` in config |
| Transitions between themes | Via `@apply transition-colors`        | Must be added manually            |
| Config file required?      | ❌ Not required                       | ✅ Required                       |
| Prevent flicker            | ✅ Inject theme class early           | ⚠️ Not automatically handled      |

---

## 📺 Video References

- [Tailwind v4 Is FINALLY Out – Here’s What’s New (and how to migrate!)](https://www.youtube.com/watch?v=ud913ekwAOQ)  
  📌 Overview of major new features and migration advice for upgrading to Tailwind v4

- [The NEW CSS-first configuration with Tailwind CSS v4 (No more tailwind.config.js)](https://www.youtube.com/watch?v=bupetqS1SMU&t=2s)  
  📌 Deep dive into the CSS-first configuration system and how to use `@theme`

- [The Best Way to Handle Dark Mode with TailwindCSS (v3)](https://www.youtube.com/watch?v=vIBKSmWAdIA&t=44s)  
  📌 Still useful background on how to structure theme switching logic (now replaceable with CSS variables)

- [Tailwind DOCS – Theme variable namespaces](https://tailwindcss.com/docs/theme#theme-variable-namespaces)  
  📌 Official docs on how to scope theme variables and use multiple theme layers

---
