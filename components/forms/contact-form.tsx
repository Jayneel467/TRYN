"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteConfig } from "@/lib/site-config";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  message: z.string().min(20, "Please provide more details"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const reducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const projectType = watch("projectType");

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = (await res.json()) as { queued?: boolean; message?: string; error?: string };
      if (!res.ok) throw new Error(payload.error ?? "Failed");
      if (payload.queued === false) {
        setPending(true);
        return;
      }
      setSuccess(true);
    } catch {
      setSubmitError("Submission failed. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (pending) {
    return (
      <div className="form-pending-panel">
        <h3 className="text-xl font-semibold text-foreground">
          Delivery not configured yet
        </h3>
        <p className="mt-2 text-muted">
          We saved your details locally, but outbound email is not configured on this
          environment. Please email us directly at{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-medium text-saffron hover:text-saffron-hover"
          >
            {siteConfig.contact.email}
          </a>
          .
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="form-success-panel">
        <h3 className="text-xl font-semibold text-foreground">
          Message sent
        </h3>
        <p className="mt-2 text-muted">
          Thank you for reaching out. Our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" {...register("company")} />
          {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Input id="role" {...register("role")} />
          {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Project Type</Label>
          <Select value={projectType} onValueChange={(v) => setValue("projectType", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mvp">MVP Development</SelectItem>
              <SelectItem value="scale">Scale Existing Product</SelectItem>
              <SelectItem value="dedicated-team">Dedicated Engineering Team</SelectItem>
              <SelectItem value="ai-product">AI Product</SelectItem>
              <SelectItem value="enterprise">Enterprise Software</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.projectType && (
            <p className="text-sm text-red-500">{errors.projectType.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Range (optional)</Label>
          <Input id="budget" placeholder="e.g. $50K - $100K" {...register("budget")} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project, timeline, and goals..."
          {...register("message")}
        />
        {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </Button>
      {submitError && <p className="text-sm text-red-500">{submitError}</p>}
    </form>
  );
}
