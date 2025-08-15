import { Link } from "react-router-dom";
import { getLitters } from "../lib/markdown";

export default function Litters() {
  const entries = getLitters();

  if (entries.length === 0) {
    return (
      <section>
        <h2>Vados</h2>
        <p className="muted">Neturime nei vienos vados.</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Vados</h2>
      <ul className="litter-list">
        {entries.map(([litterId, cats]) => (
          <li key={litterId}>
            <Link to={`/litters/${litterId}`}>{litterId}</Link>
            <span className="muted">
              {" "}
              — {cats.length} katė{cats.length > 1 ? "s" : ""}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
