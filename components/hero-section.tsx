import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"
import { ParticleTextEffect } from "./particle-text-effect"
import { InfiniteSlider } from "./ui/infinite-slider"
import { ProgressiveBlur } from "./ui/progressive-blur"
import { PhotoWall } from "./photo-wall"

export function HeroSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden min-h-screen flex flex-col justify-between">
      <PhotoWall />
      <div className="flex-1 flex items-start justify-center pt-40">
        <ParticleTextEffect words={["镜中人", "生成式AI", "对“人类”的偏见"]} />
      </div>

      <div className="container mx-auto text-center relative z-10 pb-40 mt-20">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-white mb-6 text-balance">
            机器如何理解世界： <span className="text-gray-300">生成式AI中的偏见结构可视化</span>
          </h2>
        </div>
      </div>
    </section>
  )
}
