# 08 - `cn()` Utility (Combining `clsx` + `tailwind-merge`)

---

## What is `cn()`?

`cn()` is a **helper utility function** that combines two popular tools to manage CSS class names in JavaScript/TypeScript apps—especially when using Tailwind CSS:

- **`clsx`**: Efficiently combines class names conditionally.
- **`tailwind-merge`**: Merges and deduplicates conflicting Tailwind CSS classes.

`cn()` wraps these together for a smooth developer experience when building UI components.

---

## Why Do We Need `cn()`?

### 1. Dynamic Class Names

When building components, you often want to **conditionally apply classes** based on props or state:

```tsx
const className = isActive ? 'bg-blue-500' : 'bg-gray-200';
```

But with many conditions, this quickly becomes messy.

`clsx` lets you write this cleanly:

```tsx
clsx('base-class', isActive && 'bg-blue-500', isDisabled && 'opacity-50');
```

It smartly joins only the classes that evaluate to true.

---

### 2. Handling Conflicting Tailwind Classes

Tailwind CSS works by composing utility classes, but some classes conflict or override others:

```tsx
<div className="p-2 p-4">...</div> // 'p-4' overrides 'p-2'
```

When classes are dynamically generated or merged from multiple sources, you might accidentally have conflicts like this.

`tailwind-merge` automatically detects and **resolves these conflicts**, keeping only the last class of each group that should apply.

Example:

```tsx
twMerge('p-2 p-4'); // Returns 'p-4'
twMerge('bg-red-500 bg-blue-500'); // Returns 'bg-blue-500'
```

---

## How Does `cn()` Work?

It combines both:

- Uses `clsx` to join conditional classes into a single string
- Passes the result to `twMerge` to merge conflicting Tailwind classes

---

### Typical `cn()` Implementation

```ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Parameters<typeof clsx>[0]) {
  return twMerge(clsx(...inputs));
}
```

- `...inputs` accepts the same arguments as `clsx` (strings, objects, arrays, etc.)
- `clsx` joins the classes
- `twMerge` cleans up conflicts

---

## Usage Examples

### Basic Conditional Classes

```tsx
<div
  className={cn(
    'text-base',
    isActive && 'font-bold',
    isDisabled && 'opacity-50',
  )}
>
  Hello
</div>
```

- Adds `'font-bold'` if `isActive` is true
- Adds `'opacity-50'` if `isDisabled` is true

### Resolving Conflicts

```tsx
<div className={cn('p-2', isLarge && 'p-4')}>Box</div>
```

- If `isLarge` is true, only `'p-4'` remains (because `twMerge` removes the conflicting `'p-2'`)

### With React Router NavLink

```tsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/dashboard"
  className={({ isActive }) => cn('underline', isActive && 'bg-blue-500')}
/>;
```

---

## Why Not Use Only `clsx` or Only `twMerge`?

- `clsx` doesn’t understand Tailwind conflicts — it just joins strings.
- `twMerge` merges Tailwind classes but doesn’t handle conditional logic or falsy values.

Using them together gives you **both benefits**: clean conditional class joining and conflict resolution.

---

## Summary

| Feature                   | `clsx` | `tailwind-merge` | `cn()` (both) |
| ------------------------- | ------ | ---------------- | ------------- |
| Conditional classes       | ✅     | ❌               | ✅            |
| Handling falsy values     | ✅     | ❌               | ✅            |
| Merge conflicting classes | ❌     | ✅               | ✅            |
| Ease of use               | ✅     | ✅               | ✅            |

---

## Final Tip

Add `cn()` as a small utility in your project, and **always use it for `className` in your React components** with Tailwind CSS. It makes your code:

- Cleaner
- More reliable
- Easier to maintain
