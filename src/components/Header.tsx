// src/components/Header.tsx
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1rem",
        borderBottom: "1px solid #eee",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Cat Kennel</h1>
      <nav>
        <NavLink to="/" style={{ marginRight: 12 }}>
          Pagrindinis
        </NavLink>
        <NavLink to="/about" style={{ marginRight: 12 }}>
          Apie mus
        </NavLink>
        <NavLink to="/contacts" style={{ marginRight: 12 }}>
          Kontaktai
        </NavLink>
        <NavLink to="/cats" style={{ marginRight: 12 }}>
          Visos katės
        </NavLink>
        <NavLink to="/litters">Vados</NavLink>
      </nav>
    </header>
  );
}
