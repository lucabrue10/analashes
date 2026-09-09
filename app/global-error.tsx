"use client";

/** Letzte Instanz: greift auch dann, wenn das Layout selbst fehlschlägt. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="de">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6f0",
          color: "#191512",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontWeight: 300, fontSize: "1.75rem", margin: 0 }}>
            Die Seite konnte nicht geladen werden
          </h1>
          <p
            style={{
              color: "rgba(25,21,18,0.6)",
              marginTop: "1rem",
              fontSize: "0.9rem",
            }}
          >
            Bitte lade die Seite neu.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              border: 0,
              borderRadius: "999px",
              padding: "0.9rem 1.9rem",
              background: "#191512",
              color: "#faf6f0",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            Neu laden
          </button>
          {error.digest ? (
            <p
              style={{
                marginTop: "2rem",
                fontSize: "0.65rem",
                color: "rgba(25,21,18,0.35)",
              }}
            >
              Kennung: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
