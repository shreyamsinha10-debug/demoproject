import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -8, scale: 1.05 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-4 shadow-[0_12px_38px_rgba(2,6,23,0.45)] backdrop-blur-lg"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=900&q=80";
          }}
          className="h-44 w-full rounded-xl object-cover transition duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="mt-1 text-sm text-slate-300">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-amber-300">${product.price}</span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRemove}
              disabled={!quantity}
              className="h-8 w-8 rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-rose-500/80 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-medium text-slate-100">{quantity || 0}</span>
            <button
              type="button"
              onClick={onAdd}
              className="h-8 w-8 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 text-slate-900 transition hover:brightness-110"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
