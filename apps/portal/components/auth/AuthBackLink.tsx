import Link from 'next/link'

const chevron = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const className = 'inline-flex items-center gap-1.5 text-[0.8125rem] text-burl-gray-400 transition-colors hover:text-burl-gray-700'

type Props =
  | { href: string; external?: boolean; onClick?: never; label: string }
  | { onClick: () => void; href?: never; external?: never; label: string }

export function AuthBackLink(props: Props) {
  if ('onClick' in props && props.onClick) {
    return (
      <button type="button" onClick={props.onClick} className={className}>
        {chevron}
        {props.label}
      </button>
    )
  }

  if (props.external) {
    return (
      <a href={props.href} className={className}>
        {chevron}
        {props.label}
      </a>
    )
  }

  return (
    <Link href={props.href!} className={className}>
      {chevron}
      {props.label}
    </Link>
  )
}
