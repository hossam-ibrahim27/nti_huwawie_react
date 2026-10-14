import { Link } from "react-router";

const columns = [
  {
    title: "Explore",
    links: [
      { to: "/", label: "Home" },
      { to: "/clinical-rag", label: "Clinical Assistant" },
      { to: "/eye-detection", label: "Cataract Detection" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-transparent bg-slate-950 px-4 py-12 text-slate-300 dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sm text-emerald-400">✳</span>
            Lumina
          </p>
          <p className="mt-3 max-w-sm text-sm text-slate-400">
            Evidence-based answers on cataract care, grounded in the NICE guideline on cataracts in adults (NG77).
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <p className="mb-3 font-semibold text-white">{column.title}</p>
            <ul className="space-y-2 text-sm">
              {column.links.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-slate-800 pt-6 text-xs text-slate-500">
        <p>This tool summarises published guidelines and is not a substitute for clinical judgement.</p>
        <p className="mt-1">© {new Date().getFullYear()} VisionAI. All rights reserved.</p>
      </div>
    </footer>
  );
}