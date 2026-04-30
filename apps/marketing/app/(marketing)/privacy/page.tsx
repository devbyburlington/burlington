import type { Metadata } from 'next'
import { LegalPage } from '../../../components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Burlington Consult collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      tag="Legal"
      title="Privacy Policy"
      effectiveDate="28 April 2026"
    >
      <h2>Introduction</h2>
      <p>
        Burlington Consult, LLC (&ldquo;Burlington,&rdquo; &ldquo;we,&rdquo; &ldquo;our&rdquo;) is
        an immigration strategy and advisory firm incorporated in Delaware, United States. This
        Privacy Policy explains how we collect, use, store, and protect personal information when you
        use our website at burlingtonconsult.com and our client portal at app.burlingtonconsult.com
        (together, the &ldquo;Platform&rdquo;).
      </p>
      <p>
        We are committed to protecting your privacy in compliance with the General Data Protection
        Regulation (GDPR), the UK GDPR, the California Consumer Privacy Act (CCPA/CPRA), the Nigeria
        Data Protection Regulation (NDPR), the Brazilian General Data Protection Law (LGPD), and
        Canada&rsquo;s Personal Information Protection and Electronic Documents Act (PIPEDA). Where
        regulations differ, we apply the strictest standard to all users.
      </p>

      <h2>Information We Collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li><strong>Account information:</strong> full name, email address, phone number, country of residence, and country of citizenship when you create an account or submit an application.</li>
        <li><strong>Professional information:</strong> career history, qualifications, publications, awards, and other details relevant to your immigration petition.</li>
        <li><strong>Payment information:</strong> billing address and payment method details. Card numbers are processed directly by our payment providers (Stripe, Paystack, Flutterwave) and are never stored on our servers.</li>
        <li><strong>Documents:</strong> CVs, certificates, evidence packages, and other files you upload through the Platform.</li>
        <li><strong>Communications:</strong> messages sent through our portal, emails, and chatbot interactions.</li>
        <li><strong>Assessment responses:</strong> answers provided through our free profile assessment tool.</li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li><strong>Device and browser information:</strong> IP address, browser type, operating system, and device identifiers.</li>
        <li><strong>Usage data:</strong> pages visited, time spent, referral source, and interactions with the Platform.</li>
        <li><strong>Cookies and similar technologies:</strong> see the Cookies section below.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We process personal information for the following purposes:</p>
      <ul>
        <li><strong>Service delivery:</strong> to evaluate your eligibility, prepare your petition strategy, manage your engagement, and communicate with you about your case.</li>
        <li><strong>Account management:</strong> to create and maintain your account, process payments, and provide customer support.</li>
        <li><strong>Platform improvement:</strong> to analyse usage patterns, diagnose technical issues, and improve the Platform experience.</li>
        <li><strong>Legal compliance:</strong> to comply with applicable laws, respond to legal process, and enforce our terms of service.</li>
        <li><strong>Communications:</strong> to send transactional notifications (confirmations, receipts, status updates) and, with your consent, marketing communications.</li>
      </ul>

      <h2>Legal Basis for Processing</h2>
      <p>We rely on the following legal bases under GDPR and equivalent regulations:</p>
      <ul>
        <li><strong>Contract performance:</strong> processing necessary to deliver the services you have engaged us for.</li>
        <li><strong>Consent:</strong> for marketing communications, non-essential cookies, and analytics tracking. You may withdraw consent at any time.</li>
        <li><strong>Legitimate interest:</strong> for fraud prevention, security monitoring, and internal analytics where your rights do not override our interests.</li>
        <li><strong>Legal obligation:</strong> where processing is required by law.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use strictly necessary cookies to operate the Platform (authentication, session management).
        Non-essential cookies, including analytics (Google Analytics) and marketing pixels, are loaded
        only after you provide consent through our cookie banner. You may update your cookie
        preferences at any time.
      </p>

      <h2>How We Share Information</h2>
      <p>We do not sell your personal information. We share information only in the following circumstances:</p>
      <ul>
        <li><strong>Service providers:</strong> payment processors (Stripe, Paystack, Flutterwave, NOWPayments), email delivery (Resend), error monitoring (Sentry), and cloud infrastructure (Vercel, Supabase) that process data on our behalf under data processing agreements.</li>
        <li><strong>Legal counsel:</strong> when you grant access to your immigration attorney through the Platform&rsquo;s lawyer access feature.</li>
        <li><strong>Legal requirements:</strong> when required by law, court order, or governmental authority.</li>
        <li><strong>Business transfers:</strong> in connection with a merger, acquisition, or sale of assets, with prior notice to affected users.</li>
      </ul>

      <h2>Data Retention</h2>
      <ul>
        <li><strong>Client accounts and case files:</strong> 7 years after engagement ends.</li>
        <li><strong>Unapproved applications:</strong> 12 months, then automatically deleted.</li>
        <li><strong>Marketing contacts (unsubscribed):</strong> 30 days after unsubscription.</li>
        <li><strong>Chat and message logs:</strong> 2 years, then anonymised.</li>
        <li><strong>Payment records:</strong> retained as required by applicable financial regulations.</li>
      </ul>

      <h2>Your Rights</h2>
      <p>Depending on your jurisdiction, you have the right to:</p>
      <ul>
        <li><strong>Access:</strong> request a copy of the personal data we hold about you.</li>
        <li><strong>Rectification:</strong> correct inaccurate or incomplete data.</li>
        <li><strong>Erasure:</strong> request deletion of your personal data, subject to legal retention requirements.</li>
        <li><strong>Portability:</strong> receive your data in a machine-readable format.</li>
        <li><strong>Objection:</strong> object to processing based on legitimate interest.</li>
        <li><strong>Restriction:</strong> request that we limit how we process your data.</li>
        <li><strong>Withdraw consent:</strong> for processing based on consent, at any time without affecting prior processing.</li>
      </ul>
      <p>
        To exercise any of these rights, contact us
        at <a href="mailto:hello@burlingtonconsult.com">hello@burlingtonconsult.com</a>. We will
        respond within 30 days.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement industry-standard security measures including encryption in transit (TLS 1.3),
        encryption at rest, row-level database security, and regular security audits. Access to
        personal data is restricted to authorised personnel on a need-to-know basis.
      </p>

      <h2>International Transfers</h2>
      <p>
        Your data may be processed in the United States, where our infrastructure is hosted. We rely
        on standard contractual clauses and data processing agreements with all subprocessors to ensure
        adequate protection for international transfers.
      </p>

      <h2>Children</h2>
      <p>
        The Platform is not directed at individuals under 18. We do not knowingly collect personal
        information from children. If you believe a child has provided us with personal information,
        please contact us and we will delete it promptly.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be communicated
        through a notice on the Platform and, where required, by email. Continued use of the Platform
        after a change constitutes acceptance.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy-related questions or requests, contact us
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
