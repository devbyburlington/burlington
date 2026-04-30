export interface FaqItem {
  question: string
  answer: string
  categorySlug: string
}

export interface FaqCategory {
  slug: string
  label: string
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  { slug: 'all', label: 'All' },
  { slug: 'filing', label: 'Filing & Processing' },
  { slug: 'eligibility', label: 'Eligibility' },
  { slug: 'engagement', label: 'Engagement & Fees' },
  { slug: 'travel', label: 'Travel & Nationality' },
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is USCIS accepting new EB-1A and EB-2 NIW filings?',
    answer: 'Yes. USCIS continues to accept new I-140 filings for both classifications. The hold applies only to final decisions, not to receipt, docketing, substantive processing, or RFE issuance. Standard processing is currently 20 to 22 months.',
    categorySlug: 'filing',
  },
  {
    question: 'USCIS placed a hold on final adjudication. Will my case proceed?',
    answer: 'Processing continues up to the point of final adjudication and RFEs are being actively issued. Legal challenges are proceeding in federal court. The priority date is established on the day USCIS receives the I-140, not on the date of final approval.',
    categorySlug: 'filing',
  },
  {
    question: 'Will the proposed regulatory changes make it harder to qualify?',
    answer: 'The proposed rule (RIN 1615-AC85) is not yet operative. If finalised, it would raise evidentiary thresholds. Petitions filed now are assessed against current standards. Filing before the rules are finalised means the petition is submitted under the current, more favourable framework.',
    categorySlug: 'filing',
  },
  {
    question: 'What is the difference between EB-1A and EB-2 NIW, and why file both?',
    answer: 'The EB-1A requires sustained acclaim through at least three of ten criteria. The EB-2 NIW requires the Dhanasar three-prong test. Filing both establishes the priority date across both pathways, creates strategic redundancy, and allows a single evidence record to support both petitions.',
    categorySlug: 'eligibility',
  },
  {
    question: 'What does Burlington Consult provide that a self-petitioner cannot handle independently?',
    answer: 'The case architecture that determines success: field of endeavour construction, criterion mapping, up to twelve recommendation letters drafted from scratch, the proprietary salary analytics framework, a media network for published coverage, and twelve months of RFE response support at no additional cost.',
    categorySlug: 'eligibility',
  },
  {
    question: 'Are USCIS filing fees included?',
    answer: 'No. USCIS fees are payable directly to USCIS. Current I-140 fees: $1,315 total. Optional premium processing: $2,965 additional for a 15-business-day decision. Burlington Consult advises on whether premium processing is appropriate.',
    categorySlug: 'engagement',
  },
  {
    question: 'What alternative fee arrangements are available?',
    answer: 'Burlington Consult accommodates deferred payment, phased structures, and milestone-tied arrangements. No alternative arrangement affects quality or scope. Raise this at the outset rather than treating it as a barrier.',
    categorySlug: 'engagement',
  },
  {
    question: 'I am a Nigerian national. Does the 2025-2026 travel restriction affect my ability to file?',
    answer: 'The I-140 petition and the entry restriction are separate legal instruments. An I-140 can be filed regardless. A strong EB-1A or NIW approval is itself the most direct evidence for the national interest exception. File now, secure the approval, establish the priority date.',
    categorySlug: 'travel',
  },
  {
    question: 'I hold dual citizenship (British and Nigerian). Which is relevant?',
    answer: 'Neither. The EB-1A and EB-2 NIW are merit-based pathways — eligibility is based entirely on professional record, not nationality or passport. The I-140 is a classification petition, not a visa application.',
    categorySlug: 'travel',
  },
  {
    question: 'Does Burlington work with professionals outside Africa?',
    answer: 'Yes. Burlington Consult works with senior professionals across the African continent, as well as those in India, the United Kingdom, Canada, Brazil, and other regions. The methodology is designed for the global professional context, not a single geography.',
    categorySlug: 'travel',
  },
  {
    question: 'I already have a second citizenship. Why do I need a U.S. green card?',
    answer: 'A green card is permanent U.S. work authorisation. For professionals in financial services, law, technology, and consulting, the value is primarily access to U.S. market rates — not relocation. A CBI passport provides travel advantages; it does not provide U.S. work authorisation.',
    categorySlug: 'travel',
  },
]
