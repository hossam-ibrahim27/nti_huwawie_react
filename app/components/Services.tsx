import { ClipboardList, HeartPulse, Ruler, ShieldCheck, Stethoscope, Syringe } from "lucide-react";

const services = [
  { icon: Stethoscope, title: "Referral & Assessment", tagline: "Knowing when to refer", text: "Criteria and discussions that guide the decision to refer for cataract surgery." },
  { icon: ClipboardList, title: "Pre-operative Information", tagline: "What patients should be told", text: "Information on lens options, anaesthesia and individual risk before surgery." },
  { icon: Ruler, title: "Biometry & Lens Choice", tagline: "Measuring for the right lens", text: "Recommended biometry techniques and intraocular lens power calculation." },
  { icon: ShieldCheck, title: "Day-of-Surgery Safety", tagline: "Preventing wrong-lens errors", text: "Checklists and checks to confirm identity, eye and lens before the operation." },
  { icon: Syringe, title: "Anaesthesia Options", tagline: "Comfort during surgery", text: "Types of anaesthesia recommended for adult cataract surgery." },
  { icon: HeartPulse, title: "Aftercare & Follow-up", tagline: "Recovery support", text: "Eye drops, follow-up reviews and who to contact if vision changes." },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-2 pt-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand dark:text-blue-400">
            What's covered
          </p>
          <h2 className="mt-3 max-w-lg text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            Topics You Can Ask About
          </h2>
        </div>
        <p className="max-w-xs text-slate-500 dark:text-slate-400">
          Every answer is drawn from the guideline sections below, with page citations.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, ...service }, index) => (
          <article
            key={service.title}
            className="group relative overflow-hidden rounded-[28px] border border-white/60 bg-white/80 p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-blue-400/30"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white dark:bg-blue-400/10 dark:text-blue-300">
                <Icon size={20} />
              </span>
              <span className="font-mono text-xs text-slate-400 dark:text-slate-500">
                {String(index + 1).padStart(3, "0")}
              </span>
            </div>
            <h3 className="mt-10 text-xl font-bold">{service.title}</h3>
            <p className="mt-2 text-sm font-semibold text-brand dark:text-blue-300">{service.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}