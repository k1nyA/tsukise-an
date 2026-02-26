"use client";

import Column from "@/components/column";
import Section from "@/components/section";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import styles from "./StaySection.module.css";

const timeline = [
  {
    hour: "15:00",
    title: "お出迎え",
    description: "抹茶と季節の和菓子で\nお迎えいたします",
    image: "/images/top-stay-1500.png",
    alt: "抹茶と和菓子",
  },
  {
    hour: "17:00",
    title: "庭園散策",
    description: "回遊式庭園と苔庭を\nゆったりと巡ります",
    image: "/images/top-stay-1700.jpg",
    alt: "庭園散策",
  },
  {
    hour: "18:30",
    title: "夕食・懐石",
    description: "個室にて月替わりの\n懐石料理をお楽しみに",
    image: "/images/top-stay-1830.png",
    alt: "夕食懐石",
  },
  {
    hour: "21:00",
    title: "月見の湯",
    description: "月明かりに照らされた\n露天風呂で至福のひとときを",
    image: "/images/top-stay-2100.png",
    alt: "露天風呂",
  },
  {
    hour: "08:00",
    title: "朝食",
    description: "箱根の朝を感じる\n和の朝ごはん",
    image: "/images/top-stay-0800.png",
    alt: "朝食",
  },
  {
    hour: "11:00",
    title: "お見送り",
    description: "芦ノ湖の景色を胸に\nお帰りの途へ",
    image: "/images/top-stay-1100.png",
    alt: "お見送り",
  },
];

function StayCard(props: (typeof timeline)[number]) {
  return (
    <Column className={styles.timelineItem} alignItems="center">
      <div className={styles.hour}>{props.hour}</div>
      <div className={styles.imageWrap}>
        <Image
          src={props.image}
          alt={props.alt}
          fill
          className={styles.image}
          sizes="(max-width: 900px) 100vw, (max-width: 1280px) 45vw, 380px"
        />
      </div>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </Column>
  );
}

export default function StaySection() {
  return (
    <Section className={styles.section} id="stay">
      <Column className={styles.inner} alignItems="center">
        <div className={styles.labelRow}>
          <span className={styles.line} aria-hidden="true" />
          <span className={styles.label}>EXPERIENCE</span>
          <span className={styles.line} aria-hidden="true" />
        </div>

        <h2 className={styles.title}>月瀬庵での過ごし方</h2>

        <div className={styles.timelineGrid}>
          {timeline.slice(0, 4).map((item) => (
            <StayCard key={item.hour} {...item} />
          ))}
        </div>

        <div className={styles.dividerRow}>
          <Separator className={styles.dividerLine} />
          <span>翌 朝</span>
          <Separator className={styles.dividerLine} />
        </div>

        <div className={styles.timelineGridSecondary}>
          {timeline.slice(4).map((item) => (
            <StayCard key={item.hour} {...item} />
          ))}
        </div>
      </Column>
    </Section>
  );
}
