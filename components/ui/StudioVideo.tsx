"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Beschreibung für Screenreader – das Video hat keinen Ton. */
  label: string;
  className?: string;
};

/**
 * Das Studio-Video im Kopf der Startseite: stumm, in Schleife, ohne
 * Bedienleiste.
 *
 * Handys sind hier der Maßstab. iPhones spielen ein Video nur dann von
 * selbst, wenn es stumm ist und im Text läuft statt im Vollbild – dafür
 * stehen `muted` und `playsinline` direkt im ausgelieferten HTML. Der
 * Effekt hier setzt beides nach dem Laden noch einmal und startet die
 * Wiedergabe, falls der Browser sie beim ersten Versuch verweigert hat
 * (etwa im Stromsparmodus, wo Safari erst bei Sichtkontakt startet).
 */
export function StudioVideo({ label, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const starten = () => {
      const versuch = video.play();
      if (versuch) versuch.catch(() => undefined);
    };

    starten();

    // Stromsparmodus: Safari hält das Video an. Sobald es wieder im Bild
    // ist oder der Tab zurückkommt, starten wir erneut.
    const beobachter = new IntersectionObserver(
      (eintraege) => {
        if (eintraege.some((e) => e.isIntersecting)) starten();
      },
      { threshold: 0.1 },
    );
    beobachter.observe(video);

    document.addEventListener("visibilitychange", starten);
    return () => {
      beobachter.disconnect();
      document.removeEventListener("visibilitychange", starten);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      // eslint-disable-next-line jsx-a11y/media-has-caption -- stummes Bildmaterial ohne Sprache
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/video/studio-poster.jpg"
      aria-label={label}
      disablePictureInPicture
      controlsList="nodownload noplaybackrate"
      tabIndex={-1}
    >
      <source src="/video/studio.mp4" type="video/mp4" />
    </video>
  );
}
