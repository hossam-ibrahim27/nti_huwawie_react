import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("routes/home.tsx"),
    route("clinical-rag", "routes/clinical-rag.tsx"),
    route("eye-detection", "routes/eye-detection.tsx"),
  ]),
] satisfies RouteConfig;