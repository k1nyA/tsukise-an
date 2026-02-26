"use client";

import Column from "@/components/column";
import Section from "@/components/section";

import styles from "./ConceptSection.module.css";

export default function ConceptSection() {
  return (
    <Section className={styles.section}>
      <Column className={styles.inner} alignItems="center">
        <div className={styles.labelRow}>
          <hr className={styles.decorLine} />
          <span className={styles.label}>CONCEPT</span>
          <hr className={styles.decorLine} />
        </div>

        <h2 className={styles.title}>百三十年、変わらぬもてなし。</h2>

        <p className={styles.body}>
          明治二十八年の創業以来、月瀬庵は箱根・芦ノ湖畔に静かに佇んでまいりました。
          湖面に映る月の美しさに心を奪われた初代が、この地に宿を開いたのが始まりです。
          <br />
          <br />
          木漏れ日の差す回廊、苔むした石庭、そして湯けむりの向こうに広がる芦ノ湖の眺め。
          時の流れを忘れ、ただ静かに自分に還る — そんな時間をお約束いたします。
        </p>

        <span className={styles.tailLine} aria-hidden="true" />
      </Column>
    </Section>
  );
}
