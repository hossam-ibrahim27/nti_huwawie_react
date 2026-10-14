import ClinicalDashboard from "~/pages/ClinicalDashboard";

export function meta() {
  return [{ title: "Clinical Assistant | Lumina" }];
}

export default function ClinicalRagRoute() {
  return <ClinicalDashboard />;
}