import Link from 'next/link'
import { Instagram, Facebook, MessageCircle } from 'lucide-react'

const PRIMARY_NAV = [
  { text: '客室', href: '/rooms' },
  { text: '温泉', href: '/onsen' },
  { text: 'お料理', href: '/cuisine' },
  { text: '過ごし方', href: '/experience' },
  { text: 'アクセス', href: '/access' },
] as const

const SECONDARY_NAV = [
  { text: 'お知らせ', href: '/news' },
  { text: 'よくあるご質問', href: '/faq' },
  { text: 'お問い合わせ', href: '/contact' },
] as const

const LEGAL_LINKS = [
  { text: 'プライバシーポリシー', href: '/privacy' },
  { text: '特定商取引法に基づく表記', href: '/legal' },
  { text: 'サイトマップ', href: '/sitemap' },
] as const

function FooterBrand() {
  return (
    <div className="footer-brand">
      <Link href="/" className="footer-logo-row">
        <span className="footer-logo-mark">月</span>
        <span className="footer-logo-divider" aria-hidden="true" />
        <span className="footer-logo-name">月瀬庵</span>
      </Link>
      <p className="footer-addr">
        {'〒250-0522\n神奈川県足柄下郡箱根町元箱根138'}
      </p>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="footer-root">
      {/* Top: Brand + Nav */}
      <div className="footer-top">
        <FooterBrand />
        <nav className="footer-navs">
          {PRIMARY_NAV.map(({ text, href }) => (
            <Link key={href} href={href} className="footer-nav-link">
              {text}
            </Link>
          ))}
          <Link href="/reservation" className="footer-nav-cta">
            ご予約
          </Link>
        </nav>
      </div>

      {/* Secondary Nav */}
      <div className="footer-secondary-nav">
        {SECONDARY_NAV.map(({ text, href }) => (
          <Link key={href} href={href} className="footer-secondary-link">
            {text}
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="footer-divider" aria-hidden="true" />

      {/* Legal + SNS */}
      <div className="footer-bottom-row">
        <div className="footer-legal">
          {LEGAL_LINKS.map(({ text, href }) => (
            <Link key={href} href={href} className="footer-legal-link">
              {text}
            </Link>
          ))}
        </div>
        <div className="footer-sns">
          <span className="footer-sns-icon">
            <Instagram size={18} />
          </span>
          <span className="footer-sns-icon">
            <Facebook size={18} />
          </span>
          <span className="footer-sns-icon">
            <MessageCircle size={18} />
          </span>
        </div>
      </div>

      {/* Copyright */}
      <p className="footer-copyright">
        &copy; 2026 月瀬庵 TSUKISE-AN. All Rights Reserved.
      </p>
    </footer>
  )
}
