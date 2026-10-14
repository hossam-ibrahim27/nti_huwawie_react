import { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/clinical-rag", label: "Clinical Assistant" },
  { to: "/eye-detection", label: "Cataract Detection" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <nav className="mx-auto max-w-[1400px] rounded-[28px] bg-white/80 px-6 py-3 shadow-[0_2px_20px_rgba(15,18,34,0.06)] ring-1 ring-black/5 backdrop-blur-xl dark:bg-slate-900/70 dark:ring-white/10">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-sm text-emerald-400 dark:bg-slate-800">
              ✳
            </span>
            Lumina
          </NavLink>

          <ul className="hidden items-center gap-8 text-[15px] md:flex">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 transition ${
                      isActive
                        ? "font-medium text-brand dark:text-blue-400"
                        : "text-slate-600 hover:text-ink dark:text-slate-400 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span className="h-1.5 w-1.5 rounded-full bg-brand dark:bg-blue-400" />}
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NavLink
              to="/clinical-rag"
              className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-110 sm:block"
            >
              Ask the Assistant
            </NavLink>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 md:hidden dark:border-white/10"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <ul className="mt-3 space-y-1 border-t border-slate-200 pt-3 md:hidden dark:border-white/10">
            {links.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}