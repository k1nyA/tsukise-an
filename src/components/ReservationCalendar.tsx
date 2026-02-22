"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import styles from "./ReservationCalendar.module.css";

type ReservationCalendarProps = {
  calLink: string;
};

export default function ReservationCalendar({ calLink }: ReservationCalendarProps) {
  const [uiReady, setUiReady] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: "light",
          styles: { branding: { brandColor: "#8B6914" } },
          hideEventTypeDetails: false,
        });
        if (mounted) {
          setUiReady(true);
        }
      } catch (error) {
        if (mounted) {
          setUiError(
            error instanceof Error
              ? error.message
              : "予約カレンダーの初期化に失敗しました。",
          );
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (uiError) {
    return (
      <div className={styles.fallback} role="alert">
        <p>予約カレンダーを表示できませんでした。</p>
        <p className={styles.fallbackDetail}>{uiError}</p>
      </div>
    );
  }

  return (
    <div className={styles.calendarWrap}>
      {!uiReady && <p className={styles.loading}>予約カレンダーを読み込んでいます…</p>}
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "760px", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
