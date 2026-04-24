import React from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BookOpenCheck, Handshake, Megaphone, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const services = [
  {
    title: "Deaf Awareness Training",
    description: "Practical education that strengthens confidence, communication, and inclusive workplace culture.",
    icon: BookOpenCheck,
  },
  {
    title: "NDIS Services",
    description: "Personalized support pathways designed to simplify access and improve long-term outcomes.",
    icon: Sparkles,
  },
  {
    title: "Advocacy",
    description: "Community-first advocacy that elevates lived experience and drives meaningful representation.",
    icon: Megaphone,
  },
  {
    title: "Partnerships",
    description: "Collaborative programs with schools and organizations to expand accessibility at scale.",
    icon: Handshake,
  },
];

const ease = [0.42, 0, 0.58, 1];
const fadeSlide = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } };

function GlassButton({ children, primary = false, className = "" }) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-500",
        primary
          ? "border-amber-300/60 bg-amber-300 text-slate-900 shadow-[0_10px_30px_rgba(250,204,21,0.25)] hover:shadow-[0_16px_36px_rgba(250,204,21,0.34)]"
          : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-amber-300/50 hover:bg-white/15 hover:shadow-[0_0_24px_rgba(250,204,21,0.18)]",
        className,
      ].join(" ")}
    >
      {children}
    </motion.button>
  );
}

function SectionHeading({ tag, title, subtitle }) {
  return (
    <motion.div variants={fadeSlide} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="max-w-2xl">
      <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] tracking-[0.18em] text-amber-200 uppercase backdrop-blur-md">
        {tag}
      </span>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{subtitle}</p>
    </motion.div>
  );
}

function HeroSection() {
  const prefersReduced = useReducedMotion();
  return (
    <section className="relative pt-36 pb-20 sm:pt-40 sm:pb-24">
      <motion.div variants={stagger} initial="hidden" animate="visible" className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <div>
          <motion.p variants={fadeSlide} className="text-sm text-slate-300">
            Inclusion, advocacy, and support
          </motion.p>
          <motion.h1 variants={fadeSlide} className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Empowering Deaf Communities
          </motion.h1>
          <motion.p variants={fadeSlide} className="mt-5 max-w-xl text-lg text-slate-300">
            Inclusion, Advocacy &amp; Support
          </motion.p>
          <motion.div variants={fadeSlide} className="mt-9 flex flex-wrap gap-4">
            <GlassButton primary>
              Get Started <ArrowRight className="h-4 w-4" />
            </GlassButton>
            <GlassButton>Learn More</GlassButton>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReduced ? false : { y: 0 }}
          animate={prefersReduced ? {} : { y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-amber-300/25 to-blue-400/20 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/20 bg-white/10 p-2.5 shadow-[0_18px_50px_rgba(4,12,38,0.5)] backdrop-blur-2xl">
            <div className="rounded-[1.5rem] border border-white/15 bg-[#0c1638] p-2">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80"
                alt="People using sign language in an inclusive community setting"
                className="h-[23rem] w-full rounded-[1.1rem] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          tag="Services"
          title="Carefully designed support services"
          subtitle="Modern, community-led services helping people and organizations become more inclusive."
        />

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={fadeSlide}
                whileHover={{ y: -6, scale: 1.05 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="group rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
              >
                <div className="mb-4 inline-flex rounded-xl border border-white/25 bg-white/10 p-3 text-amber-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function AboutQuoteCTA({ aboutImageY }) {
  return (
    <>
      <section className="py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease }}
            style={{ y: aboutImageY }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-3xl bg-gradient-to-br from-amber-300/25 to-blue-400/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl">
              <img src="/man.png" alt="Deafingo community representative" className="h-[24rem] w-full rounded-[1.25rem] object-cover object-top sm:h-[27rem]" loading="lazy" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 26 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.75, ease }}>
            <SectionHeading
              tag="About Deafingo"
              title="A platform built for inclusion and dignity"
              subtitle="Deafingo empowers Deaf and Hard of Hearing communities through practical support, strong advocacy, and trusted partnerships."
            />
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, ease }}
            className="rounded-3xl border border-white/20 bg-white/10 px-6 py-12 text-center shadow-[0_18px_44px_rgba(4,12,38,0.45)] backdrop-blur-xl sm:px-10"
          >
            <p className="text-xl leading-relaxed font-medium text-white sm:text-3xl">
              &ldquo;For two years I have avoided almost all social gatherings because it is impossible for me to say to people &lsquo;I am Deaf&rsquo;&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto w-full max-w-4xl px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease }}
            className="rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur-xl sm:p-14"
          >
            <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Building Inclusive Communities Together</h3>
            <GlassButton primary className="mt-8">
              Contact Us <ArrowRight className="h-4 w-4" />
            </GlassButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const blobOneY = useTransform(scrollY, [0, 1200], [0, 120]);
  const blobTwoY = useTransform(scrollY, [0, 1200], [0, -90]);
  const aboutImageY = useTransform(scrollY, [0, 1400], [0, -36]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0f2c] text-white antialiased">
      <motion.div style={{ scaleX: progressScaleX }} className="fixed top-0 left-0 right-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200" />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div style={{ y: blobOneY }} className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-amber-300/20 blur-[90px]" />
        <motion.div style={{ y: blobTwoY }} className="absolute top-1/3 right-0 h-[26rem] w-[26rem] rounded-full bg-blue-400/18 blur-[110px]" />
        <div className="absolute bottom-0 left-1/2 h-[20rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)] opacity-70 mix-blend-screen" />
      </div>

      <Navbar dark />
      <div className="relative">
        <HeroSection />
        <ServicesSection />
        <AboutQuoteCTA aboutImageY={aboutImageY} />
        <Footer />
      </div>
    </main>
  );
}
