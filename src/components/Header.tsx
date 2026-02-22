"use client";

import Button from "@/components/button";
import Row from "@/components/row";
import styles from "./Header.module.css";

const navItems = [
  { label: "客室", href: "#rooms" },
  { label: "温泉", href: "#onsen" },
  { label: "お料理", href: "#cuisine" },
  { label: "過ごし方", href: "#stay" },
  { label: "アクセス", href: "#access" },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <Row className={styles.headerInner} alignItems="center" justifyContent="space-between">
        <a className={styles.logoArea} href="#top" aria-label="月瀬庵 トップへ">
          <span className={styles.logoMark}>月</span>
          <span className={styles.logoDivider} aria-hidden="true" />
          <span className={styles.logoTextWrap}>
            <span className={styles.logoMain}>月瀬庵</span>
            <span className={styles.logoSub}>TSUKISE-AN</span>
          </span>
        </a>

        <Row className={styles.navArea} alignItems="center">
          <nav className={styles.navMenu} aria-label="主なメニュー">
            <ul className={styles.navList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className={styles.navLink} href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Button modifiers={styles.reserveButton} label="ご予約" />
        </Row>
      </Row>
    </header>
  );
}
