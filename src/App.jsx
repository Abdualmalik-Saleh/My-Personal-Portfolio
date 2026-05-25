/**
 * App.jsx — React Router DOM v6 Setup
 *
 * Architecture:
 *   BrowserRouter
 *     └─ Routes
 *          └─ Route path="/"  element={<Layout />}   ← shared shell
 *               ├─ Route index          → <Home />
 *               ├─ Route path="about"   → <About />
 *               ├─ Route path="services"→ <Services />
 *               ├─ Route path="projects"→ <Projects />
 *               ├─ Route path="contact" → <Contact />
 *               └─ Route path="*"       → <NotFound />
 *
 * Layout.jsx wraps Navbar + <Outlet> + Footer.
 * Each page is a DISCRETE COMPONENT — no anchor-link routing.
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';

import Layout   from './components/Layout';
import Home     from './pages/Home';
import About    from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact  from './pages/Contact';

// ── 404 page ─────────────────────────────────────────────────────────────────
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/*
           * All real pages share the Layout shell.
           * Layout renders: <Navbar> + <main><Outlet /></main> + <Footer>
           */}
          <Route path="/" element={<Layout />}>
            <Route index          element={<Home />} />
            <Route path="about"   element={<About />} />
            <Route path="services"element={<Services />} />
            <Route path="projects"element={<Projects />} />
            <Route path="contact" element={<Contact />} />
            {/* Catch-all 404 */}
            <Route path="*"       element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
