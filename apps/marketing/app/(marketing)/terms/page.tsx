import type { Metadata } from 'next'
import { LegalPage } from '../../../components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms and conditions governing the use of Burlington Consult services and platform.',
}

export default function TermsPage() {
  return (
    <LegalPage
      tag="Legal"
      title="Terms of Service"
      effectiveDate="28 April 2026"
    >
      <h2>Agreement to Terms</h2>
      <p>
        By accessing or using the website at burlingtonconsult.com, the client portal at
        app.burlingtonconsult.com, or any related services (together, the &ldquo;Platform&rdquo;),
        you agree to be bound by these Terms of Service. If you do not agree to these terms, do not
        use the Platform.
      </p>
      <p>
        &ldquo;Burlington,&rdquo; &ldquo;we,&rdquo; and &ldquo;our&rdquo; refer to Burlington
        Consult, LLC, a Delaware limited liability company. &ldquo;You&rdquo; and &ldquo;your&rdquo;
        refer to the individual or entity using the Platform.
      </p>

      <h2>Nature of Services</h2>
      <p>
        Burlington Consult provides immigration strategy and advisory services. We assist clients in
        evaluating eligibility, developing petition strategy, preparing evidentiary documentation, and
        constructing petition narratives for U.S. immigration applications including EB-1A and EB-2
        NIW petitions.
      </p>
      <p>
        <strong>Burlington Consult does not practise law.</strong> We are not a law firm and do not
        provide legal advice, legal representation, or attorney-client privilege. Our services are
        strategic advisory in nature. We strongly recommend that every client retain a qualified
        immigration attorney for legal review of their petition. Burlington facilitates attorney access
        through the Platform but does not act as counsel.
      </p>

      <h2>Eligibility</h2>
      <p>
        To use the Platform, you must be at least 18 years of age and capable of forming a binding
        contract. By creating an account, you represent that this is the case.
      </p>

      <h2>Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for
        all activity that occurs under your account. You agree to notify us immediately of any
        unauthorised use.
      </p>
      <p>
        We reserve the right to suspend or terminate accounts that violate these terms, provide
        fraudulent information, or engage in conduct detrimental to Burlington or other users.
      </p>

      <h2>Application and Acceptance</h2>
      <p>
        Submitting an application through the Platform does not guarantee acceptance as a client.
        Burlington evaluates all applications and reserves the right to decline any engagement at its
        sole discretion. We will not accept cases where we do not believe we can deliver meaningful
        value.
      </p>

      <h2>Fees and Payment</h2>
      <p>
        Service fees are displayed on the Platform and confirmed in your engagement letter prior to
        the start of any paid work. All fees are denominated in U.S. dollars. Local currency
        equivalents displayed at checkout are for reference and converted at the prevailing exchange
        rate at the time of payment.
      </p>
      <p>
        Payments are processed through third-party providers (Stripe, Paystack, Flutterwave,
        NOWPayments). Burlington does not store card numbers or banking credentials.
      </p>
      <p>
        For engagements using the Safelock savings programme, the terms of deposit, withdrawal, and
        forfeiture are governed by the Safelock Agreement provided during onboarding.
      </p>

      <h2>Refund Policy</h2>
      <p>
        Consultation fees are refundable if cancelled at least 24 hours before the scheduled session.
        Cancellations within 24 hours are non-refundable.
      </p>
      <p>
        Engagement fees are subject to the refund terms in your individual engagement letter. Where a
        Money-Back Guarantee product is purchased, the guarantee terms specified in the engagement
        letter apply.
      </p>
      <p>
        Assessment fees are non-refundable once the assessment has been delivered.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on the Platform, including text, design, code, graphics, logos, and documentation,
        is owned by Burlington Consult or its licensors and is protected by copyright and intellectual
        property laws.
      </p>
      <p>
        You retain ownership of all materials you provide to Burlington (documents, evidence,
        professional records). You grant Burlington a limited licence to use these materials solely
        for the purpose of delivering your engagement.
      </p>
      <p>
        Petition narratives, recommendation letter drafts, and other work product created by
        Burlington during your engagement are jointly owned and may be used by you for your
        immigration filing.
      </p>

      <h2>Confidentiality</h2>
      <p>
        Burlington treats all client information as confidential. We will not share your personal
        information, case details, or professional records with third parties except as described in
        our <a href="/privacy">Privacy Policy</a>, as required by law, or with your explicit written
        consent.
      </p>
      <p>
        Clients who sign a non-disclosure agreement through the Platform are bound by its additional
        terms.
      </p>

      <h2>No Guarantee of Outcome</h2>
      <p>
        Immigration petition outcomes are determined by the United States Citizenship and Immigration
        Services (USCIS). Burlington provides strategy and advisory services to maximise the strength
        of your petition, but <strong>we do not and cannot guarantee approval</strong>. Past approval
        rates are not indicative of future outcomes. Each case is evaluated by USCIS on its individual
        merits.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Burlington Consult, its officers, directors,
        employees, and affiliates shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages arising from or related to your use of the Platform or our
        services, regardless of the theory of liability.
      </p>
      <p>
        Our total liability for any claim arising under these terms shall not exceed the total fees
        you have paid to Burlington in the twelve months preceding the claim.
      </p>

      <h2>Dispute Resolution</h2>
      <p>
        Any dispute arising from these terms or your use of the Platform shall be resolved through
        binding arbitration administered under the rules of the American Arbitration Association. The
        arbitration shall take place in Cambridge, Massachusetts, United States. The language of the
        arbitration shall be English.
      </p>
      <p>
        You agree to waive any right to participate in a class action or class-wide arbitration.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the State of Delaware, United States, without regard
        to conflict of law principles.
      </p>

      <h2>Modifications</h2>
      <p>
        We may update these terms from time to time. Material changes will be communicated through a
        notice on the Platform. Continued use of the Platform after a change constitutes acceptance of
        the revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, contact us
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
