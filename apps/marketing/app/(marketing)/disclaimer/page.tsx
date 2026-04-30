import type { Metadata } from 'next'
import { LegalPage } from '../../../components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'Important disclaimers regarding Burlington Consult services, including the nature of advisory services and immigration outcomes.',
}

export default function DisclaimerPage() {
  return (
    <LegalPage
      tag="Legal"
      title="Disclaimer"
      effectiveDate="28 April 2026"
    >
      <h2>Not a Law Firm</h2>
      <p>
        Burlington Consult, LLC (&ldquo;Burlington&rdquo;) is an immigration strategy and advisory
        firm. <strong>We are not a law firm, and we do not provide legal advice or legal
        representation.</strong> No attorney-client relationship is formed by your use of the Platform,
        by your submission of an application, by your participation in a consultation, or by your
        engagement with Burlington in any capacity.
      </p>
      <p>
        Burlington provides strategic advisory services: eligibility evaluation, petition strategy
        development, evidentiary documentation preparation, and narrative construction. These services
        are designed to complement, not replace, the work of a qualified immigration attorney.
      </p>
      <p>
        We strongly recommend that every client retain a licensed immigration attorney for legal review
        and filing of their petition. Burlington facilitates access to independent legal counsel
        through the Platform but does not select, recommend, or guarantee the performance of any
        attorney.
      </p>

      <h2>No Guarantee of Outcome</h2>
      <p>
        All immigration petitions are adjudicated by the United States Citizenship and Immigration
        Services (USCIS) under applicable federal regulations. Burlington has no influence over, and
        accepts no responsibility for, USCIS adjudication decisions.
      </p>
      <p>
        <strong>We do not guarantee approval of any petition.</strong> Approval rates, statistics, and
        case profiles presented on the Platform reflect historical outcomes and are not predictive of
        future results. Each case is evaluated by USCIS on its individual merits.
      </p>
      <p>
        Where Burlington offers a Money-Back Guarantee product, the specific terms, conditions, and
        limitations of that guarantee are defined in the engagement letter signed by both parties. The
        guarantee does not extend beyond the terms stated in that document.
      </p>

      <h2>Assessment Tool</h2>
      <p>
        The free profile assessment available on the Platform is an informational self-evaluation tool.
        It is not a legal opinion, not a determination of eligibility, and not a substitute for
        professional evaluation. Assessment results are indicative only and reflect self-reported
        information that has not been independently verified.
      </p>
      <p>
        Many professionals understate their qualifications in self-assessment. Others overstate them.
        The tool provides directional guidance, not definitive evaluation. For an accurate evaluation
        of your eligibility, engage Burlington for a Full Strategic Assessment or retain qualified
        legal counsel.
      </p>

      <h2>Informational Content</h2>
      <p>
        All content published on the Platform, including articles in the Knowledge Centre, blog posts,
        case profiles, and educational materials, is provided for general informational purposes only.
        This content does not constitute legal advice and should not be relied upon as such.
      </p>
      <p>
        Immigration law and USCIS policy change frequently. While we make reasonable efforts to keep
        published content current, Burlington does not warrant that any specific piece of content
        reflects the most recent legal developments. Always verify current regulations with a licensed
        attorney or directly with USCIS.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        The Platform integrates with third-party services including payment processors (Stripe,
        Paystack, Flutterwave, NOWPayments), analytics providers, and communication tools. Burlington
        is not responsible for the privacy practices, terms of service, or performance of these
        third-party services. Your use of these services is governed by their respective terms.
      </p>

      <h2>External Links</h2>
      <p>
        The Platform may contain links to external websites, including government resources, legal
        databases, and news publications. Burlington does not control, endorse, or accept
        responsibility for the content, accuracy, or availability of external websites.
      </p>

      <h2>Professional Qualifications</h2>
      <p>
        Credentials and qualifications attributed to Burlington team members on the Platform reflect
        information verified at the time of publication. Professional designations, institutional
        affiliations, and bar admissions are the responsibility of the individual team members and are
        subject to change.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, Burlington Consult, its officers,
        directors, employees, and affiliates shall not be liable for any loss, damage, or expense
        arising from reliance on information provided through the Platform, including but not limited
        to assessment results, published content, or general guidance provided prior to a formal
        engagement.
      </p>

      <h2>Regulatory Compliance</h2>
      <p>
        Burlington Consult is a U.S. entity subject to federal and state regulations, including
        sanctions administered by the Office of Foreign Assets Control (OFAC). We are unable to
        provide services to individuals or entities in jurisdictions subject to comprehensive U.S.
        sanctions. For details, see our <a href="/terms">Terms of Service</a>.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about this disclaimer, contact us
        at <a href="mailto:hello@burlingtonconsult.com">hello@burlingtonconsult.com</a>.
      </p>
      <p>
        Burlington Consult, LLC<br />
        1585 Massachusetts Avenue, Suite 78<br />
        Cambridge, MA 02138<br />
        United States
      </p>
    </LegalPage>
  )
}
