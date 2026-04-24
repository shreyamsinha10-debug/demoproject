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

const radarParticles = [
  { top: "16%", left: "14%", size: 6, delay: 0.1, duration: 2.8 },
  { top: "22%", left: "70%", size: 5, delay: 0.4, duration: 3.1 },
  { top: "36%", left: "84%", size: 4, delay: 0.2, duration: 2.6 },
  { top: "42%", left: "20%", size: 5, delay: 0.8, duration: 3.3 },
  { top: "58%", left: "63%", size: 6, delay: 0.5, duration: 2.9 },
  { top: "64%", left: "31%", size: 4, delay: 0.3, duration: 2.7 },
  { top: "74%", left: "78%", size: 5, delay: 0.9, duration: 3.4 },
  { top: "80%", left: "48%", size: 4, delay: 0.6, duration: 2.5 },
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

function ShopContextSection() {
  const items = [
    {
      title: "Quality Picks",
      description: "Curated gadgets chosen for reliability, performance, and value across daily use.",
    },
    {
      title: "Fast Support",
      description: "Simple pre-sales guidance and clear communication to help you buy with confidence.",
    },
    {
      title: "Smart Value",
      description: "Competitive pricing and practical products that balance quality with affordability.",
    },
  ];

  return (
    <motion.section
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      className="mx-auto mt-12 w-full max-w-7xl px-5 sm:px-8"
    >
      <div className="rounded-3xl border border-cyan-200/20 bg-[#0b3470]/45 p-6 backdrop-blur-xl sm:p-8">
        <p className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1 text-[11px] tracking-[0.18em] text-amber-200 uppercase">
          Why TechStore
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Better tech shopping with clarity and trust
        </h3>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-cyan-200/20 bg-[#0c3a78]/50 p-5">
              <p className="text-lg font-semibold text-amber-200">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

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
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#03112b] via-[#062a5e] to-[#041a38] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div style={{ y: blobOneY }} className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-cyan-300/24 blur-[95px]" />
        <motion.div style={{ y: blobTwoY }} className="absolute top-1/3 right-0 h-[24rem] w-[24rem] rounded-full bg-sky-400/24 blur-[110px]" />
        <motion.div style={{ y: blobThreeY }} className="absolute bottom-0 left-1/2 h-72 w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.26),transparent_70%)]" />
        <motion.div
          style={{ y: meshY }}
          animate={{ opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(14,165,233,0.2),transparent_32%),radial-gradient(circle_at_50%_75%,rgba(59,130,246,0.2),transparent_38%)]"
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
            className="relative overflow-hidden rounded-3xl border border-cyan-200/20 bg-[#0a2d63]/55 shadow-[0_22px_70px_rgba(6,28,75,0.55)] backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#052050] via-[#0a3f84] to-[#06295a]" />
            <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10" />
            <div className="absolute top-1/2 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/20" />
            <div className="absolute top-1/2 left-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/25" />
            <div className="absolute top-16 left-14 h-36 w-36 rounded-full border border-cyan-300/15" />
            <div className="absolute top-20 left-[4.35rem] h-28 w-28 rounded-full border border-cyan-300/20" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(56,189,248,0.22),transparent_25%,transparent_100%)] blur-sm"
            />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 left-8 h-44 w-44 rounded-full bg-[conic-gradient(from_0deg,rgba(56,189,248,0.22),transparent_22%,transparent_100%)] blur-[1px]"
            />
            {radarParticles.map((dot, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0.25, scale: 0.85 }}
                animate={{ opacity: [0.25, 0.85, 0.25], scale: [0.85, 1.15, 0.85] }}
                transition={{
                  duration: dot.duration,
                  delay: dot.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute rounded-full bg-cyan-200 shadow-[0_0_16px_rgba(103,232,249,0.9)]"
                style={{
                  top: dot.top,
                  left: dot.left,
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                }}
              />
            ))}
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
        <div className="flex flex-wrap gap-2 rounded-full border border-cyan-200/20 bg-[#0b3470]/45 p-2 backdrop-blur-xl">
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

        <div className="rounded-xl border border-cyan-200/20 bg-[#0b3470]/45 px-4 py-2 text-sm text-slate-100 backdrop-blur-xl">
          🛒 Items: <span className="font-semibold">{totalQty}</span> | Total: <span className="font-semibold">${totalPrice}</span>
        </div>
      </motion.section>

      <ShopContextSection />

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
        <div className="mt-8 rounded-3xl border border-cyan-200/20 bg-[#0b3470]/45 p-6 shadow-[0_18px_50px_rgba(2,6,23,0.5)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-4 sm:grid-cols-[100px_1fr_1fr]">
            <select
              value={form.salutation}
              onChange={(e) => setForm((prev) => ({ ...prev, salutation: e.target.value }))}
              className="h-12 rounded-xl border border-cyan-200/20 bg-[#0b3d80]/55 px-3 text-slate-100 outline-none focus:border-cyan-300/60"
            >
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
            <input
              value={form.firstName}
              onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
              className="h-12 rounded-xl border border-cyan-200/20 bg-[#0b3d80]/55 px-3 text-slate-100 outline-none placeholder:text-slate-300 focus:border-cyan-300/60 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.16)]"
              placeholder="First Name*"
            />
            <input
              value={form.lastName}
              onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
              className="h-12 rounded-xl border border-cyan-200/20 bg-[#0b3d80]/55 px-3 text-slate-100 outline-none placeholder:text-slate-300 focus:border-cyan-300/60 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.16)]"
              placeholder="Last Name*"
            />
          </div>
          <p className="mt-2 text-sm text-rose-500">{form.firstName || form.lastName ? nameError : ""}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex h-12 items-center overflow-hidden rounded-xl border border-cyan-200/20 bg-[#0b3d80]/55">
              <span className="border-r border-cyan-200/20 px-3 text-slate-300">+91</span>
              <input
                value={form.mobile}
                onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                className="h-full w-full bg-transparent px-3 text-slate-100 outline-none placeholder:text-slate-300"
                placeholder="Mobile Number*"
              />
            </div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="h-12 rounded-xl border border-cyan-200/20 bg-[#0b3d80]/55 px-3 text-slate-100 outline-none placeholder:text-slate-300 focus:border-cyan-300/60 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.16)]"
              placeholder="Email ID*"
            />
          </div>
          <p className="mt-2 text-sm text-rose-500">{form.mobile || form.email ? contactError : ""}</p>

          <textarea
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="Message (optional)"
            className="mt-4 h-28 w-full rounded-xl border border-cyan-200/20 bg-[#0b3d80]/55 p-3 text-slate-100 outline-none placeholder:text-slate-300 focus:border-cyan-300/60 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.16)]"
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
