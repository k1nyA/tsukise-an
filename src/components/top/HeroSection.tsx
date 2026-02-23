import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Mouse } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 780 }}>
      <Image
        src="/images/hero.png"
        alt="芦ノ湖畔の月瀬庵"
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: '#1A150E77' }}
        aria-hidden="true"
      />

      <div
        className="relative z-10 flex flex-col"
        style={{ gap: 32, top: 220, left: 100 }}
      >
        <div className="flex items-center" style={{ gap: 16 }}>
          <span
            style={{ width: 40, height: 1, backgroundColor: 'var(--ryokan-light-gold)' }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              fontWeight: 'normal',
              color: 'var(--ryokan-light-gold)',
              letterSpacing: 4,
            }}
          >
            箱根 芦ノ湖畔
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 56,
            fontWeight: 'bold',
            color: '#faf8f3',
            letterSpacing: 4,
            lineHeight: 1.5,
            margin: 0,
            width: 600,
          }}
        >
          湖と月、
          <br />
          そして静寂。
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            fontWeight: 300,
            color: 'var(--ryokan-light-gold)',
            letterSpacing: 3,
            margin: 0,
          }}
        >
          芦ノ湖の湖面に映る月を眺める、全八室の離れ宿
        </p>

        <Link
          href="#concept"
          className="inline-flex items-center"
          style={{
            gap: 12,
            padding: '14px 40px',
            border: '1px solid #D4C5A0',
            backgroundColor: 'transparent',
            textDecoration: 'none',
            width: 'fit-content',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 'normal',
              color: '#D4C5A0',
              letterSpacing: 3,
            }}
          >
            宿を知る
          </span>
          <ChevronRight size={14} color="var(--ryokan-light-gold)" />
        </Link>
      </div>

      <div
        className="absolute z-10 flex w-full flex-col items-center"
        style={{ gap: 6, left: 0, top: 725 }}
      >
        <Mouse size={20} color="#D4C5A088" strokeWidth={1.5} />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 10,
            fontWeight: 'normal',
            color: '#D4C5A088',
            letterSpacing: 3,
          }}
        >
          Scroll
        </span>
      </div>
    </section>
  )
}
