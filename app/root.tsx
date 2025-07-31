import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <header className="p-4 bg-gray-900 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-xl font-semibold">
            Kennel
          </a>
          <nav className="space-x-4">
            <a href="/" className="hover:underline">
              Pagrindinis
            </a>
            <a href="/dogs" className="hover:underline">
              Šunys
            </a>
            <a href="/about" className="hover:underline">
              Apie Mus
            </a>
            <a href="/contact" className="hover:underline">
              Kontaktai
            </a>
          </nav>
        </div>
      </header>
      <main className="pt-6 container mx-auto">
        <Outlet />
      </main>
      <footer className="mt-12 border-t pt-6 pb-4 text-center text-sm text-gray-500">
        <div className="container mx-auto space-y-2">
          <div>
            Susisiekite{" "}
            <a
              href="mailto:veisykla@example.com"
              className="text-blue-600 underline"
            >
              veisykla@example.com
            </a>{" "}
            arba{" "}
            <a href="tel:+37061768411" className="text-blue-600 underline">
              +370 617 68411
            </a>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Šunų veisykla "Au Au". All rights
            reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
