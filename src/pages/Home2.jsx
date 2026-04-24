import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium sound with noise cancellation",
    price: 12,
    category: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Smartwatch Pro",
    description: "Advanced health tracking smartwatch",
    price: 30,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "USB-C Cable",
    description: "Fast charging and data transfer",
    price: 4,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Portable Speaker",
    description: "12-hour battery, waterproof",
    price: 24,
    category: "audio",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Phone Stand",
    description: "Adjustable universal stand",
    price: 8,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Screen Protector",
    description: "Tempered glass protection",
    price: 2,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1616410011236-7a42121dd981?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  { label: "All", value: "all" },
  { label: "Mobiles", value: "mobile" },
  { label: "Audio", value: "audio" },
  { label: "Accessories", value: "accessories" },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 38 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeInOut" },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export default function Home2() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState({});
  const [form, setForm] = useState({
    salutation: "Mr.",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
  });

  const filteredProducts = useMemo(
    () => products.filter((p) => activeCategory === "all" || p.category === activeCategory),
    [activeCategory]
  );

  const totalQty = useMemo(() => Object.values(cart).reduce((sum, qty) => sum + qty, 0), [cart]);

  const totalPrice = useMemo(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const product = products.find((p) => p.id === Number(id));
        return product ? sum + product.price * qty : sum;
      }, 0),
    [cart]
  );

  const nameError =
    form.firstName && form.lastName && /^[A-Za-z]+$/.test(form.firstName) && /^[A-Za-z]+$/.test(form.lastName)
      ? ""
      : "First & Last name must contain only alphabets";

  const contactError =
    /^\d{10}$/.test(form.mobile) && form.email.includes("@") && form.email.includes(".com")
      ? ""
      : "Enter a valid mobile number and email address";

  const isFormValid = !nameError && !contactError && form.firstName && form.lastName && form.mobile && form.email;
  const { scrollY } = useScroll();
  const blobOneY = useTransform(scrollY, [0, 1200], [0, 80]);
  const blobTwoY = useTransform(scrollY, [0, 1200], [0, -70]);
  const blobThreeY = useTransform(scrollY, [0, 1200], [0, 60]);
  const meshY = useTransform(scrollY, [0, 1200], [0, -40]);

  const updateQty = (productId, delta) => {
    setCart((prev) => {
      const next = { ...prev };
      const current = next[productId] || 0;
      const updated = current + delta;
      if (updated <= 0) {
        delete next[productId];
      } else {
        next[productId] = updated;
      }
      return next;
    });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0f2c] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div style={{ y: blobOneY }} className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-amber-300/16 blur-[95px]" />
        <motion.div style={{ y: blobTwoY }} className="absolute top-1/3 right-0 h-[24rem] w-[24rem] rounded-full bg-blue-400/18 blur-[110px]" />
        <motion.div style={{ y: blobThreeY }} className="absolute bottom-0 left-1/2 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]" />
        <motion.div
          style={{ y: meshY }}
          animate={{ opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.1),transparent_32%),radial-gradient(circle_at_50%_75%,rgba(99,102,241,0.1),transparent_38%)]"
        />
      </div>

      <Navbar dark brand="TechStore" />

      <section className="relative pt-20 sm:pt-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#10183d]/70 shadow-[0_20px_60px_rgba(2,6,23,0.55)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1135] via-[#090f2d] to-[#060a22]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-300/25"
            />
            <motion.div
              animate={{ x: ["-110%", "120%"] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 h-full w-28 bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.2),transparent)] blur-md"
            />
            <motion.div
              animate={{ y: ["-100%", "120%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 h-20 w-full bg-[linear-gradient(180deg,transparent,rgba(250,204,21,0.12),transparent)] blur-sm"
            />
            <motion.div
              animate={{ opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.2),transparent_62%)]"
            />
            <motion.div
              animate={{ opacity: [0.28, 0.45, 0.28] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.18),transparent_65%)]"
            />
            <motion.div
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 opacity-35 [background-image:linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.15)_50%,transparent_80%)] bg-[length:220%_220%]"
            />
            <div className="relative z-10 flex h-[420px] flex-col items-center justify-center px-6 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-4xl font-semibold tracking-tight text-white sm:text-6xl"
              >
                Welcome to TechStore
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: "easeInOut" }}
                className="mt-4 text-base text-slate-200 sm:text-xl"
              >
                Modern tech. Smarter shopping.
              </motion.p>
              <a
                href="#products"
                className="mt-8 rounded-full border border-amber-300/60 bg-amber-300 px-7 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_rgba(250,204,21,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(250,204,21,0.45)]"
              >
                Shop Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-12 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8"
      >
        <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/10 p-2 backdrop-blur-xl">
          {categories.map((cat) => {
            const active = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition ${
                  active ? "text-slate-900" : "text-slate-200 hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.35)]"
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100 backdrop-blur-xl">
          🛒 Items: <span className="font-semibold">{totalQty}</span> | Total: <span className="font-semibold">${totalPrice}</span>
        </div>
      </motion.section>

      <motion.section
        id="products"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8"
      >
        <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">Featured Products</h2>
        <motion.div variants={cardStagger} initial="hidden" animate="visible" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={sectionReveal}>
              <ProductCard
                product={product}
                quantity={cart[product.id]}
                onAdd={() => updateQty(product.id, 1)}
                onRemove={() => updateQty(product.id, -1)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        id="contact"
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mb-20 w-full max-w-4xl px-5 sm:px-8"
      >
        <h2 className="text-center text-3xl font-semibold text-white sm:text-4xl">Contact Us</h2>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.5)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-4 sm:grid-cols-[100px_1fr_1fr]">
            <select
              value={form.salutation}
              onChange={(e) => setForm((prev) => ({ ...prev, salutation: e.target.value }))}
              className="h-12 rounded-xl border border-white/15 bg-[#10183d]/70 px-3 text-slate-100 outline-none focus:border-amber-300/60"
            >
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
            <input
              value={form.firstName}
              onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
              className="h-12 rounded-xl border border-white/15 bg-[#10183d]/70 px-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-amber-300/60 focus:shadow-[0_0_0_2px_rgba(250,204,21,0.12)]"
              placeholder="First Name*"
            />
            <input
              value={form.lastName}
              onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
              className="h-12 rounded-xl border border-white/15 bg-[#10183d]/70 px-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-amber-300/60 focus:shadow-[0_0_0_2px_rgba(250,204,21,0.12)]"
              placeholder="Last Name*"
            />
          </div>
          <p className="mt-2 text-sm text-rose-500">{form.firstName || form.lastName ? nameError : ""}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex h-12 items-center overflow-hidden rounded-xl border border-white/15 bg-[#10183d]/70">
              <span className="border-r border-white/15 px-3 text-slate-400">+91</span>
              <input
                value={form.mobile}
                onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                className="h-full w-full bg-transparent px-3 text-slate-100 outline-none placeholder:text-slate-400"
                placeholder="Mobile Number*"
              />
            </div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="h-12 rounded-xl border border-white/15 bg-[#10183d]/70 px-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-amber-300/60 focus:shadow-[0_0_0_2px_rgba(250,204,21,0.12)]"
              placeholder="Email ID*"
            />
          </div>
          <p className="mt-2 text-sm text-rose-500">{form.mobile || form.email ? contactError : ""}</p>

          <textarea
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="Message (optional)"
            className="mt-4 h-28 w-full rounded-xl border border-white/15 bg-[#10183d]/70 p-3 text-slate-100 outline-none placeholder:text-slate-400 focus:border-amber-300/60 focus:shadow-[0_0_0_2px_rgba(250,204,21,0.12)]"
          />

          <div className="mt-6 text-center">
            <motion.button
              type="button"
              disabled={!isFormValid}
              animate={{ boxShadow: ["0 0 0px rgba(250,204,21,0.2)", "0 0 18px rgba(250,204,21,0.35)", "0 0 0px rgba(250,204,21,0.2)"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full bg-gradient-to-r from-amber-300 to-yellow-400 px-9 py-3 font-semibold text-slate-900 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Submit
            </motion.button>
          </div>
        </div>
      </motion.section>

      <Footer
        brand="TechStore"
        description="Premium gadgets, trusted quality, and seamless shopping experiences."
      />
    </main>
  );
}
