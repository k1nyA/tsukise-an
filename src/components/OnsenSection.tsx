"use client";

import Column from "@/components/column";
import Row from "@/components/row";
import Section from "@/components/section";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "./OnsenSection.module.css";

export default function OnsenSection() {
  return (
    <Section className={styles.section} id="onsen">
      <Row className={styles.row} alignItems="stretch">
        <Column className={styles.content} justifyContent="center">
          <div className={styles.labelRow}>
            <span className={styles.line} aria-hidden="true" />
            <span className={styles.label}>ONSEN</span>
          </div>

          <h2 className={styles.title}>
            湖を望む
            <br />
            湯処
          </h2>

          <p className={styles.description}>
            箱根十七湯のひとつ、
            姥子温泉の源泉を引き入れた
            露天風呂からは、
            四季折々の芦ノ湖が広がります。
            <br />
            <br />
            泉質は単純硫黄泉。
            美肌の湯として古くから知られ、
            身体の芯から温まります。
          </p>

          <a className={styles.link} href="#onsen">
            温泉を見る
            <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </Column>

        <div className={styles.imageWrap}>
          <Image
            src="/images/top-onsen-main.png"
            alt="芦ノ湖を望む露天風呂"
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 56vw"
          />
        </div>
      </Row>
    </Section>
  );
}
