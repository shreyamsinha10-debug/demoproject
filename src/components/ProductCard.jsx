import React from "react";
import { motion } from "framer-motion";

export default function ProductCard({ product, quantity, onAdd, onRemove }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-44 w-full rounded-xl object-cover"
        loading="lazy"
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">Rs. {product.price}</span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRemove}
              disabled={!quantity}
              className="h-8 w-8 rounded-md bg-rose-500 text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-medium text-slate-700">{quantity || 0}</span>
            <button type="button" onClick={onAdd} className="h-8 w-8 rounded-md bg-emerald-500 text-white">
              +
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
