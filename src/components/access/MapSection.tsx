export function MapSection() {
  return (
    <section
      className="r-access-map flex w-full flex-col items-center justify-center"
      style={{
        backgroundColor: 'var(--ryokan-info-bg, #F0EBE0)',
        padding: 'var(--r-access-map-py) var(--r-access-map-px)',
        minHeight: 'var(--r-access-map-min-h)',
      }}
    >
      {/* Map placeholder frame — to be replaced with Google Maps iframe */}
      <div
        data-testid="map-frame"
        className="relative w-full overflow-hidden"
        style={{
          height: 'var(--r-access-map-frame-h)',
          borderRadius: 4,
          backgroundColor: 'var(--ryokan-light-bg, #EEEBE3)',
        }}
      >
        {/* Overlay text placeholder */}
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            backgroundColor: '#2C241833',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              fontWeight: 'normal',
              color: 'var(--ryokan-text-on-dark, #FAF8F3)',
              letterSpacing: 2,
              textAlign: 'center',
            }}
          >
            Google Maps 埋め込みエリア
          </span>
        </div>
      </div>

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
        Google Mapで見る →
      </a>
    </section>
  )
}
