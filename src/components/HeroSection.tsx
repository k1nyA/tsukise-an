"use client";

import Button from "@/components/button";
import Column from "@/components/column";
import Section from "@/components/section";
import { Mouse } from "lucide-react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <Section className={styles.hero} id="top">
      <Image
        src="/images/hero.png"
        alt="芦ノ湖畔の月瀬庵"
        fill
        className={styles.heroBg}
        priority
        quality={100}
        sizes="100vw"
      />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.contentWrap}>
        <Column className={styles.heroContent}>
          <div className={styles.heroLabelRow}>
            <span className={styles.heroLine} aria-hidden="true" />
            <span className={styles.heroLabel}>箱根 芦ノ湖畔</span>
          </div>

          <h1 className={styles.heroHeadline}>
            湖と月、
            <br />
            そして静寂。
          </h1>

          <p className={styles.heroSub}>芦ノ湖の湖面に映る月を眺める、全八室の離れ宿</p>

          <Button
            variant="outline"
            endIcon="chevron-right"
            opticIconShift={false}
            modifiers={styles.heroButton}
            stateLayerOverride={{ bgColor: "currentColor" }}
            label="宿を知る"
          />
        </Column>
      </div>

      <Column className={styles.scrollIndicator} alignItems="center" gap="2xs">
        <Mouse size={20} strokeWidth={1.3} />
        <span>Scroll</span>
      </Column>
    </Section>
  );
}
