import type { AskResponse } from "~/interfaces/clinical";
import type { DetectResponse } from "~/interfaces/detection";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function askQuestion(question: string, k = 5): Promise<AskResponse> {
  const response = await fetch(`${API_URL}/api/v1/ask?k=${k}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }
  return response.json();
}

export async function detectImage(file: File): Promise<DetectResponse> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/api/v1/detect`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail ?? "Detection failed. Please try again.");
  }
  return res.json();
}

export async function transcribeAudio(blob: Blob, language?: string): Promise<string> {
  const form = new FormData();
  form.append("file", blob, "voice"); // the blob's own MIME type is sent with it

  const query = language ? `?language=${encodeURIComponent(language)}` : "";
  const res = await fetch(`${API_URL}/api/v1/transcribe${query}`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.detail ?? "Transcription failed. Please try again.");
  }
  const data = await res.json();
  return data.text as string;
}