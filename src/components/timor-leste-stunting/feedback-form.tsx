"use client";

import { FormEvent, useState } from "react";

const endpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT?.trim() ||
  "https://formspree.io/f/xdearnlo";
const maxMessageLength = 800;

function isFormspreeEndpoint(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "formspree.io" &&
      /^\/f\/[A-Za-z0-9]+$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

export function StuntingFeedbackForm() {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<{
    kind: "success" | "error";
    message: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10 || trimmedMessage.length > maxMessageLength) {
      setStatus({
        kind: "error",
        message: "Enter a message between 10 and 800 characters.",
      });
      return;
    }

    if (honeypot) {
      setStatus({
        kind: "error",
        message: "Your message could not be submitted. Please try again.",
      });
      return;
    }

    if (!isFormspreeEndpoint(endpoint)) {
      setStatus({
        kind: "error",
        message:
          "Feedback has not been sent: this form is not configured yet. The site owner must set NEXT_PUBLIC_FORMSPREE_ENDPOINT to a Formspree form endpoint.",
      });
      return;
    }

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedMessage,
          rating: rating || "Not provided",
          page: "Childhood stunting in Timor-Leste",
          _gotcha: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error(`Form service returned ${response.status}`);
      }

      setMessage("");
      setRating("");
      setStatus({
        kind: "success",
        message: "Thank you. Your feedback was submitted successfully.",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Your feedback could not be submitted. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <fieldset disabled={submitting} className="space-y-3 disabled:opacity-70">
        <legend className="mb-3 text-sm font-semibold text-foreground">
          Overall usefulness for your work (optional)
        </legend>
        <div className="flex flex-wrap gap-2">
          {[
            ["1", "Not useful"],
            ["2", "Limited"],
            ["3", "Useful"],
            ["4", "Strong"],
            ["5", "Excellent"],
          ].map(([value, label]) => (
            <label
              key={value}
              className={`flex min-w-16 cursor-pointer flex-col items-center rounded-lg border px-3 py-2 text-sm transition-colors ${
                rating === value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:border-amber-600"
              } focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-600 focus-within:ring-offset-2`}
            >
              <input
                className="sr-only"
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
              />
              <span className="text-base font-semibold">{value}</span>
              <span className="text-[10px]">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <label
          htmlFor="stunting-feedback-message"
          className="text-sm font-semibold text-foreground"
        >
          What would make this brief more useful?
        </label>
        <textarea
          id="stunting-feedback-message"
          name="message"
          required
          minLength={10}
          maxLength={maxMessageLength}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (status?.kind === "error") setStatus(null);
          }}
          aria-describedby="stunting-feedback-hint stunting-feedback-count"
          aria-invalid={status?.kind === "error" && message.trim().length < 10}
          placeholder="Missing numbers, wrong emphasis, layout problems, or questions about the data"
          className="min-h-32 w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
        />
        <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
          <p id="stunting-feedback-hint">
            Required. Enter 10–800 characters. Your response is sent securely to
            the configured feedback service and is not stored in this browser.
          </p>
          <p id="stunting-feedback-count" aria-live="polite" className="shrink-0">
            {message.length}/{maxMessageLength}
          </p>
        </div>
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="stunting-feedback-website">Leave this field empty</label>
        <input
          id="stunting-feedback-website"
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
      >
        {submitting ? "Submitting…" : "Submit feedback"}
      </button>

      {!isFormspreeEndpoint(endpoint) && !status && (
        <p role="status" className="text-sm text-amber-800 dark:text-amber-400">
          This form is not configured yet. Feedback cannot be sent until the site owner sets
          NEXT_PUBLIC_FORMSPREE_ENDPOINT.
        </p>
      )}
      <p
        role={status?.kind === "error" ? "alert" : "status"}
        aria-live={status?.kind === "error" ? "assertive" : "polite"}
        className={`min-h-6 text-sm ${
          status?.kind === "success"
            ? "text-green-700 dark:text-green-400"
            : status?.kind === "error"
              ? "text-destructive"
              : "text-muted-foreground"
        }`}
      >
        {submitting
          ? "Submitting your feedback…"
          : status?.message ?? ""}
      </p>
    </form>
  );
}
