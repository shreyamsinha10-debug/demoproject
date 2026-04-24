import React from "react";
import { Camera, BriefcaseBusiness, UsersRound } from "lucide-react";

export default function Footer({ light = false }) {
  const socials = [
    { label: "Instagram", icon: Camera, href: "#" },
    { label: "LinkedIn", icon: BriefcaseBusiness, href: "#" },
    { label: "Facebook", icon: UsersRound, href: "#" },
  ];

  return (
    <footer className={light ? "py-10" : "pb-10"}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div
          className={`rounded-2xl border p-6 sm:p-8 ${
            light ? "border-slate-200 bg-white" : "border-white/20 bg-white/10 backdrop-blur-xl"
          }`}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={`text-lg font-semibold ${light ? "text-slate-900" : "text-white"}`}>Deafingo</p>
              <p className={`mt-2 max-w-md text-sm ${light ? "text-slate-600" : "text-slate-300"}`}>
                Empowering Deaf and Hard of Hearing communities through inclusion, advocacy, and support.
              </p>
              <p className={`mt-4 text-xs ${light ? "text-slate-500" : "text-slate-400"}`}>
                © {new Date().getFullYear()} Deafingo. All rights reserved.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className={`rounded-full border p-3 transition-all ${
                      light
                        ? "border-slate-200 bg-slate-50 text-slate-700 hover:-translate-y-0.5 hover:border-indigo-300"
                        : "border-white/20 bg-white/10 text-slate-200 hover:-translate-y-0.5 hover:border-amber-300/60 hover:text-amber-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
