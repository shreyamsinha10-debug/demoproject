import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const heroImages = [
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1600&q=80",
];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "Premium sound with noise cancellation",
    price: 999,
    category: "audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Smartwatch Pro",
    description: "Advanced health tracking smartwatch",
    price: 2499,
    category: "mobile",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "USB-C Cable",
    description: "Fast charging and data transfer",
    price: 299,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1587135991058-8816c58ac6cc?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Portable Speaker",
    description: "12-hour battery, waterproof",
    price: 1999,
    category: "audio",
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Phone Stand",
    description: "Adjustable universal stand",
    price: 649,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Screen Protector",
    description: "Tempered glass protection",
    price: 149,
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

export default function Home2() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [heroIndex, setHeroIndex] = useState(0);
  const [cart, setCart] = useState({});
  const [form, setForm] = useState({
    salutation: "Mr.",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
  });

  React.useEffect(() => {
    const id = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar dark={false} />

      <section className="relative pt-28">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900">
            {heroImages.map((image, idx) => (
              <motion.img
                key={image}
                src={image}
                alt="Tech products banner"
                initial={false}
                animate={{ opacity: heroIndex === idx ? 1 : 0, scale: heroIndex === idx ? 1 : 1.05 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
            <div className="relative z-10 flex h-[360px] flex-col items-center justify-center bg-slate-900/45 px-6 text-center">
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">Welcome to TechStore</h1>
              <p className="mt-4 text-base text-slate-200 sm:text-lg">Modern tech. Smarter shopping.</p>
              <a href="#products" className="mt-7 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-400">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat.value ? "bg-indigo-600 text-white" : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm">
          🛒 Items: <span className="font-semibold">{totalQty}</span> | Total: <span className="font-semibold">Rs. {totalPrice}</span>
        </div>
      </section>

      <section id="products" className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Featured Products</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id]}
              onAdd={() => updateQty(product.id, 1)}
              onRemove={() => updateQty(product.id, -1)}
            />
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto mb-14 w-full max-w-4xl px-5 sm:px-8">
        <h2 className="text-center text-3xl font-semibold text-slate-900">Contact Us</h2>
        <div className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 sm:grid-cols-[100px_1fr_1fr]">
            <select
              value={form.salutation}
              onChange={(e) => setForm((prev) => ({ ...prev, salutation: e.target.value }))}
              className="h-12 rounded-xl border border-slate-200 px-3"
            >
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
            <input
              value={form.firstName}
              onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
              className="h-12 rounded-xl border border-slate-200 px-3"
              placeholder="First Name*"
            />
            <input
              value={form.lastName}
              onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
              className="h-12 rounded-xl border border-slate-200 px-3"
              placeholder="Last Name*"
            />
          </div>
          <p className="mt-2 text-sm text-rose-500">{form.firstName || form.lastName ? nameError : ""}</p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="flex h-12 items-center overflow-hidden rounded-xl border border-slate-200">
              <span className="border-r border-slate-200 px-3 text-slate-500">+91</span>
              <input
                value={form.mobile}
                onChange={(e) => setForm((prev) => ({ ...prev, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))}
                className="h-full w-full px-3 outline-none"
                placeholder="Mobile Number*"
              />
            </div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="h-12 rounded-xl border border-slate-200 px-3"
              placeholder="Email ID*"
            />
          </div>
          <p className="mt-2 text-sm text-rose-500">{form.mobile || form.email ? contactError : ""}</p>

          <textarea
            value={form.message}
            onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="Message (optional)"
            className="mt-4 h-28 w-full rounded-xl border border-slate-200 p-3"
          />

          <div className="mt-6 text-center">
            <button
              type="button"
              disabled={!isFormValid}
              className="rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition enabled:hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Submit
            </button>
          </div>
        </div>
      </section>

      <Footer light />
    </main>
  );
}
