import Image from 'next/image'

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
        }}
      >
        <Image
          src="/images/access-map.png"
          alt="月瀬庵へのアクセスマップ"
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 100vw"
        />
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
