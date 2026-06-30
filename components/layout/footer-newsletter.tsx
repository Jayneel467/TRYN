"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "pending">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const reducedMotion = useReducedMotion();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        subscribed?: boolean;
        message?: string;
        error?: string;
      };
      if (!res.ok) {
        setStatusMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      if (data.subscribed) {
        setStatusMessage("");
        setStatus("success");
        setEmail("");
        return;
      }
      setStatusMessage(
        data.message ?? "We received your request. Subscription will complete once configured."
      );
      setStatus("pending");
    } catch {
      setStatusMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="footer-newsletter">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] section-navy-muted opacity-75">
        Newsletter
      </p>
      <p className="mt-2 text-sm leading-relaxed section-navy-muted">
        Studio updates and insights from TRYN. No spam.
      </p>
      {status === "success" ? (
        <motion.p
          className="mt-4 text-sm font-medium text-saffron"
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          You&apos;re subscribed.
        </motion.p>
      ) : status === "pending" ? (
        <motion.p
          className="mt-4 text-sm section-navy-muted"
          initial={reducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {statusMessage}
        </motion.p>
      ) : (
        <form onSubmit={handleSubmit} className="footer-newsletter-form mt-4">
          <Input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="footer-newsletter-input"
            aria-label="Email address"
          />
          <Button type="submit" size="sm" className="footer-newsletter-button">
            Subscribe
          </Button>
        </form>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-red-400">{statusMessage}</p>
      )}
    </div>
  );
}
