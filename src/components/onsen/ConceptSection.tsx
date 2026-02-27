import { SectionLabel } from '@/components/shared/SectionLabel'

export function ConceptSection() {
  return (
    <section
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/onsen-concept-bg.png)',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center"
        style={{
          padding: 'var(--r-onsen-concept-py) var(--r-onsen-concept-px)',
          gap: 'var(--r-onsen-concept-gap)',
        }}
      >
        {/* English label */}
        <SectionLabel english="NATURAL HOT SPRING" />

        {/* Title */}
        <h2
          className="r-concept-body"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--r-onsen-concept-title-size)',
            fontWeight: 600,
            color: 'var(--ryokan-dark, #2C2418)',
            letterSpacing: 'var(--r-onsen-concept-title-ls)',
            margin: 0,
          }}
        >
          湯に浸り、景に溶ける。
        </h2>

        {/* Body text */}
        <p
          className="r-concept-body"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--r-onsen-concept-body-size)',
            fontWeight: 300,
            color: 'var(--ryokan-secondary, #6B5D4F)',
            letterSpacing: 'var(--r-onsen-concept-body-ls)',
            lineHeight: 'var(--r-onsen-concept-body-lh)',
            maxWidth: 'var(--r-onsen-concept-body-w)',
            width: '100%',
            margin: 0,
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
