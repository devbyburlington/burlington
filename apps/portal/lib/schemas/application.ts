import { z } from 'zod'
import { emailSchema, passwordSchema } from './auth'

export const personalStepSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: emailSchema,
  phoneCountryCode: z.string().min(1, 'Select your country code'),
  phone: z.string().trim().min(1, 'Phone number is required').max(30),
  citizenshipCountry: z.string().min(1, 'Select your country of citizenship'),
  residenceCountry: z.string().min(1, 'Select your country of residence'),
})

export const professionalStepSchema = z.object({
  employer: z.string().trim().max(200).optional(),
  currentRole: z.string().trim().max(200).optional(),
  field: z.string().min(1, 'Select your field'),
  highestEducation: z.string().min(1, 'Select your education level'),
  linkedinUrl: z
    .string()
    .trim()
    .max(500)
    .refine(
      (v) => !v || /^https?:\/\/(www\.)?linkedin\.com\/in\//.test(v),
      'Enter a valid LinkedIn profile URL'
    )
    .optional()
    .default(''),
})

export const immigrationStepSchema = z.object({
  immigrationGoal: z.string().min(1, 'Select your immigration goal'),
  howHeard: z.string().min(1, 'Tell us how you heard about us'),
  howHeardOther: z.string().trim().max(500).optional().default(''),
  referralSource: z.string().trim().max(500).optional().default(''),
  marketingConsent: z.boolean(),
})

export const accountStepSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const profilePayloadSchema = z.object({
  full_name: z.string().trim().min(1).max(200),
  given_name: z.string().trim().max(100),
  family_name: z.string().trim().max(100),
  phone_e164: z.string().regex(/^\+[1-9]\d{1,14}$/).nullable(),
  country_citizenship_iso: z.string().length(2).nullable(),
  country_residence_iso: z.string().length(2).nullable(),
  employer: z.string().trim().max(200).nullable(),
  job_title: z.string().trim().max(200).nullable(),
  field_industry: z.string().trim().max(100).nullable(),
  highest_education: z.string().trim().max(100).nullable(),
  linkedin_url: z.string().trim().max(500).nullable(),
  immigration_goal: z.string().trim().max(100).nullable(),
  how_heard: z.string().trim().max(500).nullable(),
  referral_source: z.string().trim().max(500).nullable(),
  marketing_consent: z.boolean(),
})
