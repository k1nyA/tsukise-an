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
          maxWidth: 'var(--content-max-width, 1040px)',
          padding: '100px 200px',
          gap: 48,
        }}
      >
        {/* English label */}
        <SectionLabel english="EXPERIENCE" />

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
          時の流れに身を委ねて。
        </h2>

        {/* Body text */}
        <div
          className="flex flex-col items-center text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 1.5,
            lineHeight: 2.4,
            maxWidth: 600,
            gap: 24,
          }}
        >
          <p>
            月瀬庵での滞在は、時計を忘れることから始まります。
            <br />
            湖畔の散歩、森の中の読書、温泉での瞑想。
            <br />
            何もしない贅沢を、ここで見つけてください。
          </p>
          <p>
            四季折々の自然が、その日だけの体験を
            <br />
            ご用意してお待ちしています。
          </p>
        </div>

        {/* Decorative vertical line */}
        <span
          data-testid="experience-concept-deco-line"
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
