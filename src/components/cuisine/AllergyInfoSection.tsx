import { Utensils, Leaf, Baby, type LucideIcon } from 'lucide-react'

type AllergyItem = {
  icon: LucideIcon
  title: string
  description: string
}

const allergyItems: AllergyItem[] = [
  {
    icon: Utensils,
    title: 'アレルギー対応',
    description: '事前にお知らせいただければ\n代替食材でご用意いたします',
  },
  {
    icon: Leaf,
    title: 'ベジタリアン対応',
    description: '精進料理をベースとした\n特別懐石をご用意いたします',
  },
  {
    icon: Baby,
    title: 'お子様メニュー',
    description: 'お子様向けの特別メニューを\nご用意しております',
  },
]

export function AllergyInfoSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
        padding: 'var(--r-cuisine-allergy-py) var(--r-cuisine-allergy-px)',
        gap: 'var(--r-cuisine-allergy-gap)',
      }}
    >
      {/* Title */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--r-title-xs)',
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 'var(--r-title-spacing-sm)',
          margin: 0,
        }}
      >
        アレルギー・特別対応
      </h2>

      {/* Allergy items: row on PC/Tablet, column on Mobile */}
      <div className="r-cuisine-allergy-items w-full">
        {allergyItems.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center"
            style={{ flex: '1 1 0', gap: 12 }}
          >
            {/* Icon */}
            <item.icon
              size={28}
              color="var(--ryokan-gold, #8B6914)"
              aria-hidden="true"
            />

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--ryokan-dark, #2C2418)',
                letterSpacing: 1,
                margin: 0,
              }}
            >
              {item.title}
            </h3>

            {/* Description */}
            <p
              className="text-center"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--ryokan-secondary, #6B5D4F)',
                lineHeight: 1.8,
                whiteSpace: 'pre-line',
                margin: 0,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
