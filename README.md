# Abdulmalik Al-Salemi — Premium Developer Portfolio

Production-ready, strictly multi-page **React + Vite + Tailwind CSS** application with bilingual **English (LTR) / Arabic (RTL)** support.

---

## 🏗️ Architecture

```
React Router DOM v6
  BrowserRouter
    └─ Route "/"  →  Layout (Navbar + Outlet + Footer)
         ├─ /            →  Home.jsx
         ├─ /about       →  About.jsx
         ├─ /services    →  Services.jsx
         ├─ /projects    →  Projects.jsx
         ├─ /contact     →  Contact.jsx
         └─ /*           →  NotFound.jsx
```

**NOT** a single-page anchor-scroll site. Every URL is a discrete React component rendered via `<Routes>` + `<Route>`.

---

## 📁 Project Structure

```
/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                     ← ReactDOM.createRoot
    ├── App.jsx                      ← BrowserRouter + Routes
    ├── index.css                    ← Tailwind directives + global utilities
    ├── data.js                      ← Mock database (EN + AR content)
    ├── context/
    │   └── LanguageContext.jsx      ← EN↔AR state, dir/lang sync, useLanguage hook
    ├── components/
    │   ├── Layout.jsx               ← min-h-screen flex-col shell
    │   ├── Navbar.jsx               ← Fixed nav, scroll, hamburger, lang toggle
    │   ├── Footer.jsx               ← Brand + nav + social + copyright
    │   ├── GradientCard.jsx         ← Atomic gradient-border card
    │   ├── SectionWrapper.jsx       ← Consistent section padding
    │   └── PageHeading.jsx          ← Badge + heading + subtitle
    └── pages/
        ├── Home.jsx                 ← /
        ├── About.jsx                ← /about
        ├── Services.jsx             ← /services
        ├── Projects.jsx             ← /projects
        ├── Contact.jsx              ← /contact
        └── NotFound.jsx             ← /*
```

---

## ✅ Completed Features

### React Architecture
- `BrowserRouter` + `Routes` + discrete `<Route>` per page
- `Layout.jsx` with `min-h-screen flex flex-col` — no black gaps ever
- `ScrollRestoration` — scrolls to top on every route change

### Bilingual (i18n)
- `LanguageContext.jsx` — React Context + `useLanguage()` hook
- `t(enText, arText)` — inline translation helper
- `document.documentElement` `lang` + `dir` synced on toggle
- Font: **Outfit** (EN) → **Cairo** (AR)
- **Tailwind logical properties only**: `ps-`, `pe-`, `ms-`, `me-`, `text-start`, `start-`, `end-`

### Pages
| Route | Content |
|---|---|
| `/` | Hero, Testimonials grid, CTA banner |
| `/about` | Portrait, bio, info grid, Skills + animated progress bars |
| `/services` | 8 service cards, Process section |
| `/projects` | Filter tabs, SVG thumbnails, GitHub + Demo buttons |
| `/contact` | Info panel, validated form, loading/success states |

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

---

## 🔧 Next Steps

1. Replace SVG avatar with `public/portrait.jpg`
2. Connect Contact form to EmailJS / Formspree
3. Add Framer Motion page transitions
4. Add `react-helmet-async` for per-page SEO
5. Replace `data.js` with real API calls

---

*Copyright © 2025 Abdulmalik Al-Salemi | All Rights Reserved*
