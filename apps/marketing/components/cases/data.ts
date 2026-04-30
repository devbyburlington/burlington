export interface CaseProfile {
  id: string
  num: string
  title: string
  meta: string
  pathway: string
  pathwaySlug: string
  field: string
  fieldSlug: string
  criteriaLabel: string
  criteria: string[]
  outcome: string
}

export const PATHWAY_FILTERS = [
  { slug: 'all', label: 'All' },
  { slug: 'eb1a', label: 'EB-1A' },
  { slug: 'niw', label: 'NIW' },
  { slug: 'dual', label: 'Dual Petition' },
] as const

export const FIELD_FILTERS = [
  { slug: 'all-fields', label: 'All fields' },
  { slug: 'tech', label: 'Technology' },
  { slug: 'med', label: 'Medicine' },
  { slug: 'law', label: 'Law & Policy' },
  { slug: 'fin', label: 'Finance' },
  { slug: 'creative', label: 'Creative' },
  { slug: 'academia', label: 'Academia' },
] as const

export const CASES: CaseProfile[] = [
  {
    id: 'profile-01',
    num: '01',
    title: 'Senior Machine Learning Engineer',
    meta: 'Big Tech, 8 years experience · West Africa',
    pathway: 'Dual Petition',
    pathwaySlug: 'dual',
    field: 'Technology',
    fieldSlug: 'tech',
    criteriaLabel: 'Criteria mapped',
    criteria: [
      'Original contributions of major significance in applied ML',
      'Critical role at a distinguished organisation',
      'High salary relative to peers in the field in relevant country',
      'Scholarly articles in peer-reviewed journals',
    ],
    outcome: 'EB-1A + NIW dual petition filed',
  },
  {
    id: 'profile-02',
    num: '02',
    title: 'Consultant Cardiologist & Researcher',
    meta: 'Teaching hospital, 12 years experience · South Asia',
    pathway: 'Dual Petition',
    pathwaySlug: 'dual',
    field: 'Medicine',
    fieldSlug: 'med',
    criteriaLabel: 'Criteria mapped',
    criteria: [
      'Scholarly articles in major medical journals',
      'Judging: peer reviewer for three cardiology journals',
      'Awards for excellence in clinical research',
      'Original contributions advancing interventional cardiology',
    ],
    outcome: 'EB-1A + NIW dual petition filed',
  },
  {
    id: 'profile-03',
    num: '03',
    title: 'Technology Policy Advisor',
    meta: 'Government and multilateral organisations · West Africa',
    pathway: 'EB-1A',
    pathwaySlug: 'eb1a',
    field: 'Law & Policy',
    fieldSlug: 'law',
    criteriaLabel: 'Criteria mapped',
    criteria: [
      'Original contributions to AI governance frameworks',
      'Critical role in distinguished policy organisations',
      'Published material about the petitioner in major publications',
      'Membership in expert advisory councils',
    ],
    outcome: 'EB-1A petition filed · First-submission approval',
  },
  {
    id: 'profile-04',
    num: '04',
    title: 'Fintech Product Lead',
    meta: 'Series B startup, previously Big 4 advisory · East Africa',
    pathway: 'Dual Petition',
    pathwaySlug: 'dual',
    field: 'Finance',
    fieldSlug: 'fin',
    criteriaLabel: 'Criteria mapped',
    criteria: [
      'Original contributions to financial inclusion infrastructure',
      'Critical role at a distinguished organisation',
      'High salary relative to peers in the field in relevant country',
    ],
    outcome: 'EB-1A + NIW dual petition filed',
  },
  {
    id: 'profile-05',
    num: '05',
    title: 'Music Producer & Creative Director',
    meta: 'Multiple award-winning projects, international distribution · West Africa',
    pathway: 'EB-1A',
    pathwaySlug: 'eb1a',
    field: 'Creative',
    fieldSlug: 'creative',
    criteriaLabel: 'Criteria mapped',
    criteria: [
      'Awards: nationally recognised music and creative awards',
      'Published material about the petitioner in major media',
      'Commercial success evidenced by streaming and sales data',
      'Critical role in distinguished creative organisations',
    ],
    outcome: 'EB-1A petition filed',
  },
  {
    id: 'profile-06',
    num: '06',
    title: 'Postdoctoral Researcher, Computational Biology',
    meta: 'R1 university, 40+ publications · South Asia',
    pathway: 'NIW',
    pathwaySlug: 'niw',
    field: 'Academia',
    fieldSlug: 'academia',
    criteriaLabel: 'Criteria mapped',
    criteria: [
      'Scholarly articles with 500+ citations',
      'Judging: editorial board and peer review for three journals',
      'Original contributions advancing drug discovery methods',
    ],
    outcome: 'NIW petition filed · RFE responded within 60 business days',
  },
  {
    id: 'profile-07',
    num: '07',
    title: 'Cloud Infrastructure Architect',
    meta: 'Hyperscaler, 10 years experience · South America',
    pathway: 'EB-1A',
    pathwaySlug: 'eb1a',
    field: 'Technology',
    fieldSlug: 'tech',
    criteriaLabel: 'Criteria mapped',
    criteria: [
      'Original contributions to distributed systems at scale',
      'Critical role: led architecture for Fortune 500 deployments',
      'High salary relative to peers in the field in relevant country',
      'Membership in distinguished professional standards body',
    ],
    outcome: 'EB-1A petition filed',
  },
  {
    id: 'profile-08',
    num: '08',
    title: 'Public Health Epidemiologist',
    meta: 'International health organisation, MPH + MD · East Africa',
    pathway: 'NIW',
    pathwaySlug: 'niw',
    field: 'Medicine',
    fieldSlug: 'med',
    criteriaLabel: 'Dhanasar framing',
    criteria: [
      'Proposed endeavour: infectious disease surveillance infrastructure',
      'Well positioned: led national response programmes',
      'National interest: U.S. pandemic preparedness and global health security',
    ],
    outcome: 'NIW petition filed',
  },
]
