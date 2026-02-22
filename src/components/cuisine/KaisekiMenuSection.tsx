type MenuItem = {
  name: string
  description: string
  imageLabel: string
}

const menuRow1: MenuItem[] = [
  {
    name: '先附',
    description: '季節の先付け三種盛り\n春菊の白和え、蛍烏賊の酢味噌',
    imageLabel: '先附の写真',
  },
  {
    name: '椀物',
    description: '蛤の真薯仕立て\n木の芽の香り、柚子皮を添えて',
    imageLabel: '椀物の写真',
  },
  {
    name: '造り',
    description: '小田原の地魚三種盛り\n本日の鮮魚をお造りで',
    imageLabel: '造りの写真',
  },
]

const menuRow2: MenuItem[] = [
  {
    name: '焼物',
    description: '駿河湾産金目鯛の西京焼き\n木の芽味噌を添えて',
    imageLabel: '焼物の写真',
  },
  {
    name: '煮物',
    description: '飛龍頭と聖護院大根の炊き合わせ\n柚子の香りとともに',
    imageLabel: '煮物の写真',
  },
  {
    name: '水菓子',
    description: '季節の果実と自家製甘味\n抹茶とともに',
    imageLabel: '水菓子の写真',
  },
]

const menuRow3: MenuItem[] = [
  {
    name: '八寸',
    description: '季節の前菜を少しずつ\n盛り合わせた一皿',
    imageLabel: '八寸の写真',
  },
  {
    name: '揚物',
    description: '旬の素材を軽やかに揚げた\n天ぷら',
    imageLabel: '揚物の写真',
  },
  {
    name: '食事',
    description: '土鍋で炊き上げる\n箱根の湧水米',
    imageLabel: '食事の写真',
  },
]

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex w-full flex-col overflow-hidden" style={{ flex: '1 1 0' }}>
      {/* Image placeholder */}
      <div
        aria-label={item.imageLabel}
        style={{
          width: '100%',
          height: 260,
          backgroundColor: 'var(--ryokan-dark, #2C2418)',
        }}
      />

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
        padding: '60px 80px 100px 80px',
        gap: 40,
      }}
    >
      {/* Title */}
      <h2
        className="text-center"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
        }}
      >
        月替わり懐石  — 如月の膳 —
      </h2>

      {/* Row 1 */}
      <div className="flex w-full" style={{ gap: 24 }}>
        {menuRow1.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="flex w-full" style={{ gap: 24 }}>
        {menuRow2.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>

      {/* Row 3 */}
      <div className="flex w-full" style={{ gap: 24 }}>
        {menuRow3.map((item) => (
          <MenuCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}
