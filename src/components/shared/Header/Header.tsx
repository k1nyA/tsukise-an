import Link from 'next/link'
import { MobileMenuButton } from './MobileMenuButton'

const NAV_LINKS = [
  { text: '客室', href: '/rooms' },
  { text: '温泉', href: '/onsen' },
  { text: 'お料理', href: '/cuisine' },
  { text: '過ごし方', href: '/experience' },
  { text: 'アクセス', href: '/access' },
] as const

export function Header() {
  return (
    <header className="header-root">
      {/* Logo area */}
      <Link href="/" className="header-logo-link">
        <span className="header-logo-mark">月</span>
        <span className="header-logo-divider" aria-hidden="true" />
        <span className="header-logo-text">
          <span className="header-logo-main">月瀬庵</span>
          <span className="header-logo-sub">TSUKISE-AN</span>
        </span>
      </Link>

      {/* Desktop/Tablet nav -- hidden on mobile via CSS */}
      <nav className="header-nav">
        {NAV_LINKS.map(({ text, href }) => (
          <Link key={href} href={href} className="header-nav-link">
            {text}
          </Link>
        ))}
        <span className="header-nav-divider" aria-hidden="true" />
        <Link href="/reservation" className="header-nav-cta">
          ご予約
        </Link>
      </nav>

      {/* Mobile hamburger -- hidden on tablet/PC via CSS */}
      <div className="header-mobile-trigger">
        <MobileMenuButton />
      </div>
    </header>
  )
}
