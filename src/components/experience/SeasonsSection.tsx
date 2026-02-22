const seasons = [
  {
    label: 'Spring  —  春',
    title: '湖畔の桜と山菜',
    description: '芦ノ湖畔に咲く桜を愛でながら、\n春の山菜狩り体験を。',
  },
  {
    label: 'Summer  —  夏',
    title: '湖上カヌーと花火',
    description: '早朝のカヌー体験と、\n夕涼みの花火鑑賞を。',
  },
  {
    label: 'Autumn  —  秋',
    title: '紅葉と月見の宴',
    description: '色づく山々のハイキングと、\n中秋の名月を愛でる宴を。',
  },
  {
    label: 'Winter  —  冬',
    title: '雪見温泉と星空',
    description: '雪に包まれた露天風呂と、\n冬の澄んだ星空観賞を。',
  },
]

export function SeasonsSection() {
  return (
    <section
      className="flex w-full flex-col items-center"
      style={{
        backgroundImage: 'var(--experience-seasons-bg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 80px 80px 80px',
        gap: 40,
      }}
    >
      {/* Section title */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 28,
          fontWeight: 600,
          color: 'var(--ryokan-dark, #2C2418)',
          letterSpacing: 4,
          margin: 0,
        }}
      >
        四季の楽しみ方
      </h2>

      {/* Season cards row */}
      <div className="flex w-full" style={{ gap: 20 }}>
        {seasons.map((season) => (
          <div
            key={season.label}
            data-testid="season-card"
            className="flex flex-1 flex-col overflow-hidden"
          >
            {/* Image placeholder */}
            <div
              data-testid="season-image"
              className="w-full overflow-hidden"
              style={{
                height: 280,
                backgroundColor: 'var(--ryokan-light-bg, #EEEBE3)',
              }}
            />

            {/* Info */}
            <div
              className="flex flex-col w-full"
              style={{
                backgroundColor: 'var(--ryokan-light-bg, #EEEBE3)',
                gap: 10,
                padding: '24px 20px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--ryokan-gold-dark, #8B6914)',
                  letterSpacing: 3,
                }}
              >
                {season.label}
              </span>
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
                {season.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--ryokan-secondary, #6B5D4F)',
                  lineHeight: 1.8,
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {season.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
