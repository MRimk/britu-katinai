// src/components/Footer.tsx
import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#f4f4f4",
        padding: "1rem",
        textAlign: "center",
        marginTop: "2rem",
        borderTop: "1px solid #ddd",
      }}
    >
      <p>© {new Date().getFullYear()} Britų katinai</p>
      <p>
        📧 <a href="mailto:geridarbaitau@gmail.com">geridarbaitau@gmail.com</a>{" "}
        | 📞 <a href="tel:+37068110081">+370 681 10081</a>
      </p>
    </footer>
  );
}
