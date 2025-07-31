import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/dogs", "routes/dogs.tsx",),
    route("/dogs/:slug", "routes/dogs.$slug.tsx"),
    route("/about", "routes/about.tsx"),
    route("/contact", "routes/contact.tsx"),
] satisfies RouteConfig;
