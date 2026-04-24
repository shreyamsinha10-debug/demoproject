import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ dark = true }) {
  const base = dark
    ? "border-white/20 bg-white/10 text-white"
    : "border-slate-200 bg-white/80 text-slate-900";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`mx-auto mt-3 w-[min(92%,1100px)] rounded-2xl border px-5 backdrop-blur-xl sm:px-7 ${base}`}>
        <nav className="flex h-16 items-center justify-between">
          <NavLink to="/" className="text-lg font-semibold tracking-tight">
            Deafingo
          </NavLink>

          <div className="flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${isActive ? "text-amber-300" : dark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/home2"
              className={({ isActive }) =>
                `transition ${isActive ? "text-amber-300" : dark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`
              }
            >
              Home 2
            </NavLink>
          </div>

          <motion.button
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-full border px-5 py-2 text-xs font-medium transition sm:text-sm ${
              dark
                ? "border-amber-300/50 bg-white/10 text-amber-200 hover:bg-white/15"
                : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
            }`}
          >
            Get Started
          </motion.button>
        </nav>
      </div>
    </header>
  );
}
