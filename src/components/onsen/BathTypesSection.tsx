import Image from 'next/image'

export function BathTypesSection() {
  return (
    <>
      {/* Daiyokujo Section - ImgText (image left, content right) */}
      <section
        className="r-onsen-bath-imgtext w-full overflow-hidden"
        style={{ height: 'var(--r-onsen-bath-h)' }}
      >
        {/* Image */}
        <div className="r-onsen-bath-img relative overflow-hidden">
          <Image
            src="/images/onsen-daiyokujo-main.png"
            alt="大浴場の写真"
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 380px, 720px"
          />
        </div>

        {/* Content */}
        <div
          className="flex flex-col justify-center"
          style={{
            flex: 1,
            backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
            padding: 'var(--r-onsen-bath-padding)',
            gap: 'var(--r-onsen-bath-gap)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--r-onsen-bath-title-size)',
              fontWeight: 600,
              color: 'var(--ryokan-dark, #2C2418)',
              letterSpacing: 'var(--r-onsen-bath-title-ls)',
              margin: 0,
            }}
          >
            大浴場
          </h3>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-onsen-bath-sub-size)',
              fontWeight: 300,
              color: 'var(--ryokan-subtle, #8B7D6B)',
              letterSpacing: 1.5,
            }}
          >
            檜の湯・岩の湯
          </span>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-onsen-bath-body-size)',
              fontWeight: 300,
              color: 'var(--ryokan-secondary, #6B5D4F)',
              letterSpacing: 1,
              lineHeight: 'var(--r-onsen-bath-body-lh)',
              margin: 0,
            }}
          >
            檜の香りに包まれた内湯と、自然石を配した岩風呂。
            それぞれ趣の異なる二つの浴槽で、
            心身を解きほぐすひとときをお過ごしください。
          </p>
        </div>
      </section>

      {/* Rotenburo Section - TextImg (content left, image right) */}
      <section
        className="r-onsen-bath-textimg w-full overflow-hidden"
        style={{ height: 'var(--r-onsen-bath-h)' }}
      >
        {/* Content */}
        <div
          className="flex flex-col justify-center"
          style={{
            flex: 1,
            backgroundColor: 'var(--ryokan-light-bg-alt, #F0EBE0)',
            padding: 'var(--r-onsen-bath-padding)',
            gap: 'var(--r-onsen-bath-gap)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--r-onsen-bath-title-size)',
              fontWeight: 600,
              color: 'var(--ryokan-dark, #2C2418)',
              letterSpacing: 'var(--r-onsen-bath-title-ls)',
              margin: 0,
            }}
          >
            露天風呂
          </h3>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-onsen-bath-sub-size)',
              fontWeight: 300,
              color: 'var(--ryokan-subtle, #8B7D6B)',
              letterSpacing: 1.5,
            }}
          >
            芦ノ湖を望む絶景の湯
          </span>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--r-onsen-bath-body-size)',
              fontWeight: 300,
              color: 'var(--ryokan-secondary, #6B5D4F)',
              letterSpacing: 1,
              lineHeight: 'var(--r-onsen-bath-body-lh)',
              margin: 0,
            }}
          >
            芦ノ湖を一望する開放感あふれる露天風呂。
            四季折々の景色とともに湯浴みをお楽しみください。
            朝は湖面の霧、夕は山々に沈む夕陽、夜は水面に映る月。
          </p>
        </div>

        {/* Image */}
        <div className="r-onsen-bath-img relative overflow-hidden">
          <Image
            src="/images/onsen-rotenburo-main.png"
            alt="露天風呂の写真"
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 380px, 720px"
          />
        </div>
      </section>
    </>
  )
}
