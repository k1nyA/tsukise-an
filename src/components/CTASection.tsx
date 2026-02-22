"use client";

import Button from "@/components/button";
import Column from "@/components/column";
import Row from "@/components/row";
import Section from "@/components/section";
import Image from "next/image";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <Section className={styles.section}>
      <Image
        src="/images/cta.png"
        alt="月瀬庵の夜景"
        fill
        className={styles.bg}
        sizes="100vw"
      />
      <div className={styles.overlay} aria-hidden="true" />

      <Column className={styles.content} alignItems="center">
        <Column className={styles.intro} alignItems="center">
          <span className={styles.line} aria-hidden="true" />
          <h2 className={styles.heading}>
            あなたの特別な一日を、
            <br />
            月瀬庵でお過ごしください。
          </h2>
          <p className={styles.description}>ご予約・お問い合わせはお電話またはオンラインにて承ります</p>
        </Column>

        <Row className={styles.actions} alignItems="center">
          <Button modifiers={styles.primaryButton} label="オンライン予約" />
          <Button
            variant="outline"
            modifiers={styles.secondaryButton}
            stateLayerOverride={{ bgColor: "currentColor" }}
            label="0460-83-XXXX"
          />
        </Row>
      </Column>
    </Section>
  );
}
