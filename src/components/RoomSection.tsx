"use client";

import Column from "@/components/column";
import Row from "@/components/row";
import Section from "@/components/section";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import styles from "./RoomSection.module.css";

export default function RoomSection() {
  return (
    <Section className={styles.section} id="rooms">
      <Row className={styles.row} alignItems="stretch">
        <div className={styles.imageWrap}>
          <Image
            src="/images/top-room-main.png"
            alt="月瀬庵の離れ客室"
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 56vw"
          />
        </div>

        <Column className={styles.content} justifyContent="center">
          <div className={styles.labelRow}>
            <span className={styles.line} aria-hidden="true" />
            <span className={styles.label}>ROOMS</span>
          </div>

          <h2 className={styles.title}>
            全八室の
            <br />
            離れ
          </h2>

          <p className={styles.description}>
            一棟独立の離れ形式で、
            芦ノ湖を望む自然の中、
            お二人だけの静寂な時間を
            お過ごしいただけます。
            <br />
            <br />
            全室に源泉掛け流しの
            専用露天風呂を備えております。
          </p>

          <a className={styles.link} href="#rooms">
            客室を見る
            <ArrowRight size={16} strokeWidth={1.5} />
          </a>
        </Column>
      </Row>
    </Section>
  );
}
