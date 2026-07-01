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

const formEndpoint = `https://${"api.web3forms.com"}/submit`;

function getFormAccessKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  return key && key.length > 0 ? key : undefined;
}

function isBrowserFormConfigured(): boolean {
  return Boolean(getFormAccessKey());
}

async function submitBrowserFormData(formData: FormData): Promise<boolean> {
  const accessKey = getFormAccessKey();
  if (!accessKey) return false;

  formData.set("access_key", accessKey);

  const res = await fetch(formEndpoint, {
    method: "POST",
    body: formData,
  });

  const raw = await res.text();
  let data: { success?: boolean; message?: string } = {};
  try {
    data = JSON.parse(raw) as { success?: boolean; message?: string };
  } catch {
    console.error("[Pitch Deck] Form provider non-JSON response:", res.status, raw);
    return false;
  }

  if (!res.ok || !data.success) {
    console.error("[Pitch Deck] Form provider error:", res.status, data);
    return false;
  }

  return true;
}

const pitchDeckSchema = z.object({
  founderName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  companyName: z.string().min(2, "Company name is required"),
  website: z.string().url("Valid URL required").optional().or(z.literal("")),
  stage: z.enum(["idea", "mvp", "growth", "scale"]),
  description: z.string().min(50, "Please provide at least 50 characters"),
});

type PitchDeckForm = z.infer<typeof pitchDeckSchema>;

function buildPitchDeckFormData(data: PitchDeckForm, file: File): FormData {
  const formData = new FormData();
  formData.append("name", data.founderName);
  formData.append("email", data.email);
  formData.append("subject", `Founders Program: ${data.companyName} (${data.stage})`);
  formData.append("from_name", data.founderName);
  formData.append("companyName", data.companyName);
  formData.append("website", data.website || "N/A");
  formData.append("stage", data.stage);
  formData.append("message", [
    `Founder: ${data.founderName}`,
    `Email: ${data.email}`,
    `Company: ${data.companyName}`,
    `Website: ${data.website || "N/A"}`,
    `Stage: ${data.stage}`,
    "",
    data.description,
    "",
    `Attachment: ${file.name} (${file.size} bytes)`,
  ].join("\n"));
  formData.append("attachment", file);
  return formData;
}

export function PitchDeckForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const reducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PitchDeckForm>({
    resolver: zodResolver(pitchDeckSchema),
    defaultValues: { stage: "idea" },
  });

  const stage = watch("stage");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setFileError("");
    if (!selected) {
      setFile(null);
      return;
    }
    const validTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ];
    if (!validTypes.includes(selected.type)) {
      setFileError("Please upload a PDF or PPTX file");
      setFile(null);
      return;
    }
    if (selected.size > 25 * 1024 * 1024) {
      setFileError("File must be under 25MB");
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const onSubmit = async (data: PitchDeckForm) => {
    if (!file) {
      setFileError("Pitch deck is required");
      return;
    }
    setSubmitting(true);
    try {
      if (isBrowserFormConfigured()) {
        const ok = await submitBrowserFormData(buildPitchDeckFormData(data, file));
        if (!ok) throw new Error("Submission failed");
        setSuccess(true);
        return;
      }

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
      formData.append("pitchDeck", file);
      const res = await fetch("/api/pitch-deck", { method: "POST", body: formData });
      const payload = (await res.json()) as { queued?: boolean; error?: string };
      if (!res.ok) throw new Error(payload.error ?? "Submission failed");
      if (payload.queued === false) {
        setPending(true);
        return;
      }
      setSuccess(true);
    } catch {
      setFileError("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (pending) {
    return (
      <div className="form-pending-panel">
        <h3 className="text-xl font-semibold text-foreground">
          Application received
        </h3>
        <p className="mt-2 text-muted">
          We saved your application details, but email delivery is not set up on
          this site yet. Please email your pitch deck to{" "}
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
          Application submitted
        </h3>
        <p className="mt-2 text-muted">
          Thank you for applying to the TRYN Founders Program. Our team will review
          your submission and reach out if there&apos;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        Step 1 of 3: Founder details
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="founderName">Founder Name</Label>
          <Input id="founderName" {...register("founderName")} />
          {errors.founderName && (
            <p className="text-sm text-red-500">{errors.founderName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" {...register("companyName")} />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website (optional)</Label>
          <Input id="website" placeholder="https://" {...register("website")} />
          {errors.website && (
            <p className="text-sm text-red-500">{errors.website.message}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Stage</Label>
        <Select value={stage} onValueChange={(v) => setValue("stage", v as PitchDeckForm["stage"])}>
          <SelectTrigger>
            <SelectValue placeholder="Select stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="idea">Idea</SelectItem>
            <SelectItem value="mvp">MVP</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
            <SelectItem value="scale">Scale</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        Step 2 of 3: Company vision
      </p>
      <div className="space-y-2">
        <Label htmlFor="description">Brief description</Label>
        <Textarea
          id="description"
          placeholder="Tell us about your vision, market, and what you're building..."
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="pitchDeck">Pitch Deck (PDF or PPTX, max 25MB)</Label>
        <Input
          id="pitchDeck"
          type="file"
          accept=".pdf,.ppt,.pptx"
          onChange={handleFileChange}
        />
        {file && <p className="text-sm text-muted">Selected: {file.name}</p>}
        {fileError && <p className="text-sm text-red-500">{fileError}</p>}
      </div>
      <p className="text-xs text-muted">
        The TRYN Founders Program is highly selective. Submission does not guarantee
        acceptance or partnership.
      </p>
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Your Pitch Deck"}
      </Button>
    </form>
  );
}
