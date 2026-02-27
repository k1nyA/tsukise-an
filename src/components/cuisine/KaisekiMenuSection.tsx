import Image from 'next/image'

type MenuItem = {
  name: string
  description: string
  image?: string
  imageLabel: string
}

const menuItems: MenuItem[] = [
  {
    name: '先附',
    description: '季節の先付け三種盛り\n春菊の白和え、蛍烏賊の酢味噌',
    image: '/images/cuisine-kaiseki-sakizuke.png',
    imageLabel: '先附の写真',
  },
  {
    name: '椀物',
    description: '蛤の真薯仕立て\n木の芽の香り、柚子皮を添えて',
    image: '/images/cuisine-kaiseki-wanmono.png',
    imageLabel: '椀物の写真',
  },
  {
    name: '造り',
    description: '小田原の地魚三種盛り\n本日の鮮魚をお造りで',
    image: '/images/cuisine-kaiseki-tsukuri.png',
    imageLabel: '造りの写真',
  },
  {
    name: '焼物',
    description: '駿河湾産金目鯛の西京焼き\n木の芽味噌を添えて',
    image: '/images/cuisine-kaiseki-yakimono.png',
    imageLabel: '焼物の写真',
  },
  {
    name: '煮物',
    description: '飛龍頭と聖護院大根の炊き合わせ\n柚子の香りとともに',
    image: '/images/cuisine-kaiseki-nimono.png',
    imageLabel: '煮物の写真',
  },
  {
    name: '水菓子',
    description: '季節の果実と自家製甘味\n抹茶とともに',
    image: '/images/cuisine-kaiseki-mizugashi.png',
    imageLabel: '水菓子の写真',
  },
]

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex w-full flex-col overflow-hidden">
      {/* Image */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 'var(--r-cuisine-kaiseki-card-img-h)' }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageLabel}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        ) : (
          <div
            aria-label={item.imageLabel}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'var(--ryokan-dark, #2C2418)',
            }}
          />
        )}
      </div>

      {/* Info */}
      <div
        className="flex flex-col"
        style={{
          backgroundColor: 'var(--ryokan-light-bg-alt, #EEEBE3)',
          padding: 20,
          gap: 8,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 2,
            margin: 0,
          }}
        >
          {item.name}
        </h3>
        <p
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
    </div>
  )
}

export function KaisekiMenuSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding:
          'var(--r-cuisine-kaiseki-pt) var(--r-cuisine-kaiseki-px) var(--r-cuisine-kaiseki-pb) var(--r-cuisine-kaiseki-px)',
        gap: 'var(--r-cuisine-kaiseki-gap)',
      }}
    >
      {/* Title */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--r-cuisine-kaiseki-title)',
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 'var(--r-cuisine-kaiseki-title-ls)',
          margin: 0,
        }}
      >
        月替わり懐石  — 如月の膳 —
      </h2>

      {/* Responsive Grid: 3-col PC / 2-col Tablet / 1-col Mobile */}
      <div className="r-cuisine-grid">
        {menuItems.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}
