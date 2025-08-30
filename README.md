# Tailwind CSS Setup in React + Vite

This guide explains how to add **Tailwind CSS** to an existing React project created with **Vite**.

---

## 1. Install Dependencies

In your project directory, run:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

This will create two files in your project:
- `tailwind.config.js`
- `postcss.config.js`

---

## 2. Configure `tailwind.config.js`

Edit the generated file to tell Tailwind where your React files live:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 3. Add Tailwind Directives to CSS

Open your main CSS file (usually `src/index.css` or `src/main.css`) and add:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 4. Import the CSS in Your App

Make sure your CSS is imported in the main entry file, typically `src/main.jsx`:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## 5. Start the Dev Server

Run:

```bash
npm run dev
```

---

## 6. Verify Tailwind

Open `App.jsx` and test with a Tailwind class:

```jsx
function App() {
  return (
    <h1 className="text-3xl font-bold underline text-blue-600">
      Hello Tailwind + Vite + React!
    </h1>
  )
}

export default App
```

If the text appears large, bold, underlined, and blue, Tailwind is working!

---

## Notes

- Use `npm run build` to create a production build with Tailwind’s purge feature automatically removing unused CSS.
- For more customization, see the [Tailwind Docs](https://tailwindcss.com/docs/installation).
