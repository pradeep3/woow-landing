"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const PROJECT_TYPES = ["Product", "Software", "Commerce", "Other"] as const;

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full border border-border bg-surface px-4 py-3 text-base text-fg placeholder:text-fg-muted transition-colors duration-200 focus:border-accent focus:outline-none";

const labelClass =
  "block font-mono text-2xs tracking-[0.16em] text-fg-muted uppercase";

/**
 * No backend is wired up yet, so the form composes a mail draft to the studio
 * address rather than pretending to POST somewhere. Swap `handleSubmit` for a
 * server action when an inbox or CRM endpoint exists.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const projectType = String(data.get("projectType") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `New enquiry — ${projectType || "General"} — ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      "",
      message,
    ].join("\n");

    try {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={cn(fieldClass, "mt-3")}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={cn(fieldClass, "mt-3")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className={labelClass}>
          Project type
        </label>
        <select
          id="projectType"
          name="projectType"
          defaultValue="Product"
          className={cn(fieldClass, "mt-3 appearance-none")}
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="What are you building, and what is in the way?"
          className={cn(fieldClass, "mt-3 resize-y")}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="large" withArrow disabled={status === "sending"}>
          {status === "sending" ? "Opening…" : "Send Enquiry"}
        </Button>

        <p aria-live="polite" className="text-sm text-fg-muted">
          {status === "sent"
            ? "Your mail client should have opened with the message ready to send."
            : `Prefer email? Write to ${site.email}.`}
        </p>
      </div>
    </form>
  );
}
