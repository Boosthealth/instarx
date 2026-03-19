export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", margin: "0 0 0.5rem" }}>404</h1>
      <p style={{ fontSize: "1.25rem", color: "#666" }}>
        Page not found. The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        style={{
          marginTop: "1.5rem",
          color: "#0070f3",
          textDecoration: "underline",
        }}
      >
        Go back home
      </a>
    </div>
  );
}
