import { SectionLabel } from '@/components/shared/SectionLabel'

export function ConceptSection() {
  return (
    <section
      className="w-full"
      style={{
        backgroundImage: 'var(--experience-concept-bg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center"
        style={{
          padding: 'var(--r-exp-concept-py) var(--r-exp-concept-px)',
          gap: 'var(--r-exp-concept-gap)',
        }}
      >
        {/* English label */}
        <SectionLabel english="EXPERIENCE" />

        {/* Title */}
        <h2
          className="text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-exp-concept-title)',
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 'var(--r-exp-concept-title-ls)',
          }}
        >
          時の流れに身を委ねて。
        </h2>

        {/* Body text */}
        <div
          className="r-exp-concept-body flex flex-col items-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-exp-concept-body)',
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 'var(--r-exp-concept-body-ls)',
            lineHeight: 'var(--r-exp-concept-body-lh)',
            maxWidth: 'var(--r-exp-concept-body-w)',
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
