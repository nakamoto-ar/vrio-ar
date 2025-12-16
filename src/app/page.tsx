import { HeroScene } from "@/components/Experience/HeroScene";
import { BusinessSolutionsHUD } from "@/components/UI/BusinessSolutionsHUD";
import { SoftwareManifesto } from "@/components/UI/SoftwareManifesto";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-void-blue text-holographic-white selection:bg-industrial-gold selection:text-void-blue">
      {/* 3D Background */}
      <HeroScene />

      {/* UI Overlay */}
      <BusinessSolutionsHUD />
      <SoftwareManifesto />

      {/* Vignette / Grain overlay if not handled by post-processing, but it is. */}
      {/* Branding Corner */}
      <div className="absolute top-6 left-6 z-20 mix-blend-difference pointer-events-none">
        <span className="font-bold text-xl tracking-widest text-industrial-gold">VRIO._</span>
      </div>
    </main>
  );
}
