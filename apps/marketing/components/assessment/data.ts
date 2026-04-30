export interface Field {
  id: string
  label: string
  skipsArtsCriteria: boolean
}

export interface CriterionOption {
  label: string
  score: number
}

export interface Criterion {
  id: string
  name: string
  question: string
  options: CriterionOption[]
  artsOnly?: boolean
}

export interface Tier {
  name: string
  color: string
  tone: 'strong' | 'viable' | 'developing' | 'early'
}

export interface Score {
  total: number
  met: number
  max: number
  pct: number
}

export const FIELDS: Field[] = [
  { id: 'science', label: 'Science, Research & Academia', skipsArtsCriteria: true },
  { id: 'technology', label: 'Technology & Engineering', skipsArtsCriteria: true },
  { id: 'business', label: 'Business, Finance & Entrepreneurship', skipsArtsCriteria: true },
  { id: 'law', label: 'Law, Policy & Public Service', skipsArtsCriteria: true },
  { id: 'medicine', label: 'Medicine & Healthcare', skipsArtsCriteria: true },
  { id: 'arts', label: 'Arts, Media & Creative', skipsArtsCriteria: false },
  { id: 'other', label: 'Multidisciplinary / Other', skipsArtsCriteria: false },
]

export const CRITERIA: Criterion[] = [
  {
    id: 'awards',
    name: 'Awards & Prizes',
    question: 'Have you received awards or prizes for excellence in your field?',
    options: [
      { label: 'No awards to date', score: 0 },
      { label: 'Local, student, or institutional awards', score: 1 },
      { label: 'National awards or competitive grants with a rigorous selection process', score: 2 },
      { label: 'International awards or top-tier recognition in your field', score: 3 },
    ],
  },
  {
    id: 'membership',
    name: 'Distinguished Memberships',
    question: 'Are you a member of any associations that require outstanding achievement for admission?',
    options: [
      { label: 'No qualifying memberships', score: 0 },
      { label: 'Professional associations with standard paid membership', score: 1 },
      { label: 'Selective bodies requiring peer nomination or qualification review', score: 2 },
      { label: 'Elite associations where admission is judged by recognised experts in the field', score: 3 },
    ],
  },
  {
    id: 'published_material',
    name: 'Published Material About You',
    question: 'Has your work been covered in professional publications or major media?',
    options: [
      { label: 'No published coverage', score: 0 },
      { label: 'Brief mentions in industry blogs or local media', score: 1 },
      { label: 'Featured coverage in trade publications or national media', score: 2 },
      { label: 'Profiled or cited in major national or international publications', score: 3 },
    ],
  },
  {
    id: 'judging',
    name: 'Judging',
    question: 'Have you served as a judge or reviewer of the work of others in your field?',
    options: [
      { label: 'No judging experience', score: 0 },
      { label: 'Internal reviews within my organisation', score: 1 },
      { label: 'External reviewer for journals, conferences, or competitions', score: 2 },
      { label: 'Regular judge or panellist for major competitions, journals, or grant panels', score: 3 },
    ],
  },
  {
    id: 'contributions',
    name: 'Original Contributions',
    question: 'Have you made original contributions of major significance to your field?',
    options: [
      { label: 'No major original contributions', score: 0 },
      { label: 'Contributions adopted primarily within my organisation', score: 1 },
      { label: 'Contributions with measurable industry-wide impact', score: 2 },
      { label: 'Field-defining work with documented national or international impact', score: 3 },
    ],
  },
  {
    id: 'scholarly',
    name: 'Scholarly Articles',
    question: 'Have you authored scholarly articles in professional or major trade publications?',
    options: [
      { label: 'No publications', score: 0 },
      { label: '1–3 publications in standard journals or trade publications', score: 1 },
      { label: '4–10 publications including peer-reviewed journals', score: 2 },
      { label: '10+ publications in high-impact or top-tier journals', score: 3 },
    ],
  },
  {
    id: 'critical_role',
    name: 'Critical Role',
    question: 'Have you held a leading or critical role in distinguished organisations?',
    options: [
      { label: 'Standard individual contributor roles', score: 0 },
      { label: 'Team lead or department head at a reputable organisation', score: 1 },
      { label: 'Senior role at a nationally recognised organisation', score: 2 },
      { label: 'C-suite, founder, or equivalent at a distinguished organisation', score: 3 },
    ],
  },
  {
    id: 'high_salary',
    name: 'High Salary',
    question: 'Does your compensation place you significantly above peers in your field?',
    options: [
      { label: 'Average for my field and country', score: 0 },
      { label: 'Above average (top 25% for my field and country)', score: 1 },
      { label: 'Well above average (top 10% for my field and country)', score: 2 },
      { label: 'Significantly above peers (top 5% for my field and country)', score: 3 },
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial Success',
    artsOnly: true,
    question: 'Do you have documented commercial success in your creative work?',
    options: [
      { label: 'Limited commercial traction', score: 1 },
      { label: 'Meaningful commercial traction with documented metrics', score: 2 },
      { label: 'Significant revenue, streaming numbers, or audience metrics', score: 3 },
      { label: 'Major commercial success with broad market impact', score: 3 },
    ],
  },
  {
    id: 'display',
    name: 'Display of Work',
    artsOnly: true,
    question: 'Has your work been displayed at artistic exhibitions or showcases?',
    options: [
      { label: 'Local or community exhibitions', score: 1 },
      { label: 'Regional exhibitions or juried showcases', score: 2 },
      { label: 'National exhibitions or major curated showcases', score: 3 },
      { label: 'International exhibitions, biennales, or prestigious institutional displays', score: 3 },
    ],
  },
]

export const IMPROVEMENTS: Record<string, { label: string; bumpTo: number }> = {
  awards: { label: 'Receive a nationally recognised award', bumpTo: 2 },
  membership: { label: 'Gain admission to a peer-reviewed professional body', bumpTo: 2 },
  published_material: { label: 'Be profiled in a major national publication', bumpTo: 2 },
  judging: { label: 'Serve on a peer review panel or journal editorial board', bumpTo: 2 },
  contributions: { label: 'Publish a contribution with documented industry adoption', bumpTo: 2 },
  scholarly: { label: 'Publish 5+ articles in peer-reviewed journals', bumpTo: 2 },
  critical_role: { label: 'Take a senior role at a distinguished organisation', bumpTo: 2 },
  high_salary: { label: 'Move into top 10% compensation for your field', bumpTo: 2 },
}

export const COUNTRIES = [
  'Nigeria', 'United States', 'United Kingdom', 'Canada', 'India', 'Pakistan',
  'Ghana', 'Kenya', 'South Africa', 'Philippines', 'China', 'Brazil',
  'Mexico', 'Germany', 'France', 'Australia', 'Other',
]

export function getQuestionsForField(fieldId: string): Criterion[] {
  const field = FIELDS.find(f => f.id === fieldId)
  if (!field) return CRITERIA
  if (field.skipsArtsCriteria) return CRITERIA.filter(c => !c.artsOnly)
  return CRITERIA
}

export function computeScore(answers: Record<string, number>, applicable: Criterion[]): Score {
  const total = applicable.reduce((sum, c) => sum + (answers[c.id] ?? 0), 0)
  const met = applicable.filter(c => (answers[c.id] ?? 0) >= 2).length
  const max = applicable.length * 3
  const pct = max > 0 ? total / max : 0
  return { total, met, max, pct }
}

export function getTier(pct: number, met: number): Tier {
  if (met >= 4 && pct >= 0.65) return { name: 'Strong', color: '#0D9488', tone: 'strong' }
  if (met >= 3 && pct >= 0.45) return { name: 'Viable', color: '#D97706', tone: 'viable' }
  if (met >= 2 || pct >= 0.3) return { name: 'Developing', color: '#78776F', tone: 'developing' }
  return { name: 'Early Stage', color: '#A8A7A3', tone: 'early' }
}

export function getStrengthLabel(score: number): { label: string; color: string } {
  if (score >= 3) return { label: 'Strong', color: '#0D9488' }
  if (score === 2) return { label: 'Moderate', color: '#D97706' }
  if (score === 1) return { label: 'Emerging', color: '#A8A7A3' }
  return { label: 'Not met', color: '#D4D3CF' }
}

export function getStrategicDirection(answers: Record<string, number>, fieldId: string): { theme: string; description: string } {
  const strongIds = new Set(
    Object.entries(answers).filter(([, v]) => (v ?? 0) >= 2).map(([k]) => k)
  )
  const has = (...ids: string[]) => ids.every(id => strongIds.has(id))
  const hasAny = (...ids: string[]) => ids.some(id => strongIds.has(id))

  if (has('scholarly', 'published_material') && hasAny('contributions', 'judging')) {
    return {
      theme: 'Research authority and documented impact',
      description: 'Your profile points toward a field of endeavour framed around scholarly contribution and peer-recognised expertise. The strongest EB-1A arguments here typically centre on how your research has been adopted, cited, or translated into practice, rather than on publication volume alone.',
    }
  }
  if (has('critical_role', 'contributions') && hasAny('awards', 'high_salary')) {
    return {
      theme: 'Leadership and organisational impact',
      description: 'Your profile suggests a field of endeavour framed around strategic leadership and measurable contribution to a distinguished organisation. The strongest argument in this shape connects your specific role to quantifiable outcomes: decisions made, initiatives led, results delivered.',
    }
  }
  if (has('contributions', 'awards') && hasAny('published_material', 'critical_role')) {
    return {
      theme: 'Field-defining work with external recognition',
      description: 'Your profile shows the pattern of a professional whose work has been externally validated and broadly recognised. The strongest framing here centres on the specific contribution that distinguishes your record: the thing you have done that others in your field have not.',
    }
  }
  if (fieldId === 'arts' && hasAny('commercial', 'display', 'awards')) {
    return {
      theme: 'Creative excellence with documented reach',
      description: 'Your profile aligns with the EB-1A evidentiary pattern for creative professionals: juried recognition, documented audience reach, and commercial traction. The strongest argument here connects creative output to measurable market or cultural impact.',
    }
  }
  if (hasAny('membership', 'judging', 'published_material')) {
    return {
      theme: 'Peer-recognised expertise',
      description: 'Your profile shows the signal most valued by USCIS: that recognised experts in your field have validated your standing, whether through selective memberships, invitations to judge, or coverage of your work. This is often the strongest foundation on which to build a petition.',
    }
  }
  return {
    theme: 'Multi-dimensional profile requiring strategic framing',
    description: 'Your profile shows breadth across multiple criteria but a clear unifying argument has not yet emerged. The Full Strategic Assessment identifies which specific angle best fits your record. This is typically the most consequential single decision in an EB-1A or NIW petition.',
  }
}

export function getInterpretation(tier: Tier, met: number): { headline: string; body: string; recommendation: string } {
  switch (tier.tone) {
    case 'strong':
      return {
        headline: 'Your profile aligns with successful EB-1A petitioners.',
        body: 'Meeting the threshold is necessary but not sufficient. USCIS applies a final merits determination evaluating whether the totality of your evidence places you among the small percentage at the top of your field. At this level, evidence framing and field of endeavour construction typically determine outcomes.',
        recommendation: 'The question for you is not whether to file, but how to frame the strongest argument from your specific record.',
      }
    case 'viable':
      return {
        headline: 'Your profile is in range, but framing will determine the outcome.',
        body: `You meet the evidentiary threshold for ${met} criteria, above the minimum USCIS requires. Many successful petitioners filed with profiles in this range, and many have had petitions returned with Requests for Evidence that cost six months of time. The difference is usually not the evidence itself, but how it is constructed and presented.`,
        recommendation: 'A strategic assessment identifies whether to file now or strengthen specific areas first.',
      }
    case 'developing':
      return {
        headline: 'Your profile shows emerging strength but is not yet at the threshold.',
        body: 'This does not mean you do not qualify. Self-assessment tends to understate actual qualification. Professionals routinely undervalue achievements that carry real evidentiary weight with USCIS. What it does mean is that the strongest case from your current record will require careful construction.',
        recommendation: 'A strategic assessment would identify which existing achievements carry more weight than you may realise, and which specific gaps to close.',
      }
    default:
      return {
        headline: 'An EB-1A petition is not advisable at this stage.',
        body: 'This is honest feedback. Burlington turns away profiles that are not ready to file. We would rather recommend 12 to 18 months of deliberate development than accept an engagement that ends in denial. This assessment may also be understating your record; self-assessment often does.',
        recommendation: 'If you want a written roadmap of what to build toward, specific, prioritised, and calibrated to your field, the Full Strategic Assessment is designed for exactly this.',
      }
  }
}

export function getComparison(pct: number): string {
  if (pct >= 0.65) return 'Your score places you within the range typically associated with approved EB-1A petitioners.'
  if (pct >= 0.45) return 'Your score places you in the range where outcomes depend heavily on evidence framing and petition construction.'
  if (pct >= 0.25) return 'Your score places you below the typical approved range, though many professionals in this band have strengthened their records over 12–18 months and successfully filed.'
  return 'Your score places you significantly below the typical approved range. Strategic development over the next 18–24 months is generally the more appropriate path.'
}
