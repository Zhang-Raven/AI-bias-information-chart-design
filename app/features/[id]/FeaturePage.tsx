"use client"

import { useRouter, useParams } from "next/navigation"
import { FeatureData } from "@/components/feature-data"
import { FeatureExtract } from "@/components/feature-extract"
import { FeatureLogic } from "@/components/feature-logic"
import { FeatureLift } from "@/components/feature-lift"

const featureContents = [
  {
    title: "AI生成样本集",
    content: FeatureData
  },
  {
    title: "图片属性分析",
    content: FeatureExtract
  },
  {
    title: "挖掘关联规律",
    content: FeatureLogic
  },
  {
    title: 'Lift：“偏差放大”的强度',
    content: FeatureLift
  },
  {
    title: "论文复现与再挖掘",
    content: () => (
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
          </div>
        </div>
      </div>
    )
  }
]

export default function FeaturePage() {
  const router = useRouter()
  const params = useParams()
  const featureId = Number(params.id)
  
  const feature = featureContents[featureId]
  
  if (!feature) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Feature not found</p>
      </div>
    )
  }

  const ContentComponent = feature.content

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black/98 to-black/95 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="mb-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20"
        >
          ← 返回
        </button>
        
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            {feature.title}
          </h1>
          
          <div className="mt-8">
            <ContentComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
