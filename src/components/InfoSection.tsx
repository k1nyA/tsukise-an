"use client";

import Column from "@/components/column";
import Row from "@/components/row";
import Section from "@/components/section";
import { ArrowRight, Car, TrainFront } from "lucide-react";
import Image from "next/image";
import styles from "./InfoSection.module.css";

const newsItems = [
  { date: "2025.02.15", title: "春の特別懐石「桜花」のご案内" },
  { date: "2025.01.28", title: "ミシュランガイド2025 二つ星を獲得いたしました" },
  { date: "2025.01.10", title: "年末年始の営業について" },
  { date: "2024.12.20", title: "冬の特別プラン「雪月花」のご案内" },
  { date: "2024.11.15", title: "客室「月影」リニューアルのお知らせ" },
];

export default function InfoSection() {
  return (
    <Section className={styles.section} id="access">
      <Row className={styles.inner} alignItems="start">
        <Column className={styles.newsCol}>
          <div className={styles.labelRow}>
            <span className={styles.line} aria-hidden="true" />
            <span className={styles.label}>NEWS</span>
          </div>

          <h2 className={styles.title}>お知らせ</h2>

          <ul className={styles.newsList}>
            {newsItems.map((item) => (
              <li key={item.date + item.title}>
                <span>{item.date}</span>
                <p>{item.title}</p>
              </li>
            ))}
          </ul>

          <a className={styles.link} href="#access">
            一覧を見る
            <ArrowRight size={14} strokeWidth={1.5} />
          </a>
        </Column>

        <Column className={styles.accessCol}>
          <div className={styles.labelRow}>
            <span className={styles.line} aria-hidden="true" />
            <span className={styles.label}>ACCESS</span>
          </div>

          <h2 className={styles.title}>アクセス</h2>

          <p className={styles.address}>
            〒250-0522
            <br />
            神奈川県足柄下郡箱根町元箱根138
            <br />
            <br />
            TEL 0460-83-XXXX
            <br />
            FAX 0460-83-XXXX
          </p>

          <div className={styles.methods}>
            <div>
              <Car size={16} strokeWidth={1.5} />
              <span>お車で：東名高速 御殿場ICより約40分</span>
            </div>
            <div>
              <TrainFront size={16} strokeWidth={1.5} />
              <span>電車で：箱根湯本駅より送迎車にて約30分</span>
            </div>
          </div>

          <div className={styles.mapWrap}>
            <Image
              src="/images/map-reference.png"
              alt="月瀬庵への地図"
              fill
              className={styles.mapImage}
              sizes="(max-width: 980px) 100vw, 560px"
            />
          </div>
        </Column>
      </Row>
    </Section>
  );
}
