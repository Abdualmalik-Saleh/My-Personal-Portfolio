/**
 * Layout.jsx
 * Root layout wrapper used by React Router's <Outlet>.
 * Contains: <Navbar />, <main> (flex-grow), <Footer />.
 * The `min-h-screen flex flex-col` ensures the footer sticks
 * to the bottom even on short pages — no black gaps, ever.
 */

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-white font-outfit">
      {/* Scroll to top on every route change */}
      

      {/* Fixed top navigation */}
      <Navbar />

      {/* Page content — grows to fill available height */}
      <main className="flex-grow pt-[70px]">
        <Outlet />
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}
