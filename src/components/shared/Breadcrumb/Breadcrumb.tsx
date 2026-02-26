import Link from 'next/link'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label="パンくずリスト"
      style={{
        width: '100%',
        backgroundColor: 'var(--ryokan-light-bg, #EEEBE3)',
        padding: 'var(--r-breadcrumb-py) var(--r-breadcrumb-px)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <span key={`${item.label}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Separator before all items except the first */}
            {index > 0 && (
              <span
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 300,
                  color: 'var(--ryokan-light-gold, #D4C5A0)',
                }}
              >
                &gt;
              </span>
            )}

            {/* Item: link if not last and has href, otherwise plain text */}
            {!isLast && item.href ? (
              <Link
                href={item.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--ryokan-subtle, #8B7D6B)',
                  letterSpacing: 2,
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  fontWeight: 500,
                  color: 'var(--ryokan-subtle, #8B7D6B)',
                  letterSpacing: 2,
                }}
                {...(isLast ? { 'aria-current': 'page' as const } : {})}
              >
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
