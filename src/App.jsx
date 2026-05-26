/**
 * App.jsx — React Router DOM v6 Setup
 *
 * Architecture:
 *   BrowserRouter
 *     └─ AnimatedRoutes
 *          └─ AnimatePresence
 *               └─ Routes (key = location.pathname)
 *                    └─ Route path="/"  element={<PageTransition><Layout /></PageTransition>}   ← shared shell
 *                         ├─ Route index          → <PageTransition><Home /></PageTransition>
 *                         ├─ Route path="about"   → <PageTransition><About /></PageTransition>
 *                         ├─ Route path="services"→ <PageTransition><Services /></PageTransition>
 *                         ├─ Route path="projects"→ <PageTransition><Projects /></PageTransition>
 *                         ├─ Route path="contact" → <PageTransition><Contact /></PageTransition>
 *                         └─ Route path="*"       → <PageTransition><NotFound /></PageTransition>
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';

import Layout   from './components/Layout';
import Home     from './pages/Home';
import About    from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact  from './pages/Contact';

// ── 404 page ─────────────────────────────────────────────────────────────────
import NotFound from './pages/NotFound';

// ── Page Transition Component / مكون تأثير انتقال الصفحات ──────────────────────
// يلتف هذا المكون حول محتوى كل مسار لتوفير حركة سينمائية عند الدخول والخروج
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// ── Animated Routes Component / مكون المسارات المتحركة ────────────────────────
// يحتوي على منطق تحريك المسارات بالاعتماد على موقع المسار الحالي (location)
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/*
         * جميع الصفحات تشترك في هيكل التصميم الخارجي (Layout)
         * Layout renders: <Navbar> + <main><Outlet /></main> + <Footer>
         */}
        <Route path="/" element={<PageTransition><Layout /></PageTransition>}>
          <Route index          element={<PageTransition><Home /></PageTransition>} />
          <Route path="about"   element={<PageTransition><About /></PageTransition>} />
          <Route path="services"element={<PageTransition><Services /></PageTransition>} />
          <Route path="projects"element={<PageTransition><Projects /></PageTransition>} />
          <Route path="contact" element={<PageTransition><Contact /></PageTransition>} />
          {/* Catch-all 404 - صفحة الخطأ */}
          <Route path="*"       element={<PageTransition><NotFound /></PageTransition>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </LanguageProvider>
  );
}
