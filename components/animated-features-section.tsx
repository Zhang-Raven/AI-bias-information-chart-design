"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { FeatureData } from "./feature-data"
import { FeatureExtract } from "./feature-extract"
import { FeatureLogic } from "./feature-logic"
import { FeatureLift } from "./feature-lift"

interface BentoCardProps {
  title: string
  value: React.ReactNode
  subtitle?: string
  colors: string[]
  delay: number
  onClick?: () => void
}

const BentoCard: React.FC<BentoCardProps> = ({ title, value, subtitle, colors, delay, onClick }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-black rounded-lg border border-border/20 group cursor-pointer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      style={{
        filter: "url(#noise)",
      }}
      onClick={onClick}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />

      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
            mixBlendMode: "overlay",
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full animate-pulse"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 1px, transparent 1px),
                             radial-gradient(circle at 75% 75%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "48px 48px, 64px 64px",
            backgroundPosition: "0 0, 24px 24px",
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-80 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full animate-[shine_4s_ease-in-out_infinite] w-[200%]" />
      </div>

      <motion.div
        className="relative z-10 p-3 sm:p-5 md:p-8 text-foreground backdrop-blur-sm h-full flex flex-col justify-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3 className="text-sm sm:text-base md:text-lg text-foreground mb-2" variants={item}>
          {title}
        </motion.h3>
        <motion.p className="text-base sm:text-2xl md:text-3xl font-medium mb-4 text-foreground" variants={item}>
          {value}
        </motion.p>
        {subtitle && (
          <motion.p className="text-sm text-foreground/80" variants={item}>
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  )
}

export function AnimatedFeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)

  const featureDetails = [
    {
      title: "AI生成样本集",
      content: <FeatureData />
    },
    {
      title: "图片属性分析",
      content: <FeatureExtract />
    },
    {
      title: "挖掘关联规律",
      content: <FeatureLogic />
    },
    {
      title: "Lift ：“偏差放大”的强度",
      content: <FeatureLift />
    },
    {
      title: "论文复现与再挖掘",
      content: (
        <div className="w-full h-full min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center p-6">
          <div className="max-w-6xl w-full">
            <h2 className="text-5xl md:text-7xl mb-6 font-bold text-white text-center">
              论文复现与再挖掘
            </h2>
            <p className="text-base md:text-lg mb-12 text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
              使用机器学习方法在大规模数据集imSitu上进行了16轮测试，挖掘偏见结构
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#2979FF] shadow-[0_0_10px_rgba(41,121,255,0.8)]"></div>
                  <h4 className="text-xl font-bold text-white">性别偏见显著放大</h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  AI视觉标注数据在性别偏见维度获得显著放大效应，Lift值普遍超过2.0，表明模型对性别刻板印象的强化作用。
                </p>
              </div>
              
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#2979FF] shadow-[0_0_10px_rgba(41,121,255,0.8)]"></div>
                  <h4 className="text-xl font-bold text-white">动态稳定性分析</h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  虽然存在一定的动态不稳定性，但整体偏见模式符合预测界限，说明系统性偏见具有可预测性和可度量性。
                </p>
              </div>
              
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#2979FF] shadow-[0_0_10px_rgba(41,121,255,0.8)]"></div>
                  <h4 className="text-xl font-bold text-white">16轮测试验证</h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  通过16轮独立测试，确保了结果的可重复性和统计显著性，为偏见量化提供了坚实的实证基础。
                </p>
              </div>
              
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-[#2979FF] shadow-[0_0_10px_rgba(41,121,255,0.8)]"></div>
                  <h4 className="text-xl font-bold text-white">大规模数据集支撑</h4>
                </div>
                <p className="text-white/70 leading-relaxed">
                  基于imSitu数据集的12.5万+标注样本，配合3.1万生成样本，保证了分析的全面性和代表性。
                </p>
              </div>
            </div>
            
            <div className="p-8 bg-gradient-to-r from-[#2979FF]/20 to-transparent rounded-2xl border border-[#2979FF]/30 backdrop-blur-xl">
              <h5 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#2979FF]">⚡</span> 关键发现
              </h5>
              <p className="text-white/80 leading-relaxed text-lg">
                研究揭示了生成式AI系统在视觉输出中系统性地强化了社会刻板印象，特别是在性别与职业关联方面。这种偏见不仅存在，而且通过Lift指标量化后，显示出明显的放大效应，对社会认知具有潜在的深远影响。
              </p>
              {/* 复现与反馈可视化分析卡片：嵌入HTML主要内容 */}
              <div className="mt-8 w-full rounded-2xl border border-[#00d2ff]/30 bg-[#0a0a0a] p-0 overflow-hidden shadow-xl">
                <iframe
                  src="/s0_03(1).html"
                  title="数据反馈回路：imSitu 偏见挖掘与反馈可视化"
                  style={{ width: '100%', minHeight: 900, border: 'none', borderRadius: '16px', background: '#0a0a0a' }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <section id="features" className="py-20 px-4 bg-black">
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence baseFrequency="0.4" numOctaves="2" result="noise" seed="2" type="fractalNoise" />
            <feColorMatrix in="noise" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0.02 0.04 0.06" />
            </feComponentTransfer>
            <feComposite operator="over" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            数据背景
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            基于两大数据集——包含<span style={{ color: "#2979FF" }}>12.5万</span>+<span style={{ color: "#2979FF" }}>3.1万</span>标记数据与生成式AI提示的PromptBase，我们深入挖掘生成式AI系统中的偏见结构，揭示其对社会认知的潜在影响。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <BentoCard
            title="AI生成样本集"
            value={<><span style={{ color: "#2979FF" }}>12.5万</span>+3.15万张AI图像</>}
            subtitle="imSitu数据集+职业表输入给文生图模型，生成图像作为分析样本库"
            colors={["#1c1c1c", "#2979FF", "#181818"]}
            delay={0.2}
            onClick={() => setSelectedFeature(0)}
          />
          <div className="md:col-span-2">
            <BentoCard
              title="图片属性分析"
              value="提取多个结构化属性（A：B）"
              subtitle="属性涵盖多方面因素，使得后续分析可以按“属性组合”展开"
              colors={["#171717", "#2979FF", "#1b1b1b"]}
              delay={0.4}
              onClick={() => setSelectedFeature(1)}
            />
          </div>
          <div className="md:col-span-2">
            <BentoCard
              title="挖掘关联规律"
              value={<>“条件<span style={{ color: "#2979FF" }}>Antecedents</span> 集合→ 结果 <span style={{ color: "#2979FF" }}>Consequence</span>倾向”</>}
              subtitle="在属性数据中寻找稳定的共现模式，用于分析AI偏见的系统性表现"
              colors={["#1a1a1a", "#2979FF", "#1f1f1f"]}
              delay={0.6}
              onClick={() => setSelectedFeature(2)}
            />
          </div>
          <BentoCard
            title="Lift ：“偏差放大”的强度"
            value={<span style={{ color: "#2979FF" }}>Lift = P(B｜A) / P(B)）</span>}
            subtitle="Lift 越高，表示该结果在满足 A 的样本中越“集中”、越“突出”"
            colors={["#151515", "#2979FF", "#1d1d1d"]}
            delay={0.8}
            onClick={() => setSelectedFeature(3)}
          />
          <div className="md:col-span-3">
            <BentoCard
              title="论文复现与再挖掘"
              value={<>使用机器学习方法在大规模数据集imSitu上进行了<span style={{ color: "#2979FF" }}>16轮</span>测试挖掘偏见结构</>}
              subtitle="AI视觉标注数据偏见在性别偏见中获得显著放大，随存在动态不稳定但符合界限预测"
              colors={["#131313", "#2979FF", "#191919"]}
              delay={1}
              onClick={() => setSelectedFeature(4)}
            />
          </div>
        </div>
      </div>

      <Dialog open={selectedFeature !== null} onOpenChange={(open) => !open && setSelectedFeature(null)}>
        <DialogContent className="!top-0 !left-0 !translate-x-0 !translate-y-0 !w-screen !h-screen !max-w-none !max-h-none !rounded-none !p-0 !gap-0 !flex !flex-col bg-gradient-to-br from-black via-black/98 to-black/95 border-2 border-white/20 text-white backdrop-blur-2xl overflow-hidden shadow-[0_0_80px_rgba(41,121,255,0.35)]">
          <DialogHeader className="px-8 pt-8 pb-6 flex-shrink-0 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
            <DialogTitle className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(41,121,255,0.5)]">
              {selectedFeature !== null && featureDetails[selectedFeature].title}
            </DialogTitle>
          </DialogHeader>
          <div className="px-8 py-8 flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
            <div className="max-w-7xl mx-auto">
              {selectedFeature !== null && featureDetails[selectedFeature].content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
