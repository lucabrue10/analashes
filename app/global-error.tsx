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
          background: "#08070b",
          color: "#ece9f3",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontWeight: 300, fontSize: "1.75rem", margin: 0 }}>
            Die Seite konnte nicht geladen werden
          </h1>
          <p style={{ color: "rgba(236,233,243,0.55)", marginTop: "1rem", fontSize: "0.9rem" }}>
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
              background: "linear-gradient(90deg,#7844cf,#a983f7)",
              color: "#fff",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            Neu laden
          </button>
          {error.digest ? (
            <p style={{ marginTop: "2rem", fontSize: "0.65rem", color: "rgba(236,233,243,0.25)" }}>
              Kennung: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
