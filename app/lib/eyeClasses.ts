export type Severity = "ok" | "monitor" | "urgent";

export const EYE_CLASSES: Record<number, { label: string; advice: string; severity: Severity }> = {
  0: {
    label: "Cataract",
    advice:
      "Signs of a cataract were detected. Please have an ophthalmologist confirm this and advise on monitoring or treatment.",
    severity: "monitor",
  },
  1: {
    label: "No cataract detected",
    advice:
      "No cataract was detected in this image. This is not a diagnosis: if you have blurred or cloudy vision, see an ophthalmologist.",
    severity: "ok",
  },
};

export const SEVERITY_RANK: Record<Severity, number> = { ok: 0, monitor: 1, urgent: 2 };

export const SEVERITY_LABEL: Record<Severity, string> = {
  ok: "No finding",
  monitor: "Monitor",
  urgent: "Urgent",
};

export const SEVERITY_STYLE: Record<Severity, { box: string; tag: string; banner: string }> = {
  ok: {
    box: "border-emerald-500",
    tag: "bg-emerald-500 text-white",
    banner:
      "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-100",
  },
  monitor: {
    box: "border-amber-400",
    tag: "bg-amber-400 text-amber-950",
    banner:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100",
  },
  urgent: {
    box: "border-red-500",
    tag: "bg-red-500 text-white",
    banner:
      "border-red-200 bg-red-50 text-red-900 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-100",
  },
};

export function getClass(id: number, fallbackName: string) {
  return (
    EYE_CLASSES[id] ?? {
      label: fallbackName,
      advice: "Please consult an ophthalmologist.",
      severity: "monitor" as Severity,
    }
  );
}