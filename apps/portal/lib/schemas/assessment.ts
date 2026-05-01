import { z } from 'zod'

export const assessmentLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(320),
  country: z.string().trim().max(100).optional(),
  linkedin_url: z.string().trim().url().max(500).optional().or(z.literal('')),
  marketing_consent: z.boolean().optional(),
  field_id: z.string().trim().max(50).optional(),
  tier: z.string().trim().max(50).optional(),
  criteria_met: z.number().int().min(0).max(20).optional(),
  criteria_total: z.number().int().min(0).max(20).optional(),
  score_pct: z.number().min(0).max(100).optional(),
})
