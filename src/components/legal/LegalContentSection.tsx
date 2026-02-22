const sectionHeadingStyle = {
  fontFamily: 'var(--font-heading)',
  fontSize: 18,
  fontWeight: 600,
  color: 'var(--ryokan-dark, #2C2418)',
} as const

const labelStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  fontWeight: 600,
  color: '#8B7E6A',
} as const

const valueStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  fontWeight: 400,
  color: 'var(--ryokan-dark, #2C2418)',
  lineHeight: 1.8,
} as const

const bodyTextStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: 14,
  fontWeight: 300,
  color: 'var(--ryokan-subtle, #8B7D6B)',
  lineHeight: 2,
  whiteSpace: 'pre-line' as const,
} as const

function Divider() {
  return (
    <span
      data-testid="legal-divider"
      className="block w-full"
      style={{
        height: 1,
        backgroundColor: '#E5DFD3',
      }}
    />
  )
}

interface LegalInfoRowProps {
  label: string
  value: string
}

function LegalInfoRow({ label, value }: LegalInfoRowProps) {
  return (
    <>
      <div className="flex w-full">
        <dt className="shrink-0" style={{ ...labelStyle, width: 200 }}>
          {label}
        </dt>
        <dd style={valueStyle}>{value}</dd>
      </div>
      <Divider />
    </>
  )
}

interface LegalTextSectionProps {
  title: string
  body: string
}

function LegalTextSection({ title, body }: LegalTextSectionProps) {
  return (
    <div className="flex w-full flex-col" style={{ gap: 24 }}>
      <h3 style={sectionHeadingStyle}>{title}</h3>
      <Divider />
      <p style={bodyTextStyle}>{body}</p>
    </div>
  )
}

const businessInfoRows: LegalInfoRowProps[] = [
  { label: '事業者名称', value: '月瀬庵（つきせあん）' },
  { label: '代表者', value: '山田 太郎' },
  { label: '所在地', value: '〒250-0522 神奈川県足柄下郡箱根町元箱根138' },
  { label: '電話番号', value: '0460-83-XXXX' },
  { label: 'メールアドレス', value: 'info@tsukise-an.example.com' },
  { label: 'URL', value: 'https://tsukise-an.example.com' },
]

export function LegalContentSection() {
  return (
    <section
      className="flex w-full flex-col"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '80px 200px',
        gap: 48,
      }}
    >
      {/* Intro text */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          fontWeight: 300,
          color: 'var(--ryokan-dark, #2C2418)',
          lineHeight: 2.2,
        }}
      >
        特定商取引法第11条に基づき、以下のとおり表記いたします。
      </p>

      {/* 事業者情報 */}
      <div className="flex w-full flex-col" style={{ gap: 24 }}>
        <h3 style={sectionHeadingStyle}>事業者情報</h3>
        <Divider />
        <dl className="flex w-full flex-col" style={{ gap: 0 }}>
          {businessInfoRows.map((row) => (
            <LegalInfoRow key={row.label} label={row.label} value={row.value} />
          ))}
        </dl>
      </div>

      {/* 販売価格 */}
      <LegalTextSection
        title="販売価格"
        body="各宿泊プランページに表示された金額（税込）"
      />

      {/* 販売価格以外の必要料金 */}
      <LegalTextSection
        title="販売価格以外の必要料金"
        body="入湯税（大人150円）、消費税"
      />

      {/* 支払方法 */}
      <LegalTextSection
        title="支払方法"
        body={
          'クレジットカード（VISA, Mastercard, JCB, AMEX）\n銀行振込（予約確定後にご案内）'
        }
      />

      {/* 支払時期 */}
      <LegalTextSection
        title="支払時期"
        body={
          'クレジットカード：チェックアウト時\n銀行振込：予約確定後7日以内'
        }
      />

      {/* 商品の引渡時期 */}
      <LegalTextSection
        title="商品の引渡時期"
        body="チェックイン日（予約時に指定した宿泊日）"
      />

      {/* 返品・キャンセルについて */}
      <LegalTextSection
        title="返品・キャンセルについて"
        body={
          '以下のキャンセル料が発生いたします。\n\n・14日前まで：無料\n・7日前まで：宿泊料金の30%\n・3日前まで：宿泊料金の50%\n・前日：宿泊料金の80%\n・当日・無連絡：宿泊料金の100%'
        }
      />

      {/* 特別条件 */}
      <LegalTextSection
        title="特別条件"
        body={
          '・未成年者の単独でのご予約はお受けしておりません\n・ペットの同伴はご遠慮いただいております'
        }
      />

      {/* 最終更新日 */}
      <div
        className="flex w-full items-center"
        style={{
          padding: '40px 0 0 0',
        }}
      >
        <p
          className="w-full text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 400,
            color: 'var(--ryokan-subtle, #8B7D6B)',
          }}
        >
          最終更新日：2026年2月22日
        </p>
      </div>
    </section>
  )
}
