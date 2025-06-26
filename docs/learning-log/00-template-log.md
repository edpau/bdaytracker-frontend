# 📘 {NN} – {Title of Learning Log}

_A learning log documenting {what this covers — e.g., how I refactored fetch logic and improved data handling in the BdayTracker frontend}_.

📅 **Date Started**: YYYY-MM-DD  
🗂️ **Category**: {Topics — e.g., API Layer, Custom Hooks, State Management}

---

## 📚 Table of Contents

- [🔧 What I Worked On](#-what-i-worked-on)
- [💡 Key Takeaways](#-key-takeaways)
- [🧪 Code Examples](#-code-examples)
- [🔗 Reference Articles](#-reference-articles)
- [🚧 Next Learning Goal](#-next-learning-goal)

---

## 🔧 What I Worked On

Brief summary in bullet points:

- Did this...
- Refactored that...
- Tried different approach to handle...
- Used `.env` or other config changes...

---

## 💡 Key Takeaways

- One or two sentence insights or reminders
- Could include why something did/didn’t work
- E.g. “Avoid using `async` directly in `useEffect` — wrap it in an inner function.”

---

## 🧪 Code Examples

```ts
// Example of change or improvement
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    } catch (e) {
      console.error(e);
    }
  };
  fetchData();
}, []);

---
## 🔗 Reference Articles
| 📘 Title                          | 💬 Description                 | ⭐             |
| --------------------------------- | ------------------------------ | ------------- |
| [Link Title](https://example.com) | What it explains or helps with | ⭐ (if useful) |

---
## 🚧 Next Learning Goal
 What I want to try next

 Topic to learn deeper (e.g. useSWR, React Query, MSW, etc.)

 Idea to explore

---

```
