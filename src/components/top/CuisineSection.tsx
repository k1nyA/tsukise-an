import Image from 'next/image'

const dishes = [
  { image: '/images/cuisine-hassun.png', title: '八寸', description: '旬の食材を彩り豊かに' },
  { image: '/images/cuisine-yakimono.png', title: '焼物', description: '相模湾直送の炭火焼き' },
  { image: '/images/cuisine-mizugashi.png', title: '水菓子', description: '季節を映す和の甘味' },
]

export function CuisineSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        padding: '100px 80px',
        gap: 60,
        backgroundColor: 'var(--ryokan-dark)',
        backgroundImage: 'url(/images/cuisine-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center" style={{ gap: 20 }}>
        <span
          style={{ width: 60, height: 1, backgroundColor: 'var(--ryokan-gold)' }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ryokan-gold)',
            letterSpacing: 5,
          }}
        >
          CUISINE
        </span>
        <span
          style={{ width: 60, height: 1, backgroundColor: 'var(--ryokan-gold)' }}
          aria-hidden="true"
        />
      </div>

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

      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          fontWeight: 300,
          color: 'var(--ryokan-text-subtle)',
          letterSpacing: 1,
          lineHeight: 2,
          textAlign: 'center',
          maxWidth: 640,
          margin: 0,
        }}
      >
        相模湾の新鮮な海の幸と、箱根の山の恵みを
        <br />
        料理長が一皿一皿、丁寧にお仕立ていたします。
        <br />
        ミシュラン二つ星の評価を賜りました。
      </p>

      <div className="flex items-center" style={{ gap: 12 }}>
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--ryokan-gold)',
            letterSpacing: 3,
          }}
        >
          VIEW MORE
        </span>
        <span
          style={{ width: 40, height: 1, backgroundColor: 'var(--ryokan-gold)' }}
          aria-hidden="true"
        />
      </div>

      <div className="flex w-full" style={{ gap: 24 }}>
        {dishes.map((dish) => (
          <div
            key={dish.title}
            className="flex flex-1 flex-col items-center"
            style={{ gap: 16, paddingBottom: 24 }}
          >
            <div className="relative w-full overflow-hidden" style={{ height: 300 }}>
              <Image
                src={dish.image}
                alt={dish.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 18,
                fontWeight: 600,
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
                fontSize: 14,
                fontWeight: 300,
                color: 'var(--ryokan-subtle)',
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
