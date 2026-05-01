export interface TeamMemberProfile {
  name: string
  slug: string
  role: string
  photo?: string
  photoPosition?: string
  grayscale?: boolean
  pills?: string[]
  bio: string[]
  quote?: string
  education?: { institution: string; credential: string }[]
  experience?: { org: string; role: string }[]
  expertise?: string[]
  leads?: string[]
  featured?: boolean
}

export function getInitials(name: string): string {
  return name
    .replace(/[,(].*/g, '')
    .replace(/"[^"]*"/g, '')
    .trim()
    .split(/\s+/)
    .filter((p) => !p.endsWith('.'))
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export const LEADERSHIP: TeamMemberProfile = {
  name: 'Chris Ogbodo',
  slug: 'chris',
  role: 'Founder & Lead Adviser',
  photo: '/ebuka.png',
  featured: true,
  pills: ['Harvard Law', 'EB-1A Holder', 'Google Policy Fellow'],
  bio: [
    'Harvard Law School-trained strategist and self-petitioned, first-submission EB-1A holder. Leads every engagement with direct practitioner knowledge of the Kazarian two-step framework, Dhanasar precedent, and current USCIS adjudication standards.',
    `Chris filed and obtained approval on his own EB-1A petition on first submission, without employer sponsorship, without a law firm, and without a single Request for Evidence. That direct experience with the USCIS system is the foundation of Burlington Consult's advisory approach.`,
    `Before founding Burlington Consult, Chris worked at the intersection of technology policy, AI governance, and immigration strategy. He was Africa's first Google Policy Fellow, working on internet freedom, digital rights, and tech policy across multiple jurisdictions.`,
  ],
  quote: `The most consequential decision in any petition isn't the evidence. It's the field of endeavour. Get that wrong and no amount of documentation fixes it.`,
  education: [
    { institution: 'Harvard Law School', credential: 'LL.M., Technology Law & AI Policy' },
    { institution: 'Harvard Business School', credential: 'MBA (Incoming)' },
  ],
  experience: [
    { org: 'Google', role: "Africa's First Policy Fellow" },
    { org: 'Meta', role: 'Policy' },
    { org: 'Luminate', role: 'Fellow' },
  ],
  expertise: ['EB-1A Petition Development', 'Dual Petition Strategy', 'Immigration Policy', 'AI Governance'],
  leads: ['EB-1A Petition Development', 'Dual Petition Strategy'],
}

export const TEAM: TeamMemberProfile[] = [
  {
    name: 'Chibuike Onyia, ACA',
    slug: 'chibuike',
    role: 'Salary Criterion Lead',
    photo: '/team-onyia.jpg',
    pills: ['PwC', 'Rotman MBA Candidate', 'ACA'],
    bio: [
      `Chibuike is a chartered accountant (ACA) with audit experience at PwC and is currently completing his MBA at the Rotman School of Management, University of Toronto. His background in financial analysis, audit methodology, and data-driven decision-making directly informs Burlington Consult's salary criterion framework.`,
      `Chibuike leads Burlington's proprietary salary analytics methodology: the framework used to satisfy the "high salary relative to peers in the field in relevant country" criterion. This criterion is one of the most frequently challenged by USCIS and one of the most powerful when properly evidenced.`,
      'His approach benchmarks client compensation against independently verifiable salary data across the relevant geography, industry, and seniority level, producing documentation that withstands USCIS scrutiny and, critically, RFE challenge. The framework has a 100% success rate on the salary criterion across every petition where it has been deployed.',
    ],
    quote: `The salary criterion isn't about earning a lot. It's about proving you earn significantly more than your peers, with data USCIS can independently verify.`,
    education: [
      { institution: 'Rotman School of Management', credential: 'MBA Candidate' },
    ],
    experience: [
      { org: 'PwC', role: 'Audit' },
    ],
    expertise: ['Salary Analytics', 'Financial Analysis', 'Compensation Benchmarking', 'Dual Petition'],
    leads: ['Salary Criterion', 'Dual Petition'],
  },
  {
    name: 'Efezino Onyeke, AICA',
    slug: 'efezino',
    role: 'Legal Analyst',
    photo: '/team-efezino.jpg',
    pills: ['Valedictorian', 'UPenn', 'HKUST', 'AICA'],
    bio: [
      'Efezino graduated as valedictorian from her undergraduate programme before completing advanced studies at the University of Pennsylvania and the Hong Kong University of Science and Technology. She holds the AICA designation in accounting and audit, bringing analytical rigour to every evidence review she conducts.',
      `Efezino leads Burlington Consult's legal analysis and research function, serving as the evidentiary backbone of every petition the firm files. Her work ensures that every exhibit is cross-referenced to a specific criterion, independently verifiable, and presented in the format that USCIS adjudicators are trained to review.`,
    ],
    quote: `USCIS doesn't deny weak candidates. It denies weak evidence. My job is to make sure the evidence is beyond question.`,
    education: [
      { institution: 'University of Pennsylvania', credential: 'Advanced Studies' },
      { institution: 'Hong Kong University of Science and Technology', credential: 'Advanced Studies' },
    ],
    expertise: ['Legal Analysis', 'Evidence Architecture', 'Regulatory Research', 'Criterion Mapping'],
    leads: ['EB-1A', 'NIW'],
  },
  {
    name: 'Afiong Ibio, Esq.',
    slug: 'afiong',
    role: 'Director and Head of Legal, Nigeria',
    photo: '/team-afiong.jpg',
    pills: ['8 Years Corporate Law', 'Compliance', 'Nigerian Bar'],
    bio: [
      'Afiong is a qualified legal practitioner with eight years of experience in corporate law, regulatory compliance, and commercial advisory across Nigerian and international jurisdictions. She is a member of the Nigerian Bar Association and holds specialist expertise in cross-border regulatory matters.',
      `As Director and Head of Legal for Burlington Consult's Nigerian operations, Afiong ensures regulatory compliance across both U.S. and Nigerian jurisdictions. She reviews engagement agreements, manages the firm's legal obligations, and provides compliance oversight for every engagement originating from Nigeria.`,
      'Her work protects both the firm and its clients, ensuring that every engagement is structured correctly, every disclosure is made, and every regulatory requirement is met before a single document is filed.',
    ],
    quote: 'Immigration advisory is a trust business. The legal framework behind every engagement is what makes that trust warranted.',
    expertise: ['Corporate Law', 'Regulatory Compliance', 'Cross-Border Advisory', 'Engagement Agreements'],
    leads: ['NIW', 'Nigeria Legal'],
  },
  {
    name: 'Andrew Libby',
    slug: 'andrew',
    role: 'STEM Specialist',
    photo: '/team-andrew.jpg',
    pills: ['Harvard University', 'U.S. State Department'],
    bio: [
      `Andrew brings a rare combination of academic depth and policy-level experience to Burlington Consult's STEM advisory practice. Trained at Harvard University and with operational experience at the U.S. State Department, he understands how U.S. federal institutions assess technical contributions, the same lens USCIS adjudicators apply when evaluating EB-1A and NIW petitions.`,
      'Andrew advises on STEM-focused petitions for engineers, researchers, data scientists, and technical professionals. He specialises in translating complex technical contributions into the language of USCIS evidentiary standards, ensuring the "original contributions of major significance" criterion is mapped with precision.',
    ],
    quote: 'A strong technical contribution is not the same as a strong EB-1A argument. The gap between the two is where most STEM petitions fail.',
    education: [
      { institution: 'Harvard University', credential: 'STEM' },
    ],
    experience: [
      { org: 'U.S. State Department', role: 'Policy' },
    ],
    expertise: ['STEM Petitions', 'Technical Criterion Mapping', 'Research Analysis', 'Federal Policy'],
    leads: ['EB-1A', 'STEM'],
  },
  {
    name: 'Chisom Chibuike',
    slug: 'chisom',
    role: 'AI & Prompt Engineering Lead',
    photo: '/team-chisom.jpg',
    pills: ['Cambridge AI/ML Scholar', 'Top 2 Graduate, Mathematics'],
    bio: [
      `Chisom graduated top 2 from her undergraduate programme in Mathematics and is an incoming Masters student in Human-Inspired AI at the University of Cambridge. Her research interests span the theoretical foundations of Trustworthy AI, specifically how we can ensure foundational Alignment and Control to make sure that AI systems are trustworthy. These are the same technologies she deploys internally at Burlington Consult.`,
      `Chisom leads Burlington Consult's AI and prompt engineering capabilities, building the internal tools that accelerate case research, evidence mapping, and document generation. Her work has reduced research time per petition by over 60% while improving the precision of criterion mapping.`,
      `She also contributes to Burlington's Knowledge Centre content on AI governance and technology policy, topics that increasingly intersect with EB-1A case strategy for technology professionals.`,
    ],
    quote: `AI doesn't build cases. People do. But the right tools make the difference between good work and work that's comprehensive enough to survive any RFE.`,
    education: [
      { institution: 'University of Cambridge', credential: 'Human-Inspired AI (Incoming)' },
    ],
    expertise: ['Trustworthy AI', 'Prompt Engineering', 'Alignment & Control', 'Process Automation'],
  },
  {
    name: 'Ifeanyi Anthony Agah',
    slug: 'ifeanyi',
    role: 'Senior Product Manager',
    photo: '/team-ifeanyi.jpg',
    pills: ['Founding PM', 'Fintech & Identity'],
    bio: [
      'Ifeanyi is a founding product manager with experience across fintech and digital identity platforms. He has built products from zero to launch, managing cross-functional teams through ambiguity and shipping under constraints.',
      `Ifeanyi manages Burlington Consult's product roadmap and client tools, ensuring that every touchpoint in the engagement process is efficient, intuitive, and built to scale. He also leads internal process optimisation, identifying bottlenecks in the case architecture workflow and building systems to eliminate them.`,
    ],
    quote: `A great product is a system that makes the right thing the easy thing. That's what we're building for every client interaction.`,
    expertise: ['Product Strategy', 'Fintech', 'Process Optimisation', 'Client Tools'],
  },
  {
    name: 'Paschal Ucheagwu',
    slug: 'paschal',
    role: 'Head of Creative Partnerships',
    photo: '/team-pascal.jpg',
    pills: ['Creative Partnerships', 'Artist Relations'],
    bio: [
      `Paschal brings deep networks across Africa's creative industries: music, film, visual arts, and media. His relationships with artists, managers, labels, and cultural institutions give Burlington Consult direct access to the creative ecosystem from which many of the firm's most distinctive EB-1A cases originate.`,
      'As Head of Creative Partnerships, Paschal works directly with artists, musicians, filmmakers, and creative professionals on EB-1A petitions. He identifies the strongest available criteria for non-traditional profiles and coordinates strategic press and media strategy for creative clients.',
    ],
    quote: `The creative industry doesn't speak USCIS language. My job is to bridge that gap, turning a career into a case.`,
    expertise: ['EB-1A for Creatives', 'Media Strategy', 'Artist Relations', 'Creative Industries'],
    leads: ['EB-1A Creatives'],
  },
  {
    name: 'Michael Aromolaran',
    slug: 'michael',
    role: 'Chief Writing Officer',
    pills: ['NYU Graduate Student', '7 Years Editorial'],
    bio: [
      'Michael is a writer and culture journalist with seven years of editorial and communications experience across major publications and media organisations. He is currently a graduate student at New York University, where his work focuses on narrative, cultural criticism, and long-form editorial.',
      `As Chief Writing Officer, Michael leads all written output at Burlington Consult, from petition narratives and recommendation letters to the firm's published content in the Knowledge Centre. His particular strength is translating complex professional achievements into clear, compelling narratives that satisfy USCIS evidentiary requirements while remaining genuinely readable.`,
    ],
    quote: 'A petition is a story told to an audience of one: the USCIS adjudicator. Every sentence has to earn its place.',
    education: [
      { institution: 'New York University', credential: 'Graduate Student, Writing' },
    ],
    expertise: ['Petition Narratives', 'Recommendation Letters', 'Editorial Strategy', 'Cultural Criticism'],
  },
  {
    name: 'Samuel "Sammie" Alifa',
    slug: 'sammie',
    role: 'Creative Director',
    photo: '/team-sammie.jpg',
    pills: ['Film', 'Visual Storytelling', 'Ahmadu Bello University'],
    bio: [
      'Samuel "Sammie" Alifa is a filmmaker and visual storyteller based in Nigeria. He studied Guidance and Counselling at Ahmadu Bello University, Kaduna, and has been creating film and video content since producing his first short film in 2020.',
      `Sammie leads Burlington Consult's creative direction, overseeing the visual identity, video content, and storytelling that shapes how the firm presents itself to prospective clients. He brings a filmmaker's discipline to every piece of content: narrative structure, visual consistency, and the understanding that credibility is built not just by what you say, but by how it looks when you say it.`,
    ],
    quote: `Every client has a story that's bigger than a petition. My job is to make sure the world sees it.`,
    education: [
      { institution: 'Ahmadu Bello University', credential: 'Guidance & Counselling' },
    ],
    expertise: ['Film & Video', 'Brand Identity', 'Visual Storytelling', 'Content Direction'],
  },
  {
    name: 'Stanley Ojima',
    slug: 'stanley',
    role: 'Head of Product Design',
    photo: '/team-ojima.jpg',
    pills: ['8+ Years UX', 'Visual Systems'],
    bio: [
      'Stanley has over eight years of experience in UX design, visual systems, and product design across fintech, health tech, and advisory platforms. His work spans end-to-end product design, from research and information architecture to visual design and front-end implementation.',
      `Stanley leads Burlington Consult's product design, overseeing the digital experience, visual identity, and interface systems that define how the firm presents to the world. He also designs the client-facing tools, assessment interfaces, and internal case management dashboards.`,
    ],
    quote: 'A consulting firm that charges premium fees needs to look like it charges premium fees. Design is the first proof of competence.',
    expertise: ['Product Design', 'UX/UI', 'Visual Systems', 'Design Systems'],
  },
  {
    name: 'Chukwu-Dike',
    slug: 'chukwu-dike',
    role: 'Software Engineer',
    photo: '/team-chukwudike.jpg',
    photoPosition: 'center_top',
    pills: ['Medical Doctor', 'Full-Stack Developer'],
    bio: [
      `Chukwu-Dike brings a rare dual background as both a medical doctor and full-stack software engineer. His medical training gives him a clinician's attention to detail and diagnostic rigour, while his engineering skills allow him to build the tools that power Burlington's internal operations.`,
      'His medical background is particularly valuable when advising on petitions for healthcare professionals, understanding the clinical terminology, institutional hierarchies, and publication standards that USCIS adjudicators expect to see.',
    ],
    quote: `Medicine taught me that every detail matters and every assumption needs evidence. That's exactly what USCIS expects.`,
    expertise: ['Software Engineering', 'Medical Petitions', 'Internal Tooling', 'Clinical Research'],
  },
  {
    name: 'Adonai Jonathan',
    slug: 'adonai',
    role: 'Head of Engineering',
    photo: '/team-adonai.jpg',
    grayscale: true,
    pills: ['4+ Years Engineering', 'Front-End & Infrastructure', 'Product Development'],
    bio: [
      `Adonai is the technical backbone of Burlington Consult. He designed and built the firm's entire digital platform from the ground up: every page, every component, every interaction, every line of production code. The site is not a theme. It is not a template. It is a custom-built system engineered to communicate institutional credibility at every touchpoint.`,
      `Beyond the public-facing platform, Adonai built Burlington's internal systems: the case management architecture, the adviser knowledge base, and the automation layer that lets a lean team operate with the throughput of a much larger firm.`,
    ],
    quote: `The site is the firm's first impression. It has to be flawless, not because anyone will notice, but because they'll notice if it isn't.`,
    expertise: ['Full-Stack Engineering', 'System Architecture', 'Payment Systems', 'Platform Development'],
  },
]

export const ALL_MEMBERS: TeamMemberProfile[] = [LEADERSHIP, ...TEAM]
