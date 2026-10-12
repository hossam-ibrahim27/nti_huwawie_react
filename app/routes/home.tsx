import Hero from "~/components/Hero";
import Services from "~/components/Services";
import CtaBanner from "~/components/CtaBanner";

export function meta() {
  return [{ title: "VisionAI" }];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CtaBanner />
    </>
  );
}