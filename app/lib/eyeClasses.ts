export type Severity = "monitor" | "urgent";

export const EYE_CLASSES: Record<number, { label: string; advice: string; severity: Severity }> = {
  0: {
    label: "Cataract",
    advice: "Cataract detected. Not urgent: routine monitoring and an ophthalmology review are appropriate.",
    severity: "monitor",
  },
  // TODO: غيّر اسم ونص الـ class 1 و 2 حسب الداتا سيت بتاعك
  1: { label: "Class 1", advice: "Please consult an ophthalmologist.", severity: "monitor" },
  2: { label: "Class 2", advice: "Please consult an ophthalmologist.", severity: "monitor" },
  3: {
    label: "Urgent surgical intervention",
    advice: "Immediate surgical intervention may be needed. See an ophthalmologist as soon as possible.",
    severity: "urgent",
  },
};

export const SEVERITY_STYLE: Record<Severity, { box: string; tag: string; banner: string }> = {
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