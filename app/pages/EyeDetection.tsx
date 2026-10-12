import { useEffect, useRef, useState } from "react";
import type { DragEvent } from "react";
import { Eye, ShieldCheck, Upload, X } from "lucide-react";
import { detectImage } from "~/services/api";
import type { DetectResponse } from "~/interfaces/detection";
import { SEVERITY_STYLE, getClass } from "~/lib/eyeClasses";

const card =
  "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60";

const MAX_MB = 10;

export default function EyeDetection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<DetectResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  // تنظيف الـ object URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function chooseFile(f: File | undefined) {
    if (!f) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(f.type)) {
      setError("Please upload a JPG, PNG or WEBP image.");
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      setError(`Image is too large (max ${MAX_MB} MB).`);
      return;
    }
    setError(null);
    setResult(null);
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  }

  function reset() {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    chooseFile(e.dataTransfer.files?.[0]);
  }

  async function handleDetect() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      setResult(await detectImage(file));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Detection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // أخطر نتيجة هي اللي تحدد الـ banner
  const worst = result?.detections
    .map((d) => ({ d, info: getClass(d.class_id, d.class_name) }))
    .sort((a, b) => Number(b.info.severity === "urgent") - Number(a.info.severity === "urgent"))[0];

  return (
    <div className="mx-auto max-w-4xl space-y-6 pt-8">
      {/* Upload */}
      <div className={card}>
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-brand/10 text-brand dark:bg-blue-400/10 dark:text-blue-300">
            <Eye size={20} />
          </span>
          <h1 className="text-xl font-bold tracking-tight">Cataract Detection</h1>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => chooseFile(e.target.files?.[0])}
        />

        {!previewUrl ? (
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={`mt-5 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-14 text-center transition ${
              dragging
                ? "border-brand bg-brand/5 dark:border-blue-400 dark:bg-blue-400/5"
                : "border-slate-300 hover:border-brand/50 dark:border-white/15 dark:hover:border-blue-400/50"
            }`}
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand dark:bg-blue-400/10 dark:text-blue-300">
              <Upload size={22} />
            </span>
            <p className="font-medium">Drop an eye image here, or click to browse</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">JPG, PNG or WEBP, up to {MAX_MB} MB</p>
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/60 p-3 dark:border-white/10 dark:bg-white/5">
            <div className="flex min-w-0 items-center gap-3">
              <img src={previewUrl} alt="" className="h-14 w-14 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{file?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {file ? (file.size / 1024).toFixed(0) : 0} KB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                disabled={loading}
                aria-label="Remove image"
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-slate-200 transition hover:bg-slate-100 disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/10"
              >
                <X size={16} />
              </button>
              <button
                onClick={handleDetect}
                disabled={loading}
                className="inline-flex min-w-32 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Analysing
                  </>
                ) : (
                  "Detect"
                )}
              </button>
            </div>
          </div>
        )}

        <p className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
          <ShieldCheck size={15} />
          Your image is only used to run the detection.
        </p>
      </div>

      {error && (
        <p className="flex items-center gap-2 rounded-2xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-300">
          <span>⚠</span> {error}
        </p>
      )}

      {loading && (
        <div className={`${card} animate-pulse space-y-3`}>
          <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-white/10" />
          <div className="h-56 w-full rounded-2xl bg-slate-200 dark:bg-white/10" />
        </div>
      )}

      {/* Results */}
      {result && previewUrl && !loading && (
        <div className={`${card} space-y-6`}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Detection Result
          </h2>

          {/* Summary banner */}
          {worst ? (
            <div className={`rounded-2xl border p-4 ${SEVERITY_STYLE[worst.info.severity].banner}`}>
              <p className="font-semibold">{worst.info.label}</p>
              <p className="mt-1 text-sm">{worst.info.advice}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="font-semibold">No findings detected</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                This is not an all-clear. Try a clearer, closer photo of the eye, or consult an ophthalmologist
                if you have symptoms.
              </p>
            </div>
          )}

          {/* Image with boxes */}
          <div className="relative mx-auto w-fit max-w-full">
            <img
              src={previewUrl}
              alt="Uploaded eye"
              className="block max-h-[28rem] w-auto max-w-full rounded-2xl"
            />
            {result.detections.map((d, i) => {
              const info = getClass(d.class_id, d.class_name);
              const s = SEVERITY_STYLE[info.severity];
              return (
                <div
                  key={i}
                  className={`absolute border-2 ${s.box}`}
                  style={{
                    left: `${d.box.x1 * 100}%`,
                    top: `${d.box.y1 * 100}%`,
                    width: `${(d.box.x2 - d.box.x1) * 100}%`,
                    height: `${(d.box.y2 - d.box.y1) * 100}%`,
                  }}
                >
                  <span
                    className={`absolute left-0 top-0 whitespace-nowrap rounded-br-md px-1.5 py-0.5 text-[11px] font-semibold ${s.tag}`}
                  >
                    {info.label} {Math.round(d.confidence * 100)}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Detections list */}
          {result.detections.length > 0 && (
            <ul className="grid gap-3 md:grid-cols-2">
              {result.detections.map((d, i) => {
                const info = getClass(d.class_id, d.class_name);
                const pct = Math.round(d.confidence * 100);
                return (
                  <li
                    key={i}
                    className="rounded-2xl border border-slate-200 bg-white/60 p-4 text-sm dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-slate-400">#{i + 1}</span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${SEVERITY_STYLE[info.severity].tag}`}
                      >
                        {info.severity === "urgent" ? "Urgent" : "Monitor"}
                      </span>
                    </div>
                    <p className="mt-2 font-semibold">{info.label}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="whitespace-nowrap text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        {pct}% confidence
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="text-xs italic text-slate-400 dark:text-slate-500">
            This is an automated screening aid, not a diagnosis. Always confirm with a qualified ophthalmologist.
          </p>
        </div>
      )}
    </div>
  );
}