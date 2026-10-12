import { Link } from "react-router";

export default function CtaBanner() {
  return (
    <section className="relative isolate mt-24 overflow-hidden rounded-[40px] bg-navy px-6 py-20 text-center text-white ring-1 ring-white/10">
      <div aria-hidden className="absolute -top-24 left-1/2 -z-10 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-brand/40 blur-3xl" />
      <p className="text-sm text-slate-400">(Clinical Assistant)</p>
      <h2 className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
        Get a Cited Answer in Seconds
      </h2>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to="/clinical-rag"
          className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Ask the Assistant
        </Link>
      </div>
    </section>
  );
}