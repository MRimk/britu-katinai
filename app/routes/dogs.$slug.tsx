// app/routes/dogs.$slug.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import fm from "front-matter";

export default function DogProfile() {
  const { slug } = useParams();
  const [data, setData] = useState({});
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadDog() {
      try {
        const res = await fetch(`/dogs/${slug}.md`);
        if (!res.ok) throw new Error("Failed to load markdown");
        const text = await res.text();
        const parsed = fm(text);

        const normalized = Object.fromEntries(
          Object.entries(parsed.attributes).map(([key, value]) => [
            key,
            value instanceof Date ? value.toISOString().split("T")[0] : value,
          ])
        );
        setData(normalized);
        setContent(parsed.body);
      } catch (err) {
        console.error("Error loading dog profile:", err);
      }
    }
    loadDog();
  }, [slug]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <img src={data.image} className="my-4 w-full rounded-xl" />
      <ul className="text-sm mb-4 text-gray-600">
        <li>
          <strong>Veislė:</strong> {data.breed}
        </li>
        <li>
          <strong>Gimimo data:</strong> {data.dob}
        </li>
        <li>
          <strong>Sveikata:</strong> {data.health}
        </li>
      </ul>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
