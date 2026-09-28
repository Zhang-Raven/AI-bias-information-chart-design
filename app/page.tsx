import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AnimatedFeaturesSection } from "@/components/animated-features-section"
import S1 from "@/components/s1"
import { FAQSection } from "@/components/faq-section"
import { AnimatedCTASection } from "@/components/animated-cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <AnimatedFeaturesSection />
        
        {/* S1 Section Title */}
        <div className="relative z-20 py-16 bg-[#050510] text-center">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            标签云视
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto px-4">
            对3.15万的标签数据进行了特征标签提取并计算对应output标签占比与未进行特征提取output标签得出lift。
          </p>
        </div>
        
        <S1 />
        <FAQSection />
        <AnimatedCTASection />
      </main>
      <Footer />
    </div>
  )
}
