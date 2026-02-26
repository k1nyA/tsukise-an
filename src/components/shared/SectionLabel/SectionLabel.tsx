export type SectionLabelProps = {
  english: string
  variant?: 'default' | 'gold'
}

export function SectionLabel({ english, variant = 'default' }: SectionLabelProps) {
  const isGold = variant === 'gold'
  const textColor = isGold
    ? 'var(--ryokan-gold, #8B6914)'
    : 'var(--ryokan-subtle, #8B7D6B)'
  const lineColor = isGold
    ? 'var(--ryokan-gold, #8B6914)'
    : 'var(--ryokan-light-gold, #D4C5A0)'

  return (
    <div
      className="flex items-center"
      style={{ gap: 'var(--r-section-label-gap)' }}
    >
      <span
        data-testid="section-label-line"
        className="block"
        style={{
          width: 'var(--r-section-label-line-w)',
          height: 1,
          backgroundColor: lineColor,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 'var(--r-section-label-size)',
          fontWeight: 500,
          color: textColor,
          letterSpacing: 'var(--r-section-label-ls)',
        }}
      >
        {english}
      </span>
      <span
        data-testid="section-label-line"
        className="block"
        style={{
          width: 'var(--r-section-label-line-w)',
          height: 1,
          backgroundColor: lineColor,
        }}
      />
    </div>
  )
}
