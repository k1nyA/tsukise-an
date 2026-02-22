type PolicySection = {
  title: string
  body: string[]
}

const policySections: PolicySection[] = [
  {
    title: '1. 個人情報の定義',
    body: [
      '当館が取得する個人情報とは、お名前、ご住所、電話番号、メールアドレス、その他お客様を識別できる情報をいいます。',
    ],
  },
  {
    title: '2. 個人情報の収集',
    body: [
      '当館は、以下の場合に個人情報を収集いたします。',
      '・ご予約のお申し込み時',
      '・お問い合わせフォームのご利用時',
      '・メールマガジンのご登録時',
      '・アンケートへのご回答時',
    ],
  },
  {
    title: '3. 個人情報の利用目的',
    body: [
      '収集した個人情報は、以下の目的で利用いたします。',
      '・ご予約の確認およびご連絡',
      '・サービスの提供および改善',
      '・お問い合わせへのご対応',
      '・当館からのお知らせやキャンペーン情報のご案内',
      '・統計データの作成（個人を特定できない形式）',
    ],
  },
  {
    title: '4. 個人情報の第三者提供',
    body: [
      '当館は、法令に基づく場合を除き、お客様の同意なく個人情報を第三者に提供いたしません。',
    ],
  },
  {
    title: '5. 個人情報の管理',
    body: [
      '当館は、個人情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を講じます。',
    ],
  },
  {
    title: '6. Cookieの使用について',
    body: [
      '当館のウェブサイトでは、サービス向上のためCookieを使用しております。Cookieの使用を希望されない場合は、ブラウザの設定により無効にすることができます。',
    ],
  },
  {
    title: '7. プライバシーポリシーの変更',
    body: [
      '当館は、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは、当ウェブサイトに掲載した時点から効力を生じます。',
    ],
  },
  {
    title: '8. お問い合わせ窓口',
    body: [
      '個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。',
      '',
      '月瀬庵',
      '〒250-0522 神奈川県足柄下郡箱根町元箱根138',
      'TEL: 0460-83-XXXX',
      'Email: info@tsukise-an.jp',
    ],
  },
]

export function PrivacyContentSection() {
  return (
    <section
      className="flex w-full flex-col"
      style={{
        backgroundColor: 'var(--ryokan-bg, #FAF8F3)',
        padding: '80px 200px',
        gap: 48,
      }}
    >
      {/* Introductory paragraph */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          fontWeight: 300,
          color: 'var(--ryokan-dark, #2C2418)',
          lineHeight: 2.2,
        }}
      >
        月瀬庵（以下「当館」）は、お客様の個人情報の保護を重要な責務と考え、以下のとおりプライバシーポリシーを定め、個人情報の適切な取り扱いに努めます。
      </p>

      {/* Policy sections */}
      {policySections.map((section) => (
        <div
          key={section.title}
          className="flex w-full flex-col"
          style={{ gap: 16 }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 18,
              fontWeight: 600,
              color: 'var(--ryokan-dark, #2C2418)',
            }}
          >
            {section.title}
          </h3>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 300,
              color: 'var(--ryokan-subtle, #8B7D6B)',
              lineHeight: 2,
            }}
          >
            {section.body.map((line, index) =>
              line === '' ? (
                <br key={index} />
              ) : (
                <p key={index} style={{ margin: 0 }}>
                  {line}
                </p>
              )
            )}
          </div>
        </div>
      ))}

      {/* Last updated */}
      <p
        className="text-center"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 12,
          fontWeight: 400,
          color: 'var(--ryokan-subtle, #8B7D6B)',
          paddingTop: 40,
        }}
      >
        最終更新日：2026年2月22日
      </p>
    </section>
  )
}
