// app/routes/home.tsx
export default function Home() {
  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Šunų veisykla "Au Au"</h1>
      <p className="text-lg text-gray-700 mb-6">
        Discover our beautiful and healthy dogs, raised with care and purpose.
      </p>
      <a
        href="/dogs"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        View Dogs
      </a>
    </main>
  );
}
