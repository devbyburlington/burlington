'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@burlington/shared/src/supabase/client'
import { ndaSignatureSchema } from '../../lib/schemas/auth'
import { getMarketingUrl, MARKETING_URL_FALLBACK } from '../../lib/utils/marketing-url'
import { AuthBackLink } from './AuthBackLink'
import { AuthWordmark } from './AuthWordmark'
import { AuthFooter } from './AuthFooter'

export function NdaForm() {
  const router = useRouter()
  const [signature, setSignature] = useState('')
  const [hasScrolled, setHasScrolled] = useState(false)
  const [signed, setSigned] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [backUrl, setBackUrl] = useState(MARKETING_URL_FALLBACK)
  const [isLoading, setIsLoading] = useState(true)
  const [applicantName, setApplicantName] = useState('Applicant')
  const [givenName, setGivenName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setBackUrl(getMarketingUrl())
  }, [])

  useEffect(() => {
    async function fetchName() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/apply')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, given_name, family_name, field_industry, nda_signed_at')
        .eq('id', user.id)
        .single()

      if (!profile?.field_industry) {
        router.replace('/apply')
        return
      }

      if (profile.nda_signed_at) {
        router.replace('/status')
        return
      }

      if (profile.full_name) {
        setApplicantName(profile.full_name)
      }
      if (profile.given_name) setGivenName(profile.given_name)
      if (profile.family_name) setFamilyName(profile.family_name)
      setIsLoading(false)
    }
    fetchName()
  }, [])

  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const checkScroll = () => {
      if (el.scrollHeight <= el.clientHeight) {
        setHasScrolled(true)
        return
      }
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40
      if (nearBottom) setHasScrolled(true)
    }

    checkScroll()
    el.addEventListener('scroll', checkScroll)
    return () => el.removeEventListener('scroll', checkScroll)
  }, [isLoading])

  const handleSign = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!hasScrolled) {
      setError('Please read the full agreement before signing.')
      return
    }

    const parsed = ndaSignatureSchema.safeParse({ signature })
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Invalid signature')
      return
    }

    const signedName = parsed.data.signature
    const expectedName = givenName && familyName
      ? `${givenName} ${familyName}`
      : applicantName

    if (expectedName && expectedName !== 'Applicant') {
      if (signedName.toLowerCase() !== expectedName.toLowerCase()) {
        setError(`Your signature must match your name on file: ${expectedName}`)
        return
      }
    }

    setIsSubmitting(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setError('You must be signed in to sign the agreement.')
        setIsSubmitting(false)
        return
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          nda_signed_at: new Date().toISOString(),
          nda_signature_name: signedName,
          nda_signature_ip: null,
          nda_signature_ua: navigator.userAgent,
        })
        .eq('id', user.id)

      if (updateError) {
        console.error('[NdaForm] Failed to record signature — code:', updateError.code, 'message:', updateError.message, 'hint:', updateError.hint, 'details:', updateError.details)
        setError('Something went wrong. Please try again.')
        setIsSubmitting(false)
        return
      }

      setSigned(true)
    } catch {
      setError('Connection lost. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className="auth-form-panel">
        <div className="auth-form-top">
          <AuthBackLink href="/apply" label="Back to application" />
          <AuthWordmark />
        </div>
        <div className="auth-form-wrap">
          <NdaSkeleton />
        </div>
        <AuthFooter />
      </main>
    )
  }

  if (signed) {
    return (
      <main className="auth-form-panel">
        <div className="auth-form-top">
          <AuthBackLink href={backUrl} external label="Back to site" />
          <AuthWordmark />
        </div>

        <div className="auth-form-wrap">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/15 bg-teal/[.06]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-teal">
              <path d="M9 12l2 2 4-4" />
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9z" />
            </svg>
          </div>

          <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
            Agreement signed.
          </h1>
          <p className="mb-3 text-[0.84rem] leading-[1.6] text-burl-gray-400">
            Your non-disclosure agreement has been recorded. A countersigned copy will be sent to your email within 24 hours.
          </p>

          <div className="mb-8 rounded-lg border border-burl-gray-200 bg-warm-gray/60 px-4 py-3">
            <div className="flex items-center justify-between text-[0.75rem] text-burl-gray-400">
              <span>Signed by</span>
              <span className="font-medium text-burl-gray-700">{signature}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-[0.75rem] text-burl-gray-400">
              <span>Date</span>
              <span className="font-medium text-burl-gray-700">{today}</span>
            </div>
          </div>

          <div className="auth-otp-help">
            <b>What happens next</b> &middot; Our team will review your application within 48 hours. You can check your application status at any time.
          </div>

          <div className="mt-8">
            <button
              type="button"
              className="auth-btn-primary justify-center"
              onClick={() => router.push('/status')}
            >
              View application status
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        <AuthFooter />
      </main>
    )
  }

  return (
    <main className="auth-form-panel">
      <div className="auth-form-top">
        <AuthBackLink href="/apply" label="Back to application" />
        <AuthWordmark />
      </div>

      <div className="auth-form-wrap">
        <div className="auth-eyebrow">Mutual Non-Disclosure Agreement</div>

        <h1 className="mb-2 font-serif text-[1.4375rem] font-medium leading-[1.2] tracking-tight text-burl-gray-700">
          Review and sign.
        </h1>
        <p className="mb-6 text-[0.84rem] leading-[1.6] text-burl-gray-400">
          Please read the agreement below in full, then type your legal name to sign electronically.
        </p>

        <div
          ref={scrollRef}
          className="nda-scroll mb-6 max-h-[360px] overflow-y-auto rounded-lg border border-burl-gray-200 bg-white px-5 py-5 text-[0.8rem] leading-[1.75] text-burl-gray-500 sm:px-6"
        >
          <NdaContent applicantName={applicantName} date={today} />
        </div>

        {!hasScrolled && (
          <p className="mb-5 flex items-center gap-2 text-[0.72rem] font-medium text-burl-gray-300">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Scroll to the bottom to continue
          </p>
        )}

        <form onSubmit={handleSign}>
          <div className="auth-field">
            <label htmlFor="nda-signature" className="auth-field-label">
              Electronic signature *
            </label>
            <input
              id="nda-signature"
              className="auth-field-input font-serif italic"
              type="text"
              placeholder="Type your full legal name"
              autoComplete="name"
              value={signature}
              onChange={e => { setSignature(e.target.value); setError('') }}
            />
            {error && (
              <p className="mt-1.5 text-[0.72rem] font-medium text-red-500">{error}</p>
            )}
          </div>

          <div className="mb-6 flex items-center justify-between rounded-lg border border-burl-gray-200 bg-warm-gray/60 px-4 py-3 text-[0.75rem] text-burl-gray-400">
            <span>Date of signing</span>
            <span className="font-medium text-burl-gray-700">{today}</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !hasScrolled}
            className={`auth-btn-primary ${!hasScrolled || isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {isSubmitting ? 'Signing...' : 'Sign agreement'}
            {!isSubmitting && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        </form>
      </div>

      <AuthFooter />
    </main>
  )
}

function NdaContent({ applicantName, date }: { applicantName: string; date: string }) {
  return (
    <>
      <p className="mb-4 text-center font-medium uppercase tracking-wide text-burl-gray-700">
        Mutual Non-Disclosure Agreement
      </p>

      <p className="mb-4">
        <strong className="text-burl-gray-700">Effective Date:</strong> {date}
      </p>

      <p className="mb-4">
        This Mutual Non-Disclosure Agreement (&ldquo;Agreement&rdquo;) is entered into by and between:
      </p>

      <p className="mb-2">
        <strong className="text-burl-gray-700">Party A:</strong> Burlington Consult, LLC, a Delaware limited liability company with offices at The Octagon, Victoria Island, Lagos, Nigeria (&ldquo;Burlington&rdquo;)
      </p>
      <p className="mb-4">
        <strong className="text-burl-gray-700">Party B:</strong> {applicantName} (&ldquo;Applicant&rdquo;)
      </p>

      <p className="mb-4">
        Burlington and the Applicant are collectively referred to as the &ldquo;Parties&rdquo; and individually as a &ldquo;Party.&rdquo;
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">1. Purpose</p>
      <p className="mb-4">
        The Parties wish to explore a potential advisory engagement regarding U.S. immigration strategy (the &ldquo;Purpose&rdquo;). In connection with this Purpose, each Party may disclose to the other certain confidential and proprietary information. This Agreement sets forth the terms under which such information will be protected.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">2. Definition of Confidential Information</p>
      <p className="mb-4">
        &ldquo;Confidential Information&rdquo; means any and all non-public information disclosed by either Party to the other, whether orally, in writing, electronically, or by any other means, including but not limited to: personal and professional details, immigration case details, financial information, business strategies, proprietary methodologies, research, evidence portfolios, legal strategies, pricing structures, client lists, and any analyses, compilations, or materials prepared by the receiving Party that contain or reflect such information.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">3. Obligations of the Receiving Party</p>
      <p className="mb-4">
        Each Party agrees to: (a) hold the other Party&rsquo;s Confidential Information in strict confidence; (b) not disclose such information to any third party without the prior written consent of the disclosing Party; (c) use such information solely for the Purpose described herein; (d) protect such information using the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care; and (e) limit access to such information to those of its employees, advisers, and contractors who need to know such information for the Purpose and who are bound by confidentiality obligations no less restrictive than those contained herein.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">4. Exclusions</p>
      <p className="mb-4">
        Confidential Information does not include information that: (a) is or becomes publicly available through no fault of the receiving Party; (b) was known to the receiving Party prior to disclosure, as demonstrated by written records; (c) is independently developed by the receiving Party without use of or reference to the disclosing Party&rsquo;s Confidential Information; or (d) is rightfully obtained from a third party without restriction on disclosure.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">5. Compelled Disclosure</p>
      <p className="mb-4">
        If the receiving Party is compelled by law, regulation, or court order to disclose Confidential Information, it shall promptly notify the disclosing Party (to the extent permitted by law) and cooperate with the disclosing Party&rsquo;s efforts to obtain a protective order or other appropriate remedy.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">6. Return or Destruction of Information</p>
      <p className="mb-4">
        Upon written request by the disclosing Party, or upon termination of discussions regarding the Purpose, the receiving Party shall promptly return or destroy all Confidential Information and any copies thereof, and shall certify in writing that it has done so. Notwithstanding the foregoing, the receiving Party may retain copies of Confidential Information to the extent required by applicable law or regulation, provided that such retained copies remain subject to the confidentiality obligations of this Agreement.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">7. No Licence or Obligation</p>
      <p className="mb-4">
        Nothing in this Agreement grants any licence, intellectual property right, or other right to either Party beyond the limited right to use Confidential Information for the Purpose. Neither Party is obligated to proceed with any advisory engagement, transaction, or relationship as a result of this Agreement.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">8. Term and Survival</p>
      <p className="mb-4">
        This Agreement shall remain in effect for a period of three (3) years from the Effective Date. The obligations of confidentiality shall survive the expiration or termination of this Agreement for an additional period of two (2) years.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">9. Remedies</p>
      <p className="mb-4">
        Each Party acknowledges that a breach of this Agreement may cause irreparable harm for which monetary damages would be an inadequate remedy. Accordingly, either Party may seek injunctive or other equitable relief in addition to any other remedies available at law or in equity.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">10. Governing Law</p>
      <p className="mb-4">
        This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, United States of America, without regard to its conflict of laws principles.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">11. Entire Agreement</p>
      <p className="mb-4">
        This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, or agreements relating thereto. This Agreement may not be amended except by a written instrument signed by both Parties.
      </p>

      <p className="mb-2 font-medium text-burl-gray-700">12. Electronic Execution</p>
      <p className="mb-0">
        The Parties agree that this Agreement may be executed electronically. Each Party acknowledges that their electronic signature shall have the same legal effect as a handwritten signature. The electronic execution record, including the signatory&rsquo;s name, IP address, user agent, timestamp, and timezone, shall constitute sufficient evidence of signing.
      </p>
    </>
  )
}

function NdaSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-2 h-3 w-40 rounded bg-burl-gray-100" />
      <div className="mb-3 h-7 w-48 rounded bg-burl-gray-100" />
      <div className="mb-2 h-4 w-full rounded bg-burl-gray-100" />
      <div className="mb-6 h-4 w-4/5 rounded bg-burl-gray-100" />

      <div className="mb-6 rounded-lg border border-burl-gray-200 bg-warm-gray/40 px-5 py-5">
        <div className="mb-4 h-4 w-56 mx-auto rounded bg-burl-gray-100" />
        <div className="mb-3 h-3 w-full rounded bg-burl-gray-100" />
        <div className="mb-3 h-3 w-full rounded bg-burl-gray-100" />
        <div className="mb-3 h-3 w-5/6 rounded bg-burl-gray-100" />
        <div className="mb-5 h-3 w-3/4 rounded bg-burl-gray-100" />
        <div className="mb-3 h-3 w-full rounded bg-burl-gray-100" />
        <div className="mb-3 h-3 w-full rounded bg-burl-gray-100" />
        <div className="mb-3 h-3 w-5/6 rounded bg-burl-gray-100" />
        <div className="h-3 w-2/3 rounded bg-burl-gray-100" />
      </div>

      <div className="mb-6">
        <div className="mb-2 h-3 w-32 rounded bg-burl-gray-100" />
        <div className="h-12 w-full rounded-lg bg-burl-gray-100" />
      </div>

      <div className="mb-6 rounded-lg border border-burl-gray-200 bg-warm-gray/40 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 rounded bg-burl-gray-100" />
          <div className="h-3 w-28 rounded bg-burl-gray-100" />
        </div>
      </div>

      <div className="h-11 w-full rounded-lg bg-burl-gray-100" />
    </div>
  )
}
