import { NextRequest } from 'next/server'
import { createAdminClient } from '@burlington/shared/src/supabase/admin'
import { assessmentLeadSchema } from '../../../lib/schemas/assessment'

const ALLOWED_ORIGINS = [
  'https://burlingtonconsult.com',
  'https://www.burlingtonconsult.com',
  process.env.NEXT_PUBLIC_MARKETING_URL,
].filter(Boolean)

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed ?? '',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(req.headers.get('origin')),
  })
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')
  const headers = corsHeaders(origin)

  const parsed = assessmentLeadSchema.safeParse(await req.json())
  if (!parsed.success) {
    return Response.json({ error: 'Invalid input' }, { status: 400, headers })
  }

  const supabase = createAdminClient()
  const { error } = await supabase
    .from('assessment_leads')
    .insert({
      name: parsed.data.name,
      email: parsed.data.email,
      country: parsed.data.country || null,
      linkedin_url: parsed.data.linkedin_url || null,
      marketing_consent: parsed.data.marketing_consent ?? false,
      field_id: parsed.data.field_id || null,
      tier: parsed.data.tier || null,
      criteria_met: parsed.data.criteria_met ?? null,
      criteria_total: parsed.data.criteria_total ?? null,
      score_pct: parsed.data.score_pct ?? null,
    })

  if (error) {
    console.error('[assessment-leads] Insert failed', error)
    return Response.json({ error: 'Failed to save' }, { status: 500, headers })
  }

  return Response.json({ ok: true }, { headers })
}
