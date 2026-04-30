import Link from 'next/link'

export function AuthFooter() {
  return (
    <footer className="auth-form-footer">
      <p>Burlington Consult, LLC &middot; Incorporated in Delaware &middot; The Octagon, Victoria Island, Lagos</p>
      <div className="flex justify-center gap-5 pt-5 text-[0.72rem]">
        <Link href="#">Privacy</Link>
        <Link href="#">Terms</Link>
        <Link href="#">Disclaimer</Link>
      </div>
    </footer>
  )
}
