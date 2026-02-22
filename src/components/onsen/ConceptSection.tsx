import { SectionLabel } from '@/components/shared/SectionLabel'

export function ConceptSection() {
  return (
    <section
      className="w-full"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center"
        style={{
          maxWidth: 'var(--content-max-width, 1000px)',
          padding: '100px 200px',
          gap: 48,
        }}
      >
        {/* English label */}
        <SectionLabel english="NATURAL HOT SPRING" />

        {/* Title */}
        <h2
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 32,
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 6,
          }}
        >
          湯に浸り、景に溶ける。
        </h2>

        {/* Body text */}
        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 1.5,
            lineHeight: 2.4,
            maxWidth: 640,
          }}
        >
          月瀬庵の湯は、古くから「美肌の湯」として知られる姥子温泉。
          芦ノ湖を望む露天風呂では、朝は湖面を這う霧を、
          夕は山々に沈む夕陽を、夜は水面に映る月を眺めながら、
          至福のひとときをお過ごしいただけます。
        </p>

        {/* Decorative vertical line */}
        <span
          data-testid="concept-deco-line"
          className="block"
          style={{
            width: 1,
            height: 40,
            backgroundColor: 'var(--ryokan-light-gold, #D4C5A0)',
          }}
        />
      </div>
    </section>
  )
}
