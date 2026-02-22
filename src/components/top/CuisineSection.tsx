import { SectionLabel } from '@/components/shared/SectionLabel'

const dishes = [
  {
    title: '八寸',
    description: '旬の食材を彩り豊かに',
  },
  {
    title: '焼物',
    description: '相模湾直送の炭火焼き',
  },
  {
    title: '水菓子',
    description: '季節を映す和の甘味',
  },
]

export function CuisineSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-dark)',
        padding: '100px 80px',
        gap: 60,
      }}
    >
      {/* Label */}
      <SectionLabel english="CUISINE" variant="gold" />

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 32,
          fontWeight: 600,
          color: 'var(--ryokan-text-on-dark)',
          letterSpacing: 4,
          textAlign: 'center',
          margin: 0,
        }}
      >
        旬を紡ぐ、月替わり懐石
      </h2>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 300,
          color: 'var(--ryokan-text-subtle)',
          letterSpacing: 1,
          lineHeight: 2,
          textAlign: 'center',
          maxWidth: 600,
          margin: 0,
        }}
      >
        相模湾の新鮮な海の幸と、箱根の山の恵みを
        <br />
        料理長が一皿一皿、丁寧にお仕立ていたします。
        <br />
        ミシュラン二つ星の評価を賜りました。
      </p>

      {/* Dish cards grid */}
      <div className="flex w-full gap-6">
        {dishes.map((dish) => (
          <div key={dish.title} className="flex flex-1 flex-col items-center gap-4">
            {/* Image placeholder */}
            <div
              className="w-full overflow-hidden"
              style={{
                aspectRatio: '4/3',
                backgroundColor: 'var(--ryokan-darkest)',
              }}
            />
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 18,
                fontWeight: 500,
                color: 'var(--ryokan-text-on-dark)',
                letterSpacing: 2,
                margin: 0,
              }}
            >
              {dish.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--ryokan-text-subtle)',
                letterSpacing: 1,
                margin: 0,
              }}
            >
              {dish.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
