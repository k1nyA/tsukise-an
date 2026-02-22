'use client'

import { useState } from 'react'
import {
  Calendar,
  Waves,
  UtensilsCrossed,
  MapPin,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'

type FAQItem = {
  question: string
  answer?: string
}

type FAQCategorySectionProps = {
  title: string
  icon: 'calendar' | 'waves' | 'utensils' | 'map-pin'
  variant: 'light' | 'alt'
  items: FAQItem[]
}

const iconMap = {
  calendar: Calendar,
  waves: Waves,
  utensils: UtensilsCrossed,
  'map-pin': MapPin,
}

export function FAQCategorySection({
  title,
  icon,
  variant,
  items,
}: FAQCategorySectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.findIndex((item) => item.answer !== undefined) === -1
      ? null
      : items.findIndex((item) => item.answer !== undefined)
  )

  const bgColor =
    variant === 'light'
      ? 'var(--ryokan-bg, #FAF8F3)'
      : 'var(--ryokan-light-bg-alt, #F0EBE0)'

  const itemBgColor =
    variant === 'light'
      ? 'var(--ryokan-light-bg-alt, #F0EBE0)'
      : 'var(--ryokan-bg, #FAF8F3)'

  const IconComponent = iconMap[icon]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      className="flex w-full flex-col"
      style={{
        backgroundColor: bgColor,
        padding: '60px 200px',
        gap: 32,
      }}
    >
      {/* Category title with icon */}
      <div className="flex items-center" style={{ gap: 16 }}>
        <IconComponent
          size={28}
          style={{ color: 'var(--ryokan-gold, #8B6914)' }}
          aria-hidden="true"
        />
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 22,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 3,
          }}
        >
          {title}
        </h2>
      </div>

      {/* FAQ items */}
      <dl className="flex w-full flex-col" style={{ gap: 0 }}>
        {items.map((item, index) => {
          const isOpen = openIndex === index
          return (
            <div key={index} data-testid="faq-item" className="flex w-full flex-col">
              {/* Question */}
              <dt>
                <button
                  type="button"
                  className="flex w-full items-center"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  style={{
                    backgroundColor: itemBgColor,
                    padding: '20px 24px',
                    gap: 16,
                    borderRadius: isOpen ? '4px 4px 0 0' : 4,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: 20,
                      fontWeight: 700,
                      color: 'var(--ryokan-gold, #8B6914)',
                    }}
                  >
                    Q
                  </span>
                  <span
                    className="flex-1"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--ryokan-dark, #2C2418)',
                      letterSpacing: 1,
                    }}
                  >
                    {item.question}
                  </span>
                  {isOpen ? (
                    <ChevronDown
                      size={20}
                      style={{ color: 'var(--ryokan-subtle, #8B7D6B)' }}
                      aria-hidden="true"
                    />
                  ) : (
                    <ChevronRight
                      size={20}
                      style={{ color: 'var(--ryokan-subtle, #8B7D6B)' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </dt>

              {/* Answer (shown when open and answer exists) */}
              {isOpen && item.answer && (
                <dd style={{ margin: 0 }}>
                  <div
                    style={{
                      backgroundColor: bgColor,
                      padding: '20px 24px 20px 60px',
                      borderRadius: '0 0 4px 4px',
                      border: '1px solid var(--ryokan-soft-line, #D4C5A033)',
                      borderTop: 'none',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        fontWeight: 300,
                        color: 'var(--ryokan-muted, #4A4035)',
                        letterSpacing: 1,
                        lineHeight: 2,
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                </dd>
              )}
            </div>
          )
        })}
      </dl>
    </section>
  )
}
