import { Link } from "react-router-dom";
import { getLitters, getLitterPhotos } from "../lib/markdown";

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
        {entries.map(([litterId, cats]) => {
          const photos = getLitterPhotos(litterId);
          return (
            <li key={litterId} className="litter-item">
              <div className="litter-row">
                {/* Thumbnail / gallery */}
                {photos.length > 0 ? (
                  <div className="litter-photos">
                    {photos.slice(0, 3).map((src, i) => (
                      <Link key={src} to={`/litters/${litterId}`} className="litter-photo">
                        <img src={src} alt={`Vada ${litterId} — nuotrauka ${i + 1}`} loading="lazy" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="litter-photos placeholder" aria-hidden />
                )}

                {/* Text */}
                <div className="litter-meta">
                  <Link to={`/litters/${litterId}`} className="litter-title">
                    {litterId}
                  </Link>
                  <span className="muted">
                    {" "}
                    — {cats.length} katė{cats.length > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
