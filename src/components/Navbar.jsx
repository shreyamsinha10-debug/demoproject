import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar({ dark = true, brand = "Deafingo" }) {
  const base = dark
    ? "border-white/10 bg-[#0c1433]/80 text-white"
    : "border-slate-200 bg-white/90 text-slate-900";

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${base}`}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <nav className="flex h-16 items-center justify-between">
          <NavLink to="/" className="text-lg font-semibold tracking-tight">
            {brand}
          </NavLink>

          <div className="flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition ${isActive ? "text-amber-300" : dark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`
              }
            >
              Deafingo
            </NavLink>
            <NavLink
              to="/home2"
              className={({ isActive }) =>
                `transition ${isActive ? "text-amber-300" : dark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"}`
              }
            >
              TechStore
            </NavLink>
          </div>

          <motion.button
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`rounded-full border px-5 py-2 text-xs font-medium transition sm:text-sm ${
              dark
                ? "border-amber-300/45 bg-white/5 text-amber-200 hover:bg-white/10"
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
