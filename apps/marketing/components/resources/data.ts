export interface Article {
  slug: string
  title: string
  description: string
  category: string
  categorySlug: string
  date: string
  readTime: string
  author: string
  pinned: boolean
  body: string
}

export const CATEGORIES = [
  { slug: 'all', label: 'All' },
  { slug: 'regulatory', label: 'Regulatory Updates' },
  { slug: 'strategy', label: 'Case Strategy' },
  { slug: 'field', label: 'Field of Endeavour' },
  { slug: 'rfe', label: 'RFE Response' },
  { slug: 'data', label: 'Data & Trends' },
]

export const ARTICLES: Article[] = [
  {
    slug: 'proposed-rule-rin-1615-ac85',
    title: 'RIN 1615-AC85: What the Proposed Rule Changes Mean for EB-1A and NIW Petitions Filed in 2026',
    description: 'RIN 1615-AC85: What the Proposed Rule Changes Mean for EB-1A and NIW Petitions Filed in 2026',
    category: 'Regulatory Update',
    categorySlug: 'regulatory',
    date: 'March 2026',
    readTime: '14 min',
    author: 'Chris Ogbodo',
    pinned: true,
    body: `<p>The Department of Homeland Security has listed "Petition for Immigrant Worker Reforms" (RIN 1615-AC85) in its Spring 2025 Unified Regulatory Agenda. Draft regulations are anticipated in 2026. The proposed changes would affect every employment-based green card category  —  but the most consequential impact falls on EB-1A extraordinary ability and EB-2 National Interest Waiver petitions.</p>
    <p>This article explains what is actually changing, what is not, and why the filing calculus for qualified professionals favours acting now rather than waiting.</p>
    <h2>What is RIN 1615-AC85?</h2>
    <p>RIN 1615-AC85 is a proposed rulemaking by USCIS to modernise and update the regulations governing employment-based immigrant petitions across the EB-1, EB-2, and EB-3 categories. Many of the current provisions were written more than thirty years ago and have not kept pace with how modern businesses, research institutions, and professional careers actually operate.</p>
    <p>The rule would do three things. First, it would codify into federal regulation the internal policy memoranda that USCIS adjudicators currently use to evaluate petitions  —  including the Kazarian two-step framework for EB-1A and the Dhanasar three-prong test for EB-2 NIW. Second, it would establish more detailed evidentiary requirements for specific criteria. Third, it would strengthen programme integrity through expanded site-visit authority and fraud detection measures.</p>
    <h2>What would change for EB-1A petitions?</h2>
    <p>The proposed rule is expected to raise evidentiary thresholds across several of the ten regulatory criteria. The current standard requires petitioners to satisfy at least three of ten criteria, followed by a final merits determination under the Kazarian framework. The rule would not change the "three of ten" threshold  —  but it would tighten what counts as satisfying each criterion.</p>
    <p>Specifically, the rule is expected to codify stricter standards for what constitutes a "nationally or internationally recognised" award, what qualifies as a "distinguished" organisation for the critical role criterion, and what level of documentation is required to demonstrate "original contributions of major significance." Publications, awards, and evidence of real-world impact would all face more granular documentation requirements.</p>
    <p>The final merits determination  —  the second step of the Kazarian framework, where USCIS evaluates whether the totality of evidence establishes that the petitioner has "risen to the very top of the field"  —  would also be codified with clearer benchmarks. This is where many petitions currently succeed or fail, and the proposed rule would make the standard more explicit.</p>
    <h2>What would change for EB-2 NIW petitions?</h2>
    <p>The Dhanasar three-prong test would be formally codified into federal regulation for the first time. Currently, Dhanasar exists as an Administrative Appeals Office precedent decision  —  binding on adjudicators but not written into the regulatory text. Codification would make the standard more uniform but could also introduce more rigid interpretive guidelines.</p>
    <p>The proposed endeavour framework  —  the most critical single decision in any NIW petition  —  would face heightened scrutiny. Petitioners would likely need to demonstrate more specific connections between their proposed work and documented U.S. federal priorities, with more detailed plans for how the endeavour would be advanced.</p>
    <h2>What is not changing?</h2>
    <p>Several things are not affected by the proposed rule. The fundamental eligibility structure  —  three of ten criteria for EB-1A, the Dhanasar three-prong test for NIW  —  remains in place. Both pathways remain self-petitioned. No job offer, no employer sponsor, and no PERM labour certification are required. Premium processing remains available. The priority date is still established on the day USCIS receives the I-140.</p>
    <p>The rule is also not yet operative. The Notice of Proposed Rulemaking has not been published. A public comment period will follow publication. The final rule is not expected to take effect before late 2026 at the earliest  —  and could be delayed further depending on the volume and substance of public comments.</p>
    <h2>Why the filing calculus favours acting now</h2>
    <p>Petitions filed before the final rule takes effect are assessed against current standards. Once new rules are finalised, the bar rises for all petitions filed thereafter. This creates a clear window: professionals who file now submit under a more favourable framework than those who wait.</p>
    <p>The priority date  —  which governs queue position for the green card  —  is established the day USCIS receives the I-140 petition. Every month of delay in filing is a month added to the back of the queue. This is true regardless of when the petition is ultimately approved.</p>
    <p>For professionals with strong records who are considering an EB-1A or NIW petition, the strategic position is straightforward: file now, under current standards, and secure the priority date. The evidentiary environment will not become more favourable.</p>
    <h2>What Burlington Consult recommends</h2>
    <p>Burlington Consult advises qualified professionals to file under the current framework rather than wait for regulatory clarity. The firm files both EB-1A and EB-2 NIW petitions simultaneously as standard practice  —  preserving the same priority date across both pathways and creating strategic redundancy.</p>
    <p>Every engagement begins with a full assessment of the petitioner's specific profile, the strongest available field of endeavour, and the most defensible criterion mapping. This approach is designed to produce petitions that satisfy not only the current standard but would also withstand the stricter standards the proposed rule contemplates.</p>`,
  },
  {
    slug: 'field-of-endeavour-rfe',
    title: 'How to Construct a Field of Endeavour That Survives an RFE',
    description: 'How to Construct a Field of Endeavour That Survives an RFE',
    category: 'Case Strategy',
    categorySlug: 'strategy',
    date: 'March 2026',
    readTime: '11 min',
    author: 'Chris Ogbodo',
    pinned: false,
    body: `<p>The field of endeavour is the most consequential decision in any NIW petition. It is not a description of what you do. It is a legal argument  —  a specific articulation of what you propose to pursue in the United States and why that work constitutes a national interest. Get it right and the Dhanasar three-prong test falls into place. Get it wrong and no amount of evidence fixes it.</p>
    <p>This article explains what a field of endeavour actually is, why most self-prepared petitions get it wrong, and the framework Burlington Consult uses to construct proposed endeavours that withstand USCIS scrutiny  —  including Requests for Evidence.</p>
    <h2>What the field of endeavour actually is</h2>
    <p>The field of endeavour is not your job title. It is not your academic discipline. It is not a vague statement about "advancing technology" or "contributing to healthcare." It is the specific intersection of your expertise, your documented track record, and a defined area of U.S. national interest  —  articulated with enough precision that a USCIS adjudicator can evaluate it against all three Dhanasar prongs.</p>
    <p>The Dhanasar framework asks three questions. Does the proposed endeavour have substantial merit and national importance? Is the petitioner well positioned to advance it? Is it, on balance, beneficial to the United States to waive the job offer requirement? The field of endeavour must be constructed so that all three answers are demonstrably "yes"  —  supported by documentary evidence, not assertions.</p>
    <h2>Why most self-prepared petitions fail here</h2>
    <p>The most common error is constructing a field of endeavour that is either too broad or too narrow. Too broad  —  "advancing artificial intelligence in the United States"  —  and the petitioner cannot demonstrate that they are specifically well positioned to advance it. The adjudicator asks: why you, specifically, out of the thousands of AI professionals in the country? Too narrow  —  "optimising transformer model architectures for low-latency inference on edge devices at Company X"  —  and the national importance argument collapses. The adjudicator asks: how is this specific technical task a matter of national interest?</p>
    <p>The field of endeavour must sit in the precise middle: specific enough that the petitioner's unique qualifications are evident, broad enough that the national importance is clear. This calibration is where most self-petitioners  —  and many advisory firms  —  make errors that are not correctable by adding stronger evidence later.</p>
    <h2>The Burlington framework</h2>
    <p>Burlington Consult constructs every proposed endeavour through a four-step process.</p>
    <h3>Step 1: Record analysis</h3>
    <p>Before any framework is proposed, the advisory team conducts a full analysis of the petitioner's professional record  —  publications, roles, awards, contributions, media coverage, salary data, institutional affiliations. The goal is not to catalogue achievements but to identify the throughline: the specific area where the petitioner's work has had the most demonstrable impact.</p>
    <h3>Step 2: National interest mapping</h3>
    <p>The throughline is then mapped against documented U.S. federal priorities. These are not invented  —  they are drawn from published government sources: the National Science and Technology Council, the White House Office of Science and Technology Policy, the National Security Strategy, Congressional Research Service reports, and agency-specific priority documents. The proposed endeavour must connect to a priority that is documented, current, and specific.</p>
    <h3>Step 3: Stress-testing against Dhanasar</h3>
    <p>The proposed framework is tested against each Dhanasar prong independently. Can substantial merit and national importance be demonstrated with specific evidence? Can the petitioner's positioning be documented through education, experience, and prior success? Can the balancing test be satisfied  —  showing that the benefit of waiving the job offer outweighs the standard procedural requirement? If any prong is weak, the framework is revised before drafting begins.</p>
    <h3>Step 4: RFE anticipation</h3>
    <p>The final step is adversarial: the team reviews the proposed endeavour as if they were the USCIS adjudicator looking for weaknesses. What questions would an RFE ask? Where is the evidence thinnest? What connections are implied rather than documented? This step often produces the most significant revisions  —  and is the step most self-petitioners skip entirely.</p>
    <h2>What an RFE on the proposed endeavour looks like</h2>
    <p>When USCIS issues an RFE on the proposed endeavour, it typically asks one or more of the following: How does the proposed endeavour have national importance, as opposed to regional or institutional importance? What specific evidence demonstrates that the petitioner is well positioned  —  not merely qualified  —  to advance this endeavour? Why should USCIS waive the job offer requirement when the petitioner could pursue this work through standard employment channels?</p>
    <p>Each of these questions targets a specific weakness in the original framework. A well-constructed proposed endeavour anticipates and pre-empts these questions in the initial filing. Burlington Consult's twelve-month RFE retainer ensures that if an RFE is issued despite this preparation, the response is specific, documented, and strategically sound.</p>
    <h2>The field of endeavour is not a formality</h2>
    <p>It is the single most important decision in the petition. It controls whether the Dhanasar prongs are satisfied. It determines which evidence is relevant and which is peripheral. It shapes the recommendation letters, the evidence architecture, and the overall narrative. Errors at this stage compound through every subsequent element of the petition.</p>
    <p>Burlington Consult does not begin drafting until the proposed endeavour has been established and stress-tested. This discipline is the foundation of the firm's approach  —  and the reason the firm has maintained a 100% approval rate across every petition filed.</p>`,
  },
  {
    slug: 'eb1a-niw-approval-rates-2026',
    title: 'EB-1A and NIW Approval Rates in Early 2026: What the Numbers Show',
    description: 'EB-1A and NIW Approval Rates in Early 2026: What the Numbers Show',
    category: 'Data & Trends',
    categorySlug: 'data',
    date: 'February 2026',
    readTime: '8 min',
    author: 'Chris Ogbodo',
    pinned: false,
    body: `<p>Immigration advisory firms routinely cite approval rates without context. Burlington Consult believes professionals considering an EB-1A or NIW petition deserve a clear-eyed assessment of the current adjudication environment  —  not marketing numbers stripped of their meaning.</p>
    <p>This article presents the data as it stands in early 2026, explains what the numbers actually indicate, and identifies what matters for filing strategy.</p>
    <h2>The headline numbers</h2>
    <p>As of February 2026, EB-1A approval rates are running at approximately 43 percent across all petitions filed nationally. EB-2 NIW approval rates are at approximately 41 percent. These figures are drawn from Lawfully tracking data and the Manifest Law February 2026 analysis.</p>
    <p>These numbers mean that fewer than half of all EB-1A and NIW petitions filed nationally result in approval. The remaining petitions are either denied, receive a Request for Evidence, or are abandoned. This is not a high success rate  —  and any advisory firm presenting EB-1A or NIW as an easy pathway is misrepresenting the adjudication environment.</p>
    <h2>RFE issuance rates</h2>
    <p>Request for Evidence issuance rates are running at 41 to 49 percent for both EB-1A and NIW petitions in early 2026. This means that roughly half of all petitions  —  including many that are ultimately approved  —  receive at least one RFE during the review process.</p>
    <p>An RFE is not a denial. It is a request for additional documentation or clarification. The outcome depends entirely on the quality of the response. Unfavourable outcomes arise most often not from weak underlying records but from inadequate or misdirected RFE responses  —  responses that fail to address the specific concern raised by the adjudicator.</p>
    <h2>Why the national average is misleading</h2>
    <p>The 43 percent approval rate is a national average across all petitioners  —  including self-prepared filings, filings by general-practice attorneys with no EB-1A specialisation, and filings by dedicated immigration advisory firms. The quality variance across these categories is enormous.</p>
    <p>Self-prepared petitions  —  filed without professional case architecture  —  have significantly lower approval rates than professionally prepared petitions. The most common failure points are field of endeavour construction (for NIW), criterion mapping (for EB-1A), and evidence presentation. These are not evidence problems  —  they are framing problems. The petitioner may have a strong record but presents it in a way that does not satisfy the specific USCIS standard.</p>
    <h2>Processing times</h2>
    <p>Standard I-140 processing is currently running at 20 to 22 months from receipt to decision. This is the timeline without premium processing. During this period, the petition is substantively reviewed, and RFEs may be issued at any point.</p>
    <p>Premium processing via Form I-907 provides a decision within 15 business days on the I-140, at an additional government fee of $2,965 payable directly to USCIS. Burlington Consult advises on whether premium processing is appropriate in each case  —  it is not always the right choice, particularly when additional evidence development time would strengthen the petition.</p>
    <h2>The processing hold</h2>
    <p>USCIS Policy Memorandum PM-602-0194, effective January 1, 2026, placed a hold on final adjudication of certain benefit requests for nationals of travel restriction countries, including Nigeria. USCIS has confirmed that processing continues up to the point of final adjudication and that Requests for Evidence are being actively issued  —  confirming substantive case engagement.</p>
    <p>Legal challenges to the hold are proceeding in federal court. The priority date is established on the day USCIS receives the I-140, not on the date of final approval. Filing now establishes the queue position regardless of when the hold is resolved.</p>
    <h2>What the numbers mean for filing strategy</h2>
    <p>The data supports three conclusions. First, professional case architecture materially improves outcomes  —  the gap between the national average and well-prepared petitions is significant. Second, RFE preparation is not optional  —  with issuance rates near 50 percent, every petition should be filed with RFE response strategy already developed. Third, timing matters  —  every month of delay extends the processing timeline by the same period, and proposed regulatory changes would raise the bar for future filings.</p>
    <p>Burlington Consult includes a twelve-month RFE and NOID support retainer in every engagement at no additional charge. This retainer covers drafting response strategies, reviewing supplemental evidence, and advising on the most effective response position for any USCIS communication received during the review period.</p>`,
  },
  {
    slug: 'proclamation-10998-national-interest-exception',
    title: 'Proclamation 10998 and the National Interest Exception: A Practical Guide for Nigerian Nationals',
    description: 'Proclamation 10998 and the National Interest Exception: A Practical Guide for Nigerian Nationals',
    category: 'Regulatory Update',
    categorySlug: 'regulatory',
    date: 'January 2026',
    readTime: '12 min',
    author: 'Chris Ogbodo',
    pinned: false,
    body: `<p>Presidential Proclamation 10998, signed December 16, 2025, imposed a partial entry suspension on Nigerian nationals effective January 1, 2026. The reaction across the Nigerian professional community was immediate  —  and largely based on incomplete information.</p>
    <p>This article clarifies what the proclamation actually does, what it does not do, and how qualified Nigerian professionals should position themselves in response.</p>
    <h2>What Proclamation 10998 does</h2>
    <p>The proclamation imposes a partial entry suspension on nationals of several countries, including Nigeria. It restricts the issuance of certain immigrant and non-immigrant visas to Nigerian nationals at U.S. consular posts. This is an entry restriction  —  it affects your ability to enter the United States, not your ability to file immigration petitions.</p>
    <h2>What it does not do</h2>
    <p>The proclamation does not prevent Nigerian nationals from filing I-140 petitions with USCIS. It does not affect the receipt, docketing, or substantive processing of pending petitions. It does not invalidate approved petitions. And critically, it does not apply uniformly  —  Section 6 of the proclamation explicitly preserves case-by-case waivers for individuals whose entry serves U.S. national interests.</p>
    <p>This last point is the most important and the most misunderstood. The proclamation is not a blanket ban. It is a restriction with a built-in exception  —  and the I-140 approval is the most direct evidence available for qualifying for that exception.</p>
    <h2>The national interest exception</h2>
    <p>Section 6 of Proclamation 10998 allows case-by-case waivers where the entry of the individual would serve the U.S. national interest. For professionals with an approved EB-1A or NIW petition, the case for the national interest exception is straightforward: USCIS has already determined, through the I-140 adjudication process, that the petitioner's work serves a national interest or that the petitioner possesses extraordinary ability that benefits the United States.</p>
    <p>An approved I-140 is not a guarantee of a waiver. But it is the strongest single piece of evidence a Nigerian national can hold when applying for the exception at the consular interview stage. It is a finding by a U.S. government agency that the individual's presence in the United States serves the national interest  —  exactly the standard the proclamation requires for a waiver.</p>
    <h2>The USCIS processing hold</h2>
    <p>Separately from the proclamation, USCIS Policy Memorandum PM-602-0194 placed a hold on final adjudication of benefit requests for nationals of travel restriction countries. This means that while petitions continue to be processed  —  received, docketed, reviewed, and RFEs issued  —  final approval decisions are temporarily paused.</p>
    <p>This hold is subject to active legal challenge in federal court. Several lawsuits are proceeding, and the hold may be modified or lifted as litigation progresses. The priority date, however, is established on the day USCIS receives the I-140  —  not on the date of final approval. Filing now secures the queue position regardless of the hold's duration.</p>
    <h2>The strategic position for Nigerian professionals</h2>
    <p>The correct response to Proclamation 10998 is not to wait. It is to file now, secure the I-140 approval (or position the petition for approval when the hold lifts), establish the priority date, and hold a confirmed national interest finding for when the restriction is lifted or case-by-case waivers are formally applied.</p>
    <p>Every month of delay is a month added to the back of the queue. The priority date functions as a queue position  —  establishing it earlier means reaching the front earlier, regardless of subsequent regulatory or policy changes. Nigerian professionals who file now will be ahead of those who wait for clarity that may not come for months or years.</p>
    <h2>What Burlington Consult advises</h2>
    <p>Burlington Consult has worked extensively with Nigerian professionals navigating the intersection of Proclamation 10998 and the EB-1A/NIW filing process. The firm's lead adviser is himself a Nigerian national and self-petitioned EB-1A holder  —  with direct, personal understanding of the regulatory environment these professionals face.</p>
    <p>The firm advises all qualified Nigerian nationals to file now. The I-140 petition and the entry restriction are separate legal instruments. An approved petition is the strongest available evidence for the national interest exception. And the priority date  —  once established  —  does not expire.</p>`,
  },
  {
    slug: 'successful-rfe-response',
    title: 'Anatomy of a Successful RFE Response: Three Principles That Change the Outcome',
    description: 'Anatomy of a Successful RFE Response: Three Principles That Change the Outcome',
    category: 'RFE Response',
    categorySlug: 'rfe',
    date: 'January 2026',
    readTime: '9 min',
    author: 'Michael Aromolaran',
    pinned: false,
    body: `<p>Most unfavourable outcomes in EB-1A and NIW petitions arise not from weak underlying records but from inadequate or misdirected RFE responses. The petitioner has the evidence. The case has merit. But the response to the Request for Evidence fails to address the specific concern raised by the adjudicator  —  and the petition is denied.</p>
    <p>RFE issuance rates are running at 41 to 49 percent in early 2026. This means that roughly half of all petitions will receive at least one RFE. Preparation for this eventuality is not optional  —  it is a core component of case architecture.</p>
    <p>This article outlines the three principles Burlington Consult applies to every RFE response  —  the principles that consistently change outcomes from denial to approval.</p>
    <h2>Principle 1: Answer the question that was actually asked</h2>
    <p>This sounds obvious. It is not. USCIS adjudicators draft RFEs with specific language that targets specific weaknesses in the petition. The most common mistake in RFE responses is treating the RFE as a general invitation to submit more evidence  —  flooding the response with additional documentation that does not address the specific concern.</p>
    <p>An RFE that asks "how does the petitioner's proposed endeavour have national importance, as opposed to regional importance?" is not asking for more recommendation letters. It is asking for evidence that connects the proposed work to documented national-level priorities. An RFE that asks "what evidence demonstrates that the petitioner has received nationally or internationally recognised awards?" is not asking for a longer CV. It is asking for documentation of the awarding body's selectivity, standing, and recognition criteria.</p>
    <p>Burlington Consult reads every RFE as a diagnostic instrument. The adjudicator is telling you exactly what is missing. The response must address that specific gap  —  precisely, concisely, and with targeted evidence.</p>
    <h2>Principle 2: Frame the evidence, do not just submit it</h2>
    <p>Raw evidence without framing is the second most common failure mode. A petitioner receives an RFE requesting evidence of "original contributions of major significance" and responds by submitting a stack of publications, patents, and citation counts  —  without explaining why these contributions are significant, how they have been adopted or built upon by others, and what impact they have had on the field.</p>
    <p>USCIS adjudicators are not specialists in your field. They cannot independently assess whether a contribution is "of major significance" from the raw documentation alone. The RFE response must provide the interpretive framework: here is the contribution, here is the evidence of its significance, here is the connection to the specific USCIS criterion, and here is why this satisfies the standard.</p>
    <p>Every exhibit in a Burlington Consult RFE response is cross-referenced to the specific criterion at issue, accompanied by a narrative explanation of its significance, and supported by independent corroborating evidence where available. The adjudicator should never have to guess why a piece of evidence was included.</p>
    <h2>Principle 3: Treat the RFE as an opportunity, not a setback</h2>
    <p>An RFE is not a preliminary denial. It is a request for additional information  —  and it is an opportunity to strengthen the petition in exactly the area where the adjudicator has concerns. The tone and substance of the response matter.</p>
    <p>A defensive response  —  one that argues the original petition was sufficient and the RFE is unwarranted  —  rarely succeeds. The adjudicator has identified a gap. The response should acknowledge the gap (implicitly, not by conceding weakness) and fill it with specific, targeted evidence. The goal is to make the adjudicator's job easier: provide exactly what was asked for, framed clearly, with no extraneous material.</p>
    <p>Burlington Consult approaches every RFE response as a chance to resubmit a stronger version of the weakest section of the petition. The original filing identified the strongest available arguments. The RFE response addresses the one area where the argument was not strong enough  —  and closes the gap with evidence that was either unavailable at the time of filing or that the original petition failed to frame correctly.</p>
    <h2>The timeline</h2>
    <p>USCIS typically allows 87 days to respond to an RFE (84 days plus 3 days for mailing). Burlington Consult's twelve-month RFE retainer ensures that response preparation begins immediately upon receipt  —  not after weeks of scrambling to find an adviser who understands the case. The response strategy is developed within the first week, evidence gaps are identified and addressed in weeks two and three, and the final response is reviewed, refined, and submitted well within the deadline.</p>
    <p>The retainer covers all RFE and NOID responses for twelve months from the date of petition submission, at no additional charge beyond the original engagement fee.</p>
    <h2>The difference between approval and denial</h2>
    <p>In Burlington Consult's experience, the difference between a petition that is approved after an RFE and one that is denied is rarely about the strength of the underlying record. It is about the quality of the response. A well-framed, precisely targeted response to a specific RFE concern will convert a borderline case into an approval. A generic, unfocused response will convert a strong case into a denial.</p>
    <p>This is why Burlington Consult includes RFE preparation as a standard component of every engagement  —  not as an add-on, not as a separate fee, and not as an afterthought. It is built into the case architecture from day one.</p>`,
  },
  {
    slug: 'eb1a-for-creatives',
    title: 'EB-1A for Creatives: Building a Case Without Traditional Academic Evidence',
    description: 'EB-1A for Creatives: Building a Case Without Traditional Academic Evidence',
    category: 'Field of Endeavour',
    categorySlug: 'field',
    date: 'December 2025',
    readTime: '10 min',
    author: 'Paschal Ucheagwu',
    pinned: false,
    body: `<p>No publications. No citations. No h-index. No peer-reviewed journal articles. No institutional affiliation. If your career is built on music, film, visual art, writing, or design  —  the EB-1A might seem like it was not designed for you.</p>
    <p>It was. The Einstein Visa is explicitly available to individuals who have demonstrated extraordinary ability in the arts, and the regulatory criteria include provisions that map directly to creative careers. The challenge is not eligibility  —  it is knowing which criteria to use and how to document them in the format USCIS expects.</p>
    <h2>The criteria that matter for creatives</h2>
    <p>The EB-1A requires at least three of ten regulatory criteria. For creative professionals with a strong record, Burlington Consult typically identifies four that can be satisfied from the public record alone.</p>
    <h3>Awards and recognition</h3>
    <p>Grammy nominations, BET Awards, AFRIMA, Headies, MOBO Awards, AMVCA, or other nationally or internationally recognised awards in the performing or visual arts. The key is selectivity: USCIS evaluates the standing of the awarding body, the criteria for selection, and the number of recipients. A "Best New Artist" nomination at a major ceremony carries more weight than a dozen local industry acknowledgements.</p>
    <h3>Published material about the artist</h3>
    <p>Features in Rolling Stone, Billboard, Variety, The Guardian, Pitchfork, Pulse Nigeria, The Native, or equivalent major media  —  relating to the petitioner's work in the field. One substantive feature article in a recognised publication can satisfy this criterion. The article must be about the petitioner specifically, not merely a passing mention in a broader piece.</p>
    <h3>Commercial success in the performing arts</h3>
    <p>This is the criterion most directly built for creative professionals. Streaming numbers, concert revenue, album sales, international distribution deals, box office receipts, and licensing agreements all count. Burlington benchmarks these figures against the relevant peer group  —  not against the top 0.1% globally, but against the professional community in the relevant genre and market.</p>
    <h3>Critical role at a distinguished organisation</h3>
    <p>Headlining a major festival (Coachella, Afro Nation, Essence Fest, Lagos Jazz Series). Leading a record label. Holding a creative director role at a recognised institution. Serving as the principal artist on a nationally distributed film or television project. The role must be "leading or critical" and the organisation must have a "distinguished reputation."</p>
    <h2>What about the evidence you do not have?</h2>
    <p>The EB-1A requires three of ten criteria  —  not all ten. Creative professionals typically do not satisfy the scholarly articles, judging, or membership criteria. That is expected. The petition is built around the criteria that fit your record, and the final merits determination evaluates the totality of your evidence in context.</p>
    <p>Burlington Consult does not try to force-fit criteria that do not apply. If you have three or four strong criteria with robust documentation, that is a viable petition. If you have two, the firm advises on what additional evidence would need to be developed  —  and whether the case is worth filing at this stage.</p>
    <h2>The proposed endeavour for creative professionals</h2>
    <p>When filing the EB-2 NIW alongside the EB-1A (as Burlington Consult does as standard practice), the proposed endeavour must articulate what the creative professional proposes to do in the United States and why it serves the national interest. For artists, this typically connects to cultural diplomacy, creative industry economic contribution, or cross-cultural exchange.</p>
    <p>The proposed endeavour is not a generic statement about "promoting art." It is a specific, documented argument connecting the petitioner's track record to a defined area of U.S. interest  —  supported by evidence of prior impact and a credible plan for future work.</p>
    <h2>What a green card means for your creative career</h2>
    <p>U.S. touring without visa anxiety  —  no more B-1/B-2 applications, no tour dates at risk because of processing backlogs. Direct label and management deals without employer sponsorship. U.S. business formation  —  open a U.S. entity, receive payments directly, structure international revenue through a U.S. vehicle. Family sponsorship for your spouse and children as permanent residents.</p>
    <p>The green card is permanent. It does not expire. It is not tied to any employer, label, or institution. Full portability from the moment of approval.</p>
    <h2>The window is now</h2>
    <p>Proposed regulatory changes (RIN 1615-AC85) would raise evidentiary thresholds for the EB-1A. Petitions filed now are assessed against current standards  —  the most favourable framework available. Creative professionals who qualify today should not assume they will qualify under the stricter standards the proposed rule contemplates.</p>`,
  },
  {
    slug: 'dual-petition-strategy',
    title: 'Dual Petition Strategy: Why Filing EB-1A and NIW Simultaneously Is Standard Practice',
    description: 'Dual Petition Strategy: Why Filing EB-1A and NIW Simultaneously Is Standard Practice',
    category: 'Case Strategy',
    categorySlug: 'strategy',
    date: 'November 2025',
    readTime: '7 min',
    author: 'Chris Ogbodo',
    pinned: false,
    body: `<p>Burlington Consult files both EB-1A (Einstein Visa) and EB-2 NIW petitions simultaneously as standard practice. This is not a hedge. It is not redundancy for its own sake. It is a strategic decision that materially improves outcomes for every client.</p>
    <p>This article explains the mechanics, the advantages, and why the dual filing strategy has become the industry standard for serious immigration advisory firms.</p>
    <h2>One record. Two arguments.</h2>
    <p>The EB-1A and the EB-2 NIW are complementary pathways that draw from the same professional record but are assessed under fundamentally different legal frameworks. The EB-1A is evaluated under the Kazarian two-step framework: satisfy at least three of ten regulatory criteria, then pass a final merits determination. The EB-2 NIW is evaluated under the Dhanasar three-prong test: substantial merit, strong positioning, and net national benefit.</p>
    <p>Burlington Consult builds a single unified evidence record  —  your CV, documentation, recommendation letters, salary analysis, published coverage  —  and deploys it across both petitions with distinct legal arguments tailored to each framework. The evidence is gathered once. The arguments are constructed twice.</p>
    <h2>One priority date</h2>
    <p>Both petitions are receipted on the same day, establishing a single priority date that applies to whichever pathway is approved first. The priority date governs your queue position for the green card. Every month of delay in filing extends the timeline by the same period.</p>
    <p>This is one of the most underappreciated advantages of dual filing: you are not choosing between two pathways. You are filing both and letting the adjudication process determine which resolves first. Your queue position is identical regardless of which petition is approved.</p>
    <h2>Strategic redundancy</h2>
    <p>RFE issuance rates for EB-1A and NIW petitions are running at 41 to 49 percent in early 2026. This means that roughly half of all petitions receive a Request for Evidence  —  not because the petitioner is unqualified, but because the adjudicator wants additional documentation or clarification.</p>
    <p>If you file a single petition and receive an RFE, your entire case stalls while the response is prepared and reviewed. If you file both petitions, an RFE on your EB-1A does not affect your NIW, and vice versa. The other petition continues processing independently. This redundancy is not theoretical  —  it is a material advantage that has changed outcomes for Burlington Consult clients.</p>
    <h2>Different frameworks, different strengths</h2>
    <p>Some professional records are stronger under the Kazarian framework. Others are stronger under Dhanasar. Many are strong under both but for different reasons. A senior technology executive might satisfy EB-1A criteria through original contributions, critical role, and high salary  —  while the same record supports an NIW through a proposed endeavour in U.S. technology competitiveness.</p>
    <p>Filing both petitions allows Burlington Consult to exploit every strength in the record. The EB-1A argument focuses on what you have already achieved. The NIW argument focuses on what you propose to do. Together, they present the most complete picture of why the United States benefits from your permanent residency.</p>
    <h2>The economics</h2>
    <p>Burlington Consult's engagement fee of approximately $20,000 covers both petitions. This is not double the work  —  the evidence record is built once, and the advisory team constructs two distinct legal arguments from the same foundation. Comparable dual-petition advisory at leading U.S. immigration law practices ranges from $35,000 to $55,000.</p>
    <p>A twelve-month RFE and NOID support retainer is included at no additional charge, covering any Request for Evidence or Notice of Intent to Deny issued by USCIS during the review period. This retainer applies to both petitions.</p>
    <h2>When not to file both</h2>
    <p>There are cases where a single petition is more appropriate  —  typically when the petitioner's record is overwhelmingly strong under one framework and the second would add complexity without meaningful benefit. Burlington Consult assesses this during the initial consultation and advises accordingly. The recommendation is always based on the specific record, not a default template.</p>`,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  if (categorySlug === 'all') return ARTICLES
  return ARTICLES.filter(a => a.categorySlug === categorySlug)
}
