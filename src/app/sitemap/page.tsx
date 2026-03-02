import Link from 'next/link'

import { Header } from '@/components/shared/Header/Header'
import { PageHero } from '@/components/shared/PageHero/PageHero'
import { Breadcrumb } from '@/components/shared/Breadcrumb/Breadcrumb'
import { Footer } from '@/components/shared/Footer/Footer'

const SITEMAP_LINKS = [
  { label: 'トップページ', href: '/' },
  { label: '客室', href: '/rooms' },
  { label: '温泉', href: '/onsen' },
  { label: 'お料理', href: '/cuisine' },
  { label: '過ごし方', href: '/experience' },
  { label: 'アクセス', href: '/access' },
  { label: 'ご予約', href: '/reservation' },
  { label: 'お問い合わせ', href: '/contact' },
  { label: 'お知らせ', href: '/news' },
  { label: 'よくあるご質問', href: '/faq' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '特定商取引法に基づく表記', href: '/legal' },
] as const

export default function SitemapPage() {
  return (
    <div className="ryokan-page">
      <Header />
      <main>
        <PageHero title="サイトマップ" labelEn="SITEMAP" />
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: 'サイトマップ' },
          ]}
        />

        <section
          aria-label="サイト内ページ一覧"
          style={{
            backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
            padding: 'var(--r-legal-py, 80px) var(--r-legal-px, 200px)',
          }}
        >
          <ul
            className="sitemap-link-list"
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gap: 16,
            }}
          >
            {SITEMAP_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="sitemap-link"
                  style={{
                    color: 'var(--ryokan-dark, #2C2418)',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: 300,
                    lineHeight: 2,
                    letterSpacing: 1,
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}
