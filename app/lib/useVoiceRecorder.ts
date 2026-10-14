import { useCallback, useEffect, useRef, useState } from "react";

const MIME_TYPES = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
export const MAX_SECONDS = 60;

export function useVoiceRecorder(onRecorded: (blob: Blob) => void | Promise<void>) {
  const [supported, setSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cancelledRef = useRef(false);
  const callbackRef = useRef(onRecorded);

  useEffect(() => {
    callbackRef.current = onRecorded;
  }, [onRecorded]);

  // Checked after mount so server and client render the same HTML
  useEffect(() => {
    setSupported(typeof MediaRecorder !== "undefined" && !!navigator.mediaDevices?.getUserMedia);
  }, []);

  const cleanup = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    recorderRef.current = null;
    setRecording(false);
    setSeconds(0);
  }, []);

  const start = useCallback(async () => {
    if (recorderRef.current) return;
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MIME_TYPES.find((t) => MediaRecorder.isTypeSupported(t));
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

      chunksRef.current = [];
      cancelledRef.current = false;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const type = recorder.mimeType || mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        const cancelled = cancelledRef.current;
        cleanup();
        if (!cancelled && blob.size > 0) void callbackRef.current(blob);
      };

      recorder.start();
      recorderRef.current = recorder;
      setRecording(true);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch (e) {
      cleanup();
      setError(
        e instanceof DOMException && e.name === "NotAllowedError"
          ? "Microphone access was blocked. Allow it in your browser settings and try again."
          : "Could not start recording on this device.",
      );
    }
  }, [cleanup]);

  const stop = useCallback(() => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }, []);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
    stop();
  }, [stop]);

  // Stop automatically at the time limit
  useEffect(() => {
    if (recording && seconds >= MAX_SECONDS) stop();
  }, [recording, seconds, stop]);

  // Release the microphone if the page unmounts mid-recording
  useEffect(
    () => () => {
      cancelledRef.current = true;
      if (recorderRef.current?.state === "recording") recorderRef.current.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [],
  );

  return { supported, recording, seconds, error, start, stop, cancel };
}