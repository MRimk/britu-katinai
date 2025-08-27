import { useParams, Link } from "react-router-dom";
import {
  getLitters,
  getLitterParentPhotos,
  cats as allCats,
} from "../lib/markdown";

function mostCommonName(
  values: Array<string | undefined | null>
): string | undefined {
  const counts = new Map<string, number>();
  for (const v of values) {
    if (!v) continue;
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  let best: string | undefined = undefined;
  let bestN = 0;
  for (const [k, n] of counts) {
    if (n > bestN) {
      best = k;
      bestN = n;
    }
  }
  return best;
}

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

  // Derive parent names from kittens' frontmatter (tolerates missing values)
  const motherName = mostCommonName(cats.map((c) => c.mother));
  const fatherName = mostCommonName(cats.map((c) => c.father));

  // Try to locate parent CatDocs by exact name (to link to their pages if they exist)
  const motherDoc = motherName
    ? allCats.find((c) => c.name === motherName)
    : undefined;
  const fatherDoc = fatherName
    ? allCats.find((c) => c.name === fatherName)
    : undefined;

  const parentPhotos = litterId ? getLitterParentPhotos(litterId) : {};

  return (
    <section>
      <h2>Vada {litterId}</h2>

      {(motherName || fatherName) && (
        <div className="parents grid">
          {/* Mother */}
          {motherName && (
            <div className="card parent-card">
              {parentPhotos.mom ? (
                <Link
                  to={
                    motherDoc
                      ? `/cats/${motherDoc.slug}`
                      : `/litters/${litterId}`
                  }
                >
                  <img
                    src={parentPhotos.mom}
                    alt={`Mama — ${motherName}`}
                    loading="lazy"
                  />
                </Link>
              ) : null}
              <div className="card-body">
                <div className="muted">Mama</div>
                {motherDoc ? (
                  <h3>
                    <Link to={`/cats/${motherDoc.slug}`}>{motherName}</Link>
                  </h3>
                ) : (
                  <h3>{motherName}</h3>
                )}
              </div>
            </div>
          )}

          {/* Father */}
          {fatherName && (
            <div className="card parent-card">
              {parentPhotos.dad ? (
                <Link
                  to={
                    fatherDoc
                      ? `/cats/${fatherDoc.slug}`
                      : `/litters/${litterId}`
                  }
                >
                  <img
                    src={parentPhotos.dad}
                    alt={`Tėvas — ${fatherName}`}
                    loading="lazy"
                  />
                </Link>
              ) : null}
              <div className="card-body">
                <div className="muted">Tėtis</div>
                {fatherDoc ? (
                  <h3>
                    <Link to={`/cats/${fatherDoc.slug}`}>{fatherName}</Link>
                  </h3>
                ) : (
                  <h3>{fatherName}</h3>
                )}
              </div>
            </div>
          )}
        </div>
      )}
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
