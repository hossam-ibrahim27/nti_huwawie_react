import ClinicalDashboard from "~/pages/ClinicalDashboard";

export function meta() {
  return [{ title: "Clinical Assistant | VisionAI" }];
}

export default function ClinicalRagRoute() {
  return <ClinicalDashboard />;
}