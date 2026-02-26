"use client";

import Column from "@/components/column";
import Row from "@/components/row";
import Section from "@/components/section";

import { Facebook, Instagram, MessageCircle } from "lucide-react";
import styles from "./Footer.module.css";

const navItems = ["客室", "温泉", "お料理", "過ごし方", "アクセス", "ご予約"];

export default function Footer() {
  return (
    <Section className={styles.footer}>
      <Column className={styles.inner}>
        <Row className={styles.top} alignItems="start" justifyContent="space-between">
          <Column className={styles.brand}>
            <div className={styles.logoRow}>
              <span className={styles.logoMark}>月</span>
              <span className={styles.logoDivider} aria-hidden="true" />
              <span className={styles.logoName}>月瀬庵</span>
            </div>
            <p>〒250-0522 神奈川県足柄下郡箱根町元箱根138</p>
          </Column>

          <nav aria-label="フッターナビゲーション" className={styles.nav}>
            {navItems.map((item) => (
              <a key={item} href="#top" className={item === "ご予約" ? styles.reserve : ""}>
                {item}
              </a>
            ))}
          </nav>
        </Row>

        <hr className={styles.mainDivider} />

        <Row className={styles.middle} alignItems="center" justifyContent="space-between">
          <div className={styles.legal}>
            <a href="#top">プライバシーポリシー</a>
            <a href="#top">特定商取引法に基づく表記</a>
            <a href="#top">サイトマップ</a>
          </div>

          <div className={styles.sns}>
            <a href="#top" aria-label="Instagram">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="#top" aria-label="Facebook">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a href="#top" aria-label="LINE">
              <MessageCircle size={18} strokeWidth={1.5} />
            </a>
          </div>
        </Row>

        <p className={styles.copy}>© 2026 月瀬庵 TSUKISE-AN. All Rights Reserved.</p>
      </Column>
    </Section>
  );
}
