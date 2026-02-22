import { SectionLabel } from '@/components/shared/SectionLabel'

type BathType = {
  name: string
  capacity: string
  description: string
  imageLabel: string
}

const bathTypes: BathType[] = [
  {
    name: '檜の湯',
    capacity: '定員4名',
    description:
      '檜の香りに包まれた内湯。木のぬくもりが心身を解きほぐす、静寂の空間です。',
    imageLabel: '檜の湯の写真',
  },
  {
    name: '岩の湯',
    capacity: '定員3名',
    description:
      '自然石を配した趣ある岩風呂。山の力強さを感じながら、湯に身を委ねるひとときを。',
    imageLabel: '岩の湯の写真',
  },
  {
    name: '露天の湯',
    capacity: '定員5名',
    description:
      '芦ノ湖を一望する開放感あふれる露天風呂。四季折々の景色とともに湯浴みをお楽しみください。',
    imageLabel: '露天の湯の写真',
  },
]

export function BathTypesSection() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '80px 120px',
      }}
    >
      <div className="mx-auto flex flex-col items-center gap-16" style={{ maxWidth: 'var(--content-max-width, 1000px)' }}>
        {/* English label */}
        <SectionLabel english="BATH TYPES" />

        {/* Title */}
        <h2
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 28,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 4,
          }}
        >
          三つの湯処
        </h2>

        {/* Bath type cards */}
        <div className="flex w-full flex-col gap-16">
          {bathTypes.map((bath, index) => {
            const isReversed = index % 2 === 1
            return (
              <div
                key={bath.name}
                className="flex w-full overflow-hidden"
                style={{
                  flexDirection: isReversed ? 'row-reverse' : 'row',
                  height: 400,
                }}
              >
                {/* Image placeholder */}
                <div
                  aria-label={bath.imageLabel}
                  className="flex-shrink-0"
                  style={{
                    width: '50%',
                    height: '100%',
                    backgroundColor: 'var(--ryokan-dark, #2C2418)',
                  }}
                />

                {/* Content */}
                <div
                  className="flex flex-col justify-center"
                  style={{
                    width: '50%',
                    padding: 60,
                    gap: 24,
                    backgroundColor: isReversed
                      ? 'var(--ryokan-light-bg-alt, #F0EBE0)'
                      : 'var(--ryokan-bg, #FAF8F3)',
                  }}
                >
                  {/* Bath name */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 24,
                      fontWeight: 600,
                      color: 'var(--ryokan-dark, #2C2418)',
                      letterSpacing: 3,
                    }}
                  >
                    {bath.name}
                  </h3>

                  {/* Capacity */}
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 13,
                      fontWeight: 300,
                      color: 'var(--ryokan-subtle, #8B7D6B)',
                      letterSpacing: 1.5,
                    }}
                  >
                    {bath.capacity}
                  </span>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      fontWeight: 300,
                      color: 'var(--ryokan-secondary, #6B5D4F)',
                      letterSpacing: 1,
                      lineHeight: 2.0,
                    }}
                  >
                    {bath.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
