export function MapSection() {
  return (
    <section
      className="flex w-full flex-col items-center justify-center"
      style={{
        backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
        padding: '32px 80px',
        minHeight: 320,
      }}
    >
      {/* Map placeholder frame */}
      <div
        data-testid="map-frame"
        className="w-full"
        style={{
          height: 260,
          borderRadius: 4,
          backgroundColor: 'var(--ryokan-light-bg, #EEEBE3)',
          overflow: 'hidden',
        }}
      />

      {/* Google Map link */}
      <a
        href="https://maps.google.com/?q=箱根町元箱根138"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--ryokan-gold, #8B6914)',
          letterSpacing: 1,
          textDecoration: 'none',
        }}
      >
        Google Mapで見る &rarr;
      </a>
    </section>
  )
}
