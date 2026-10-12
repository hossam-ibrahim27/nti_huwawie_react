import { useState } from "react";
import { ArrowUp, BookOpenCheck, ChevronDown, FileSearch, ShieldCheck } from "lucide-react";
import { askQuestion } from "~/services/api";
import type { AskResponse } from "~/interfaces/clinical";

const confidenceStyle: Record<string, string> = {
  high: "bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-300",
  low: "bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-300",
  none: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
};

const suggestions = [
  "What types of anaesthesia are recommended for cataract surgery?",
  "When should cataract surgery be offered?",
  "What checks prevent wrong-lens errors on the day of surgery?",
  "What Capital City in Egypt?",
  "What information should be given to patients at the preoperative appointment before cataract surgery?"
];

const card =
  "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60";

export default function ClinicalDashboard() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState<AskResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEvidence, setShowEvidence] = useState(true);

  async function handleAsk(q: string = question) {
    if (q.trim().length < 3) return;
    setLoading(true);
    setError(null);
    try {
      setResult(await askQuestion(q.trim()));
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function pick(s: string) {
    setQuestion(s);
    handleAsk(s);
  }

  return (
    <div className="grid items-start gap-6 pt-8 lg:grid-cols-[1.7fr_1fr]">
      {/* Left column: question + answer */}
      <section className="min-w-0 space-y-6">
        {/* Question box */}
        <div className={card}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand/10 text-brand dark:bg-blue-400/10 dark:text-blue-300">
              <BookOpenCheck size={20} />
            </span>
            <h1 className="text-xl font-bold tracking-tight">Ask a Clinical Question</h1>
          </div>

          <div className="mt-5 flex gap-3">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              placeholder="e.g. What types of anaesthesia are recommended for cataract surgery?"
              className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/10 dark:border-white/10 dark:bg-slate-950/50 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="inline-flex min-w-28 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Thinking
                </>
              ) : (
                <>
                  Ask <ArrowUp size={16} />
                </>
              )}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => pick(s)}
                disabled={loading}
                className="cursor-pointer rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs text-slate-600 transition hover:border-brand/40 hover:text-brand disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:border-blue-400/40 dark:hover:text-blue-300"
              >
                {s}
              </button>
            ))}
          </div>

          <p className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
            <ShieldCheck size={15} />
            Answering only from: NICE Cataracts in Adults (NG77)
          </p>
        </div>

        {error && (
          <p className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-300">
            <span>⚠</span> {error}
          </p>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className={`${card} animate-pulse space-y-3`}>
            <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-3 w-11/12 rounded-full bg-slate-200 dark:bg-white/10" />
            <div className="h-3 w-2/3 rounded-full bg-slate-200 dark:bg-white/10" />
          </div>
        )}

        {/* Answer */}
        {result && !loading && (
          <div className={card}>
            <h2
              className={`mb-3 text-xs font-bold uppercase tracking-widest ${
                result.refused
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-emerald-700 dark:text-emerald-400"
              }`}
            >
              {result.refused ? "Not answered" : "Recommendation"}
            </h2>

            <p
              className={`whitespace-pre-line rounded-2xl p-4 text-[15px] leading-relaxed ${
                result.refused
                  ? "bg-amber-50 text-amber-900 dark:bg-amber-400/10 dark:text-amber-100"
                  : "bg-emerald-50 text-emerald-950 dark:bg-emerald-400/10 dark:text-emerald-50"
              }`}
            >
              {result.answer}
            </p>

            {result.warning && (
              <p className="mt-3 flex items-start gap-2 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-400/10 dark:text-yellow-200">
                <span className="shrink-0">⚠</span> {result.warning}
              </p>
            )}

            {result.sources.length > 0 && (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="py-2 pr-4">#</th>
                      <th className="pr-4">Section</th>
                      <th className="text-right">Page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.sources.map((s) => (
                      <tr key={s.source_number} className="border-t border-slate-200 dark:border-white/10">
                        <td className="py-2.5 pr-4 font-mono text-xs text-slate-500">{s.source_number}</td>
                        <td className="pr-4">{s.section}</td>
                        <td className="text-right">{s.page}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className={`rounded-full px-3 py-1 font-medium ${confidenceStyle[result.confidence]}`}>
                Confidence: {result.confidence}
              </span>
              {result.claim_validation?.faithfulness != null && (
                <span className="text-slate-500 dark:text-slate-400">
                  Faithfulness: {result.claim_validation.faithfulness}
                </span>
              )}
            </div>

            {result.disclaimer && (
              <p className="mt-3 text-xs italic text-slate-400 dark:text-slate-500">{result.disclaimer}</p>
            )}
          </div>
        )}
      </section>

      {/* Right column: retrieved evidence (natural height, no inner scroll) */}
      <aside className={`${card} min-w-0`}>
        <button
          type="button"
          onClick={() => setShowEvidence((v) => !v)}
          aria-expanded={showEvidence}
          className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
        >
          <span className="flex items-center gap-2 font-bold">
            <FileSearch size={18} className="text-brand dark:text-blue-300" />
            Retrieved Evidence
            {result && result.retrieved_chunks.length > 0 && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-white/10 dark:text-slate-400">
                {result.retrieved_chunks.length}
              </span>
            )}
          </span>
          <ChevronDown
            size={18}
            className={`text-slate-400 transition-transform ${showEvidence ? "rotate-180" : ""}`}
          />
        </button>

        {showEvidence && (
          <div className="mt-4">
            {!result || result.retrieved_chunks.length === 0 ? (
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Evidence will appear here after you ask.
              </p>
            ) : (
              <ul className="space-y-3">
                {result.retrieved_chunks.map((c) => {
                  const pct = Math.round(c.relevance_score * 100);
                  return (
                    <li
                      key={c.rank}
                      className="flex flex-col rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-slate-400">#{c.rank}</span>
                        <span className="shrink-0 whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600 dark:bg-white/10 dark:text-slate-300">
                          p.{c.page}
                        </span>
                      </div>

                      <p className="mt-2 line-clamp-1 font-semibold" title={c.section}>
                        {c.section}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="whitespace-nowrap text-xs font-medium text-emerald-700 dark:text-emerald-300">
                          {pct}% match
                        </span>
                      </div>

                      <p className="mt-3 line-clamp-4 italic text-slate-600 dark:text-slate-300">
                        "{c.content_preview.slice(0, 220)}..."
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}