export type SectionTitleProps = {
  children: string
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Top decorative line */}
      <span
        data-testid="section-title-line"
        className="block"
        style={{
          width: 40,
          height: 1,
          backgroundColor: '#D4C5A0',
        }}
      />

      {/* Title text */}
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 32,
          fontWeight: 600,
          color: '#2C2418',
          letterSpacing: 6,
          textAlign: 'center',
        }}
      >
        {children}
      </h2>

      {/* Bottom decorative line */}
      <span
        data-testid="section-title-line"
        className="block"
        style={{
          width: 40,
          height: 1,
          backgroundColor: '#D4C5A0',
        }}
      />
    </div>
  )
}
