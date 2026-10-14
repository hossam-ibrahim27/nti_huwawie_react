import { Link } from "react-router";
import { ArrowRight, BookOpenCheck, Eye, ShieldCheck, Sparkles } from "lucide-react";

const stats = [
  { value: "NG77", label: "Single trusted source" },
  { value: "6", label: "Care topics covered" },
  { value: "Cited", label: "Page references on every answer" },
];

export default function Hero() {
  return (
   <section className="relative isolate px-2 pb-8 pt-10 md:pt-16">
      {/* Decorative background glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-80 w-80 animate-blob rounded-full bg-brand/25 blur-3xl motion-reduce:animate-none dark:bg-brand/30" />
        <div className="absolute -right-16 top-32 h-72 w-72 animate-blob rounded-full bg-emerald-400/20 blur-3xl [animation-delay:-6s] motion-reduce:animate-none dark:bg-emerald-400/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,18,34,0.07)_1px,transparent_0)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)]" />
      </div>

      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/10 px-4 py-1.5 text-xs font-semibold text-brand dark:border-blue-400/20 dark:bg-blue-400/10 dark:text-blue-300">
            <Sparkles size={14} />
            Grounded in NICE guideline NG77
          </span>

          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Evidence-based answers on{" "}
            <span className="whitespace-nowrap bg-linear-to-r from-brand to-emerald-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-emerald-400">
              cataract care
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Ask a clinical question and get an answer drawn only from the guideline, with section and
            page citations so you can verify every claim.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/clinical-rag"
              className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:brightness-110"
            >
              Ask the Assistant
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/eye-detection"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-7 py-3.5 text-sm font-semibold transition hover:bg-white dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <Eye size={16} />
              Try Cataract Detection
            </Link>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-slate-200 pt-8 dark:border-white/10">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-extrabold tracking-tight md:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs text-slate-500 dark:text-slate-400">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Illustrative answer card */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 -z-10 rounded-[40px] bg-linear-to-br from-brand/20 to-emerald-400/20 blur-2xl" />
          <div className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/70">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <BookOpenCheck size={14} /> Clinical Assistant
              </span>
              <span>Illustrative example</span>
            </div>

            <div className="ml-auto mt-5 w-fit max-w-[85%] rounded-2xl rounded-br-md bg-brand px-4 py-3 text-sm text-white">
              What types of anaesthesia are recommended for cataract surgery?
            </div>

            <div className="mt-4 rounded-2xl rounded-bl-md bg-slate-100 p-4 dark:bg-white/5">
              <div className="space-y-2.5">
                <div className="h-2.5 w-full rounded-full bg-slate-300/80 dark:bg-white/15" />
                <div className="h-2.5 w-11/12 rounded-full bg-slate-300/80 dark:bg-white/15" />
                <div className="h-2.5 w-3/4 rounded-full bg-slate-300/80 dark:bg-white/15" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-brand shadow-sm dark:bg-slate-800 dark:text-blue-300">
                  [1] Source section
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-brand shadow-sm dark:bg-slate-800 dark:text-blue-300">
                  [2] Source section
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
              <ShieldCheck size={14} />
              Answered only from NICE NG77
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}