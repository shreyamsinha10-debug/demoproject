import React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Globe,
  Handshake,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Sparkles,
} from "lucide-react";
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
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } };

function GlassButton({ children, primary = false, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.04);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.04);
  };

  return (
    <motion.button
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ y: -1, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.55, ease: "easeInOut" }}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-500",
        primary
          ? "border-amber-300/70 bg-amber-300 text-slate-900 shadow-[0_10px_24px_rgba(250,204,21,0.2)] hover:shadow-[0_12px_28px_rgba(250,204,21,0.3)]"
          : "border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-amber-300/40 hover:bg-white/14 hover:shadow-[0_0_18px_rgba(250,204,21,0.12)]",
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
  const floatY = useMotionValue(0);

  return (
    <section className="relative pt-24 pb-24 sm:pt-30 sm:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={prefersReduced ? {} : { x: [0, 20, 0], y: [0, -18, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 h-60 w-60 rounded-full bg-cyan-300/15 blur-[100px]"
        />
        <motion.div
          animate={prefersReduced ? {} : { x: [0, -28, 0], y: [0, 16, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-8 right-14 h-64 w-64 rounded-full bg-amber-300/14 blur-[110px]"
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#111b48]/70 via-[#10163a]/70 to-[#0d1233]/75 p-8 backdrop-blur-xl sm:p-10"
        >
          <motion.p variants={fadeSlide} className="text-xs tracking-[0.2em] text-amber-200 uppercase">
            Deafingo Platform
          </motion.p>
          <motion.h1 variants={fadeSlide} className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            Empowering Deaf
            <span className="block text-amber-300">Communities</span>
          </motion.h1>
          <motion.p variants={fadeSlide} className="mt-5 max-w-2xl text-lg text-slate-300">
            Inclusion, advocacy, and tailored support designed for meaningful everyday impact.
          </motion.p>

          <motion.div variants={fadeSlide} className="mt-8 flex flex-wrap gap-4">
            <GlassButton primary>
              Get Started <ArrowRight className="h-4 w-4" />
            </GlassButton>
            <GlassButton>Learn More</GlassButton>
          </motion.div>

          <motion.div variants={fadeSlide} className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { value: "120+", label: "Community Sessions" },
              { value: "35+", label: "Partner Groups" },
              { value: "98%", label: "Positive Feedback" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-1 text-xs tracking-wide text-slate-400 uppercase">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={prefersReduced ? false : { y: 0 }}
          animate={prefersReduced ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="grid gap-4"
        >
          <motion.div
            style={{ y: floatY }}
            className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-2 backdrop-blur-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
              alt="People using sign language in an inclusive community setting"
              className="h-[21rem] w-full rounded-[1.2rem] object-cover object-top"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[linear-gradient(180deg,transparent_55%,rgba(10,15,44,0.75)_100%)]" />
            <div className="absolute right-4 bottom-4 rounded-xl border border-white/20 bg-[#0f1a43]/80 px-3 py-1.5 text-xs text-amber-200 backdrop-blur-xl">
              Inclusion-first journeys
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-lg">
              <p className="text-sm text-slate-300">Live Advocacy</p>
              <p className="mt-1 text-xl font-semibold text-white">Workshops & Talks</p>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/8 p-4 backdrop-blur-lg">
              <p className="text-sm text-slate-300">Support Window</p>
              <p className="mt-1 text-xl font-semibold text-white">Always Accessible</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-16 sm:py-20">
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
                whileHover={{ y: -4, scale: 1.02, rotateX: 1, rotateY: -1 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                className="group relative rounded-2xl border border-white/15 bg-white/10 p-6 shadow-[0_12px_40px_rgba(2,6,23,0.35)] backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-2xl border border-amber-300/40" />
                </div>
                <div className="mb-4 inline-flex rounded-xl border border-white/25 bg-white/10 p-3 text-amber-200">
                  <motion.div whileHover={{ rotate: 4, scale: 1.05 }} transition={{ duration: 0.35 }}>
                    <Icon className="h-5 w-5" />
                  </motion.div>
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
      <section className="py-24 sm:py-28">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1.005 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.75, ease }}
            className="rounded-3xl border border-white/20 bg-white/10 px-6 py-14 text-center shadow-[0_18px_44px_rgba(4,12,38,0.45)] backdrop-blur-xl sm:px-12"
          >
            <p className="text-2xl leading-relaxed font-medium tracking-tight text-white sm:text-4xl">
              &ldquo;For two years I have avoided almost all social gatherings because it is impossible for me to say to people &lsquo;I am Deaf&rsquo;&rdquo;
            </p>
            <p className="mt-6 text-sm tracking-[0.2em] text-amber-200/90 uppercase sm:text-base">
              — Ludwig van Beethoven
            </p>
          </motion.div>
        </div>
      </section>

    </>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease }}
          className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-[0_18px_44px_rgba(4,12,38,0.45)] backdrop-blur-xl sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-amber-300/12 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-blue-400/14 blur-3xl" />
          </div>

          <div className="relative">
            <p className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1 text-xs tracking-[0.2em] text-amber-200 uppercase">
              Contact
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Get in touch with Deafingo</h3>
            <p className="mt-3 max-w-2xl text-slate-300">
              We are here to support individuals, families, and communities with inclusive services and advocacy.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-[#101a40]/65 p-5">
                <div className="mb-3 inline-flex rounded-xl border border-white/15 bg-white/10 p-2.5 text-amber-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium tracking-[0.18em] text-slate-400 uppercase">Address</p>
                <p className="mt-2 leading-relaxed text-slate-100">
                  Deafingo Services
                  <br />
                  Suite 140
                  <br />
                  Unit 94/10 Sleeper Lane
                  <br />
                  Cockburn Central WA 6164
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-[#101a40]/65 p-5">
                <div className="mb-3 inline-flex rounded-xl border border-white/15 bg-white/10 p-2.5 text-amber-200">
                  <Mail className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium tracking-[0.18em] text-slate-400 uppercase">Email</p>
                <a href="mailto:deafingo@outlook.com" className="mt-2 block text-lg text-amber-200 transition hover:text-amber-100">
                  deafingo@outlook.com
                </a>

                <div className="mt-5 mb-3 inline-flex rounded-xl border border-white/15 bg-white/10 p-2.5 text-amber-200">
                  <Phone className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium tracking-[0.18em] text-slate-400 uppercase">SMS</p>
                <a href="sms:0407013378" className="mt-2 block text-lg text-amber-200 transition hover:text-amber-100">
                  0407013378 (SMS Only)
                </a>
              </div>
            </div>

            <a
              href="https://www.deafingo.au"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:border-amber-300/50 hover:bg-white/15"
            >
              <Globe className="h-4 w-4 text-amber-200" />
              www.deafingo.au
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutDetailsSection() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease }}
          className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl sm:p-12"
        >
          <h3 className="text-center text-4xl font-semibold tracking-tight text-amber-300 sm:text-5xl">
            About Deafingo
          </h3>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
            <div>
              <h4 className="text-xl font-semibold text-amber-200">About Deafingo Services</h4>
              <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                Deafingo Services is dedicated to empowering Deaf and Hard of Hearing
                individuals through inclusive support, advocacy, and accessibility
                education. We offer peer mentoring, mental health resources, workplace
                inclusion programs, and cultural awareness workshops to foster a more
                connected and resilient Deaf community. Our services are designed to
                promote personal growth, social participation, and cultural pride within
                Deaf and Hard of Hearing spaces.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                Through innovative storytelling, tailored mentoring, and collaborative
                partnerships, we aim to bridge communication gaps and amplify Deaf voices
                across Australia and beyond.
              </p>
            </div>

            <div className="mx-auto w-full max-w-xs">
              <div className="rounded-3xl border border-white/15 bg-[#0d173a]/70 p-3 text-center shadow-[0_18px_44px_rgba(4,12,38,0.45)]">
                <img
                  src="/man.png"
                  alt="Business Founder Benjamin Findlay"
                  className="h-[20rem] w-full rounded-2xl object-cover object-top"
                  loading="lazy"
                />
                <p className="mt-4 text-lg font-medium text-amber-200">Business Founder</p>
                <p className="text-lg font-semibold text-white">Benjamin Findlay</p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-amber-200">About Benjamin Findlay</h4>
              <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                Ben Findlay is the founder of Deafingo Services, a visionary Deaf mentor,
                advocate, and storyteller committed to building inclusive communities.
                With a deep understanding of the lived experiences within Deaf and Hard
                of Hearing circles, Ben brings a powerful blend of empathy, professional
                expertise, and creative flair to his work.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-200 sm:text-lg">
                His leadership reflects a passion for cultural preservation,
                community-based empowerment, and mentoring that adapts to the unique
                goals of each individual. Ben continues to lead with purpose, driving
                meaningful change through advocacy, education, and entrepreneurial
                outreach.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ImpactContextSection() {
  const points = [
    {
      title: "Who We Support",
      description:
        "Deaf, Hard of Hearing, families, schools, and workplaces seeking practical inclusion and stronger communication outcomes.",
    },
    {
      title: "How We Work",
      description:
        "Lived-experience leadership, tailored mentoring, advocacy guidance, and collaborative partnerships built around real community needs.",
    },
    {
      title: "Why It Matters",
      description:
        "Inclusive environments improve confidence, participation, and wellbeing by ensuring Deaf voices are respected and understood.",
    },
  ];

  return (
    <section className="py-18 sm:py-22">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease }}
          className="rounded-3xl border border-white/15 bg-white/8 p-7 backdrop-blur-xl sm:p-10"
        >
          <p className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-1 text-[11px] tracking-[0.18em] text-amber-200 uppercase">
            Why Deafingo
          </p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            A community-led platform built for meaningful inclusion
          </h3>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {points.map((point) => (
              <div key={point.title} className="rounded-2xl border border-white/10 bg-[#10183d]/65 p-5">
                <p className="text-lg font-semibold text-amber-200">{point.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{point.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const blobOneY = useTransform(scrollY, [0, 1400], [0, 90]);
  const blobTwoY = useTransform(scrollY, [0, 1400], [0, -70]);
  const blobThreeY = useTransform(scrollY, [0, 1400], [0, 45]);
  const aboutImageY = useTransform(scrollY, [0, 1400], [0, -36]);

  const mouseX = useMotionValue(-120);
  const mouseY = useMotionValue(-120);
  const cursorX = useSpring(mouseX, { stiffness: 170, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 170, damping: 28 });

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-[#0a0f2c] text-white antialiased"
      onMouseMove={(event) => {
        mouseX.set(event.clientX - 110);
        mouseY.set(event.clientY - 110);
      }}
    >
      <motion.div style={{ scaleX: progressScaleX }} className="fixed top-0 left-0 right-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-200" />

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div style={{ y: blobOneY }} className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-amber-300/20 blur-[90px]" />
        <motion.div style={{ y: blobTwoY }} className="absolute top-1/3 right-0 h-[26rem] w-[26rem] rounded-full bg-blue-400/18 blur-[110px]" />
        <motion.div style={{ y: blobThreeY }} className="absolute bottom-0 left-1/2 h-[20rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)] opacity-70 mix-blend-screen" />
      </div>

      <motion.div style={{ x: cursorX, y: cursorY }} className="pointer-events-none fixed z-[80] hidden h-44 w-44 rounded-full bg-amber-300/10 blur-3xl mix-blend-screen md:block">
        <div className="h-full w-full rounded-full border border-amber-200/25" />
      </motion.div>

      <Navbar dark />
      <div className="relative">
        <HeroSection />
        <ImpactContextSection />
        <ServicesSection />
        <AboutQuoteCTA aboutImageY={aboutImageY} />
        <AboutDetailsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
