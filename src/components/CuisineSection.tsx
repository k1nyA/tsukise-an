"use client";

import Column from "@/components/column";
import Grid from "@/components/grid";
import Section from "@/components/section";
import Image from "next/image";
import styles from "./CuisineSection.module.css";

const dishes = [
  {
    title: "八寸",
    description: "旬の食材を彩り豊かに",
    image: "/images/top-cuisine-hassun.png",
    alt: "八寸",
  },
  {
    title: "焼物",
    description: "相模湾直送の炭火焼き",
    image: "/images/top-cuisine-yakimono.png",
    alt: "焼物",
  },
  {
    title: "水菓子",
    description: "季節を映す和の甘味",
    image: "/images/top-cuisine-mizugashi.png",
    alt: "水菓子",
  },
];

export default function CuisineSection() {
  return (
    <Section className={styles.section} id="cuisine">
      <Column className={styles.inner} alignItems="center">
        <div className={styles.labelRow}>
          <span className={styles.line} aria-hidden="true" />
          <span className={styles.label}>CUISINE</span>
          <span className={styles.line} aria-hidden="true" />
        </div>

        <h2 className={styles.title}>旬を紡ぐ、月替わり懐石</h2>

        <p className={styles.description}>
          相模湾の新鮮な海の幸と、箱根の山の恵みを
          <br />
          料理長が一皿一皿、丁寧にお仕立ていたします。
          <br />
          ミシュラン二つ星の評価を賜りました。
        </p>

        <Grid className={styles.grid} columns={3} gap="lg">
          {dishes.map((dish) => (
            <Column key={dish.title} className={styles.dishCard} alignItems="center">
              <div className={styles.dishMedia}>
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  className={styles.dishImage}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
              </div>
              <h3>{dish.title}</h3>
              <p>{dish.description}</p>
            </Column>
          ))}
        </Grid>
      </Column>
    </Section>
  );
}
