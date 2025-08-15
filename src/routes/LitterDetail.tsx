import { useParams, Link } from "react-router-dom";
import { getLitters } from "../lib/markdown";

export default function LitterDetail() {
  const { litterId } = useParams();
  const entries = getLitters();
  const entry = entries.find(([id]) => id === litterId);

  if (!entry)
    return (
      <section>
        <h2>Vada {litterId}</h2>
        <p className="muted">Ši vada neegzistuoja.</p>
        <p>
          <Link to="/litters">← Atgal į vadų sąrašą</Link>
        </p>
      </section>
    );

  const [, cats] = entry;

  return (
    <section>
      <h2>Vada {litterId}</h2>
      <div className="grid">
        {cats.map((c) => (
          <Link key={c.slug} to={`/cats/${c.slug}`} className="card">
            <img src={c.image} alt={c.name} />
            <div className="card-body">
              <h3>{c.name}</h3>
              <p>
                {c.breed} • {c.gender}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <p>
        <Link to="/litters">← Atgal į vadų sąrašą</Link>
      </p>
    </section>
  );
}
