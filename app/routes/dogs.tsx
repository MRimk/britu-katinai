import { useEffect, useState } from "react";
import fm from "front-matter";
import matter from "gray-matter";
import { Link } from "react-router-dom";

export default function Dogs() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function loadDogs() {
      try {
        const indexRes = await fetch("/dogs/dogs.json");
        const dogList = await indexRes.json();
        const loadedDogs = await Promise.all(
          dogList.map(async ({ slug, file }) => {
            console.log("slug", slug, "file", file);
            const res = await fetch(file);
            const text = await res.text();
            const parsed = fm(text);

            return { ...parsed.attributes, slug };
          })
        );

        setDogs(loadedDogs);
      } catch (err) {
        console.error("Error loading dog list:", err);
      }
    }

    loadDogs();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {dogs.map((dog) => (
        <Link to={`/dogs/${dog.slug}`} key={dog.slug}>
          <div className="p-4 border rounded shadow hover:shadow-md">
            <img
              src={dog.image}
              alt={dog.name}
              className="w-full h-48 object-cover"
            />
            <h2 className="mt-2 text-xl font-bold">{dog.name}</h2>
            <p className="text-gray-600">{dog.breed}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
