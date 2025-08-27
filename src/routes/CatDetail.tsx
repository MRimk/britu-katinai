import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCatBySlug, formatDate, ageString } from "../lib/markdown";

export default function CatDetail() {
  const { slug } = useParams();
  const cat = getCatBySlug(slug || "");

  if (!cat) return <p>Katinas nerastas.</p>;

  const imgs =
    cat.images && cat.images.length > 0
      ? cat.images
      : cat.image
      ? [cat.image]
      : [];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <article className="detail">
      {/* Gallery */}
      {imgs.length > 0 && (
        <figure className="gallery">
          <img
            className="hero"
            src={imgs[activeIdx]}
            alt={`${cat.name} — nuotrauka ${activeIdx + 1}`}
          />
          {imgs.length > 1 && (
            <div className="thumbs" role="list">
              {imgs.map((src, i) => (
                <button
                  key={src}
                  className={`thumb ${i === activeIdx ? "is-active" : ""}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Perjungti į nuotrauką ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`${cat.name} miniatiūra ${i + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </figure>
      )}
      <div>
        <h2>{cat.name}</h2>
        <p>
          <strong>Veislė:</strong> {cat.breed}
        </p>
        <p>
          <strong>Lytis:</strong> {cat.gender}
        </p>
        <p>
          <strong>Gimimo data:</strong> {formatDate(cat.birthdate)} (
          {ageString(cat.birthdate)})
        </p>
        {cat.litter && (
          <p>
            <strong>Vada:</strong>{" "}
            <Link to={`/litters/${cat.litter}`}>{cat.litter}</Link>
          </p>
        )}
        {cat.colour && (
          <p>
            <strong>Spalva:</strong> {cat.colour}
          </p>
        )}
        {cat.mother && (
          <p>
            <strong>Motina:</strong> {cat.mother}
          </p>
        )}
        {cat.father && (
          <p>
            <strong>Tėvas:</strong> {cat.father}
          </p>
        )}
        <div className="prose" dangerouslySetInnerHTML={{ __html: cat.html }} />
      </div>
      <p>
        <Link to="/cats">← Atgal į katinų sąrašą</Link>
      </p>
    </article>
  );
}
