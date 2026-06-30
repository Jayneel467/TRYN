import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  role: z.string().min(2),
  projectType: z.string().min(1),
  budget: z.string().optional(),
  message: z.string().min(20),
});

export const pitchDeckSchema = z.object({
  founderName: z.string().min(2),
  email: z.string().email(),
  companyName: z.string().min(2),
  website: z.string().url().optional().or(z.literal("")),
  stage: z.enum(["idea", "mvp", "growth", "scale"]),
  description: z.string().min(50),
});
