export type SectionLabelProps = {
  english: string
  variant?: 'default' | 'gold'
}

export function SectionLabel({ english, variant = 'default' }: SectionLabelProps) {
  const isGold = variant === 'gold'
  const textColor = isGold ? '#8B6914' : '#8B7D6B'
  const lineColor = isGold ? '#8B6914' : '#D4C5A0'

  return (
    <div className="flex items-center gap-5">
      <span
        data-testid="section-label-line"
        className="block"
        style={{
          width: 40,
          height: 1,
          backgroundColor: lineColor,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 13,
          fontWeight: 500,
          color: textColor,
          letterSpacing: 5,
        }}
      >
        {english}
      </span>
      <span
        data-testid="section-label-line"
        className="block"
        style={{
          width: 40,
          height: 1,
          backgroundColor: lineColor,
        }}
      />
    </div>
  )
}
