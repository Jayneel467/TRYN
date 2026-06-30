"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
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
    <section className="section-divider section-surface py-14 lg:py-16">
      <div className="container-wide">
        <FadeIn>
          <div className="grid gap-10 rounded-lg border border-border bg-background p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-center lg:gap-16">
            <div>
              <p className="section-eyebrow">Newsletter</p>
              <h2 className="section-title mt-3 text-foreground">
                Studio updates and insights
              </h2>
              <p className="mt-3 max-w-md body-copy">
                Practical notes on building, scaling, and shipping, delivered monthly.
              </p>
            </div>

            <div>
              {status === "success" ? (
                <motion.p
                  className="text-sm font-medium text-saffron"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  You&apos;re subscribed. Welcome to TRYN.
                </motion.p>
              ) : status === "pending" ? (
                <motion.p
                  className="text-sm text-muted"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {statusMessage}
                </motion.p>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 transition-[border-color,box-shadow] duration-300 focus-visible:border-saffron/50 focus-visible:ring-saffron/30"
                    aria-label="Email address"
                  />
                  <Button type="submit" className="shrink-0">
                    Subscribe
                  </Button>
                </form>
              )}
              {status === "error" && (
                <p className="mt-2 text-sm text-red-500">{statusMessage}</p>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
