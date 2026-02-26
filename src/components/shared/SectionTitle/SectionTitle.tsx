export type SectionTitleProps = {
  children: string
}

/**
 * Section Title — matches .pen "Section Title" (7THkA).
 * Just a styled <h2>. Decorative lines are composed per-section, not here.
 */
export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--r-section-title-size)',
        fontWeight: 600,
        color: 'var(--ryokan-dark, #2C2418)',
        letterSpacing: 'var(--r-section-title-ls)',
        textAlign: 'center',
        margin: 0,
      }}
    >
      {children}
    </h2>
  )
}
