import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import fm from "front-matter";
import "gray-matter";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsxs(Fragment, {
    children: [/* @__PURE__ */ jsx("header", {
      className: "p-4 bg-gray-900 text-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto flex justify-between items-center",
        children: [/* @__PURE__ */ jsx("a", {
          href: "/",
          className: "text-xl font-semibold",
          children: "Kennel"
        }), /* @__PURE__ */ jsxs("nav", {
          className: "space-x-4",
          children: [/* @__PURE__ */ jsx("a", {
            href: "/",
            className: "hover:underline",
            children: "Pagrindinis"
          }), /* @__PURE__ */ jsx("a", {
            href: "/dogs",
            className: "hover:underline",
            children: "Šunys"
          }), /* @__PURE__ */ jsx("a", {
            href: "/about",
            className: "hover:underline",
            children: "Apie Mus"
          }), /* @__PURE__ */ jsx("a", {
            href: "/contact",
            className: "hover:underline",
            children: "Kontaktai"
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("main", {
      className: "pt-6 container mx-auto",
      children: /* @__PURE__ */ jsx(Outlet, {})
    }), /* @__PURE__ */ jsx("footer", {
      className: "mt-12 border-t pt-6 pb-4 text-center text-sm text-gray-500",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto space-y-2",
        children: [/* @__PURE__ */ jsxs("div", {
          children: ["Susisiekite", " ", /* @__PURE__ */ jsx("a", {
            href: "mailto:veisykla@example.com",
            className: "text-blue-600 underline",
            children: "veisykla@example.com"
          }), " ", "arba", " ", /* @__PURE__ */ jsx("a", {
            href: "tel:+37061768411",
            className: "text-blue-600 underline",
            children: "+370 617 68411"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: ["© ", (/* @__PURE__ */ new Date()).getFullYear(), ' Šunų veisykla "Au Au". All rights reserved.']
        })]
      })
    })]
  });
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsxs("main", {
    className: "p-8 text-center",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mb-4",
      children: 'Šunų veisykla "Au Au"'
    }), /* @__PURE__ */ jsx("p", {
      className: "text-lg text-gray-700 mb-6",
      children: "Discover our beautiful and healthy dogs, raised with care and purpose."
    }), /* @__PURE__ */ jsx("a", {
      href: "/dogs",
      className: "inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition",
      children: "View Dogs"
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home
}, Symbol.toStringTag, { value: "Module" }));
const dogs = UNSAFE_withComponentProps(function Dogs() {
  const [dogs2, setDogs] = useState([]);
  useEffect(() => {
    async function loadDogs() {
      try {
        const indexRes = await fetch("/dogs/dogs.json");
        const dogList = await indexRes.json();
        const loadedDogs = await Promise.all(dogList.map(async ({
          slug,
          file
        }) => {
          console.log("slug", slug, "file", file);
          const res = await fetch(file);
          const text = await res.text();
          const parsed = fm(text);
          return {
            ...parsed.attributes,
            slug
          };
        }));
        setDogs(loadedDogs);
      } catch (err) {
        console.error("Error loading dog list:", err);
      }
    }
    loadDogs();
  }, []);
  return /* @__PURE__ */ jsx("div", {
    className: "p-6 grid grid-cols-1 md:grid-cols-2 gap-4",
    children: dogs2.map((dog) => /* @__PURE__ */ jsx(Link, {
      to: `/dogs/${dog.slug}`,
      children: /* @__PURE__ */ jsxs("div", {
        className: "p-4 border rounded shadow hover:shadow-md",
        children: [/* @__PURE__ */ jsx("img", {
          src: dog.image,
          alt: dog.name,
          className: "w-full h-48 object-cover"
        }), /* @__PURE__ */ jsx("h2", {
          className: "mt-2 text-xl font-bold",
          children: dog.name
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-600",
          children: dog.breed
        })]
      })
    }, dog.slug))
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dogs
}, Symbol.toStringTag, { value: "Module" }));
const dogs_$slug = UNSAFE_withComponentProps(function DogProfile() {
  const {
    slug
  } = useParams();
  const [data, setData] = useState({});
  const [content, setContent] = useState("");
  useEffect(() => {
    async function loadDog() {
      try {
        const res = await fetch(`/dogs/${slug}.md`);
        if (!res.ok) throw new Error("Failed to load markdown");
        const text = await res.text();
        const parsed = fm(text);
        const normalized = Object.fromEntries(Object.entries(parsed.attributes).map(([key, value]) => [key, value instanceof Date ? value.toISOString().split("T")[0] : value]));
        setData(normalized);
        setContent(parsed.body);
      } catch (err) {
        console.error("Error loading dog profile:", err);
      }
    }
    loadDog();
  }, [slug]);
  return /* @__PURE__ */ jsxs("div", {
    className: "max-w-3xl mx-auto p-6",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold",
      children: data.name
    }), /* @__PURE__ */ jsx("img", {
      src: data.image,
      className: "my-4 w-full rounded-xl"
    }), /* @__PURE__ */ jsxs("ul", {
      className: "text-sm mb-4 text-gray-600",
      children: [/* @__PURE__ */ jsxs("li", {
        children: [/* @__PURE__ */ jsx("strong", {
          children: "Veislė:"
        }), " ", data.breed]
      }), /* @__PURE__ */ jsxs("li", {
        children: [/* @__PURE__ */ jsx("strong", {
          children: "Gimimo data:"
        }), " ", data.dob]
      }), /* @__PURE__ */ jsxs("li", {
        children: [/* @__PURE__ */ jsx("strong", {
          children: "Sveikata:"
        }), " ", data.health]
      })]
    }), /* @__PURE__ */ jsx(ReactMarkdown, {
      children: content
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dogs_$slug
}, Symbol.toStringTag, { value: "Module" }));
const about = UNSAFE_withComponentProps(function Home2() {
  return /* @__PURE__ */ jsxs("main", {
    className: "p-8 text-center",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-4xl font-bold mb-4",
      children: "Apie Mus"
    }), /* @__PURE__ */ jsx("p", {
      className: "text-lg text-gray-700 mb-6",
      children: 'Esame šunų veisykla "Au Au", turime gražių ir sveikų šunų, auginamų su meile ir tikslu.'
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
const contact = UNSAFE_withComponentProps(function Contact() {
  return /* @__PURE__ */ jsxs("div", {
    className: "max-w-4xl mx-auto p-6 space-y-10",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold text-center",
      children: "Kontaktai"
    }), /* @__PURE__ */ jsxs("div", {
      className: "grid grid-cols-1 md:grid-cols-2 gap-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "space-y-4",
        children: [/* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-xl font-semibold",
            children: "Telefonas"
          }), /* @__PURE__ */ jsx("a", {
            href: "tel:+37061768411",
            className: "text-blue-600 underline",
            children: "+370 617 68411"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-xl font-semibold",
            children: "Email"
          }), /* @__PURE__ */ jsx("a", {
            href: "mailto:veisykla@example.com",
            className: "text-blue-600 underline",
            children: "veisykla@example.com"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-xl font-semibold",
            children: "Vieta"
          }), /* @__PURE__ */ jsx("p", {
            children: "Vilniaus g. 123, Vilnius, LT"
          })]
        })]
      }), /* @__PURE__ */ jsx("div", {
        children: /* @__PURE__ */ jsx("iframe", {
          title: "Kennel Location",
          src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2302.6321170649895!2d25.279652815914174!3d54.6871556802806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd9401b98a5e1f%3A0x6f431167a9e2e7c9!2sVilnius!5e0!3m2!1sen!2slt!4v1624521621420!5m2!1sen!2slt",
          width: "100%",
          height: "300",
          style: {
            border: 0
          },
          allowFullScreen: true,
          loading: "lazy",
          referrerPolicy: "no-referrer-when-downgrade",
          className: "rounded shadow"
        })
      })]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-C-YoYuCA.js", "imports": ["/assets/chunk-C37GKA54-DYHsRMZC.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BeaJKJIk.js", "imports": ["/assets/chunk-C37GKA54-DYHsRMZC.js"], "css": ["/assets/root-DgyqJOIW.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-B7TOEFYr.js", "imports": ["/assets/chunk-C37GKA54-DYHsRMZC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dogs": { "id": "routes/dogs", "parentId": "root", "path": "/dogs", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dogs-CnnCB8HT.js", "imports": ["/assets/chunk-C37GKA54-DYHsRMZC.js", "/assets/index-B1Bd-6PH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dogs.$slug": { "id": "routes/dogs.$slug", "parentId": "root", "path": "/dogs/:slug", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dogs._slug-XrrmYfDc.js", "imports": ["/assets/chunk-C37GKA54-DYHsRMZC.js", "/assets/index-B1Bd-6PH.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "/about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-DsAJ3ikn.js", "imports": ["/assets/chunk-C37GKA54-DYHsRMZC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "/contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-Be-I8PXG.js", "imports": ["/assets/chunk-C37GKA54-DYHsRMZC.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-c94bb7b1.js", "version": "c94bb7b1", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/dogs": {
    id: "routes/dogs",
    parentId: "root",
    path: "/dogs",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/dogs.$slug": {
    id: "routes/dogs.$slug",
    parentId: "root",
    path: "/dogs/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "/about",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "/contact",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
