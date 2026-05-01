import { z } from 'zod'

export const emailSchema = z.string().trim().toLowerCase().email('Enter a valid email address')

const PASSWORD_MIN = 8

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN, `Password must be at least ${PASSWORD_MIN} characters`)
  .refine((pw) => /[a-z]/.test(pw), 'Password must include a lowercase letter')
  .refine((pw) => /[A-Z]/.test(pw), 'Password must include an uppercase letter')
  .refine((pw) => /[^a-zA-Z0-9]/.test(pw), 'Password must include a symbol')

export const PASSWORD_RULES = [
  { key: 'length', label: 'At least 8 characters', test: (p: string) => p.length >= PASSWORD_MIN },
  { key: 'lower', label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { key: 'upper', label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { key: 'symbol', label: 'One symbol (!@#$%...)', test: (p: string) => /[^a-zA-Z0-9]/.test(p) },
] as const

export function isPasswordStrong(password: string): boolean {
  return PASSWORD_RULES.every((r) => r.test(password))
}

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const checkAuthMethodSchema = z.object({
  email: emailSchema,
})

export const checkDuplicateSchema = z.object({
  email: emailSchema.optional(),
  phone: z
    .string()
    .trim()
    .regex(/^\+[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
})

export const setPersistSchema = z.object({
  maxAge: z.number().int().min(0).max(31_536_000).optional(),
})

export const ndaSignatureSchema = z.object({
  signature: z
    .string()
    .trim()
    .min(2, 'Type your full legal name to sign')
    .max(200, 'Signature is too long')
    .refine(
      (s) => s.split(/\s+/).length >= 2,
      'Please enter your full name (first and last)'
    ),
})
