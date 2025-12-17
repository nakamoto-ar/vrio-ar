import { HeroScene } from "@/components/Experience/HeroScene";
import { BusinessSolutionsHUD } from "@/components/UI/BusinessSolutionsHUD";
import { SoftwareManifesto } from "@/components/UI/SoftwareManifesto";
import { ContentPanel } from "@/components/UI/ContentPanel";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden bg-void-blue text-holographic-white selection:bg-industrial-gold selection:text-void-blue flex flex-col md:block">
      {/* 3D Background - Fixed position to stay behind everything */}
      <div className="fixed inset-0 z-0">
        <HeroScene />
      </div>

      {/* UI Overlay Container - Z 10 to float above 3D */}
      <div className="relative z-10 w-full grow flex flex-col justify-between md:absolute md:inset-0 md:block pointer-events-none">

        {/* Branding Corner - Flow on Mobile, Absolute on Desktop */}
        <div className="relative p-6 pb-0 md:absolute md:top-6 md:left-6 md:p-0 z-50 mix-blend-difference pointer-events-none order-0">
          <span className="font-bold text-xl tracking-widest text-industrial-gold">VRIO._</span>
        </div>

        <ContentPanel />
        <BusinessSolutionsHUD />
        <SoftwareManifesto />
      </div>
    </main>
  );
}
