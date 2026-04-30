import Link from 'next/link'

interface ArrowLinkProps {
  href: string
  children: string
}

export function ArrowLink({ href, children }: ArrowLinkProps) {
  return (
    <Link href={href} className="arrow-link">
      {children}
      <span className="arrow-link-icon">&rarr;</span>
    </Link>
  )
}
