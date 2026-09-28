"use client"

import { motion } from "framer-motion"
import { useState, type ReactNode } from "react"
import { ChevronDown } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
  embed?: ReactNode
}

const faqs: FAQItem[] = [
  {
    question: "True female fraction = 11%（极低⼥性占⽐）",
    answer:
      "当真实⼥性⽐例很低时，pipeline 出现典型的 minority collapse：模型⼏乎不再预测⼥性（预测⽐例接近 0），⽽且多轮反馈并不会把它拉回真实 11%。",
    embed: (
      <div className="mt-4 flex gap-4 overflow-hidden rounded-lg border border-border/40 bg-card/30">
        <iframe
          title="11% Minority Collapse Visualization (80%)"
          src="/s3.html?interval=0&embed=1&setting=0"
          className="h-[360px] w-1/2 min-w-[320px]"
          loading="lazy"
        />
        <iframe
          title="11% Minority Collapse Visualization (50%)"
          src="/s3.html?interval=0&embed=1&setting=1"
          className="h-[360px] w-1/2 min-w-[320px]"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    question: "True female fraction = 30%（中低占⽐）",
    answer:
      "在 30% 这种“不是极端但仍偏少”的场景，反馈后总体还是向更低的⼥性预测⽐例漂移（偏差加剧/固化）。",
    embed: (
      <div className="mt-4 flex gap-4 overflow-hidden rounded-lg border border-border/40 bg-card/30">
        <iframe
          title="30% Negative Drift Visualization (80%)"
          src="/s3.html?interval=1&embed=1&setting=0"
          className="h-[360px] w-1/2 min-w-[320px]"
          loading="lazy"
        />
        <iframe
          title="30% Negative Drift Visualization (50%)"
          src="/s3.html?interval=1&embed=1&setting=1"
          className="h-[360px] w-1/2 min-w-[320px]"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    question: "True female fraction = 50%（基线公平，但看“是否会⾃发产⽣偏差”）",
    answer:
      "在真实 50% 的情况下，系统仍然把预测推向 60%+，这说明偏差不是仅在“已有失衡”时被放大，⽽是可能被反馈机制主动⽣成（bias generation）。",
    embed: (
      <div className="mt-4 flex gap-4 overflow-hidden rounded-lg border border-border/40 bg-card/30">
        <iframe
          title="50% Bias Generation Visualization (80%)"
          src="/s3.html?interval=2&embed=1&setting=0"
          className="h-[360px] w-1/2 min-w-[320px]"
          loading="lazy"
        />
        <iframe
          title="50% Bias Generation Visualization (50%)"
          src="/s3.html?interval=2&embed=1&setting=1"
          className="h-[360px] w-1/2 min-w-[320px]"
          loading="lazy"
        />
      </div>
    ),
  },
  {
    question: "True female fraction = 71%（⼥性占⽐⾼，但看是否“多数类锁死”）",
    answer:
      "当⼥性是多数类时，反馈会产⽣ majority lock-in / saturation：预测⽐例被推到接近95%+，远超真实 71%，并且多轮后很难回落。",
    embed: (
      <div className="mt-4 flex gap-4 overflow-hidden rounded-lg border border-border/40 bg-card/30">
        <iframe
          title="71% Majority Growth Visualization (80%)"
          src="/s3.html?interval=3&embed=1&setting=0"
          className="h-[360px] w-1/2 min-w-[320px]"
          loading="lazy"
        />
        <iframe
          title="71% Majority Growth Visualization (50%)"
          src="/s3.html?interval=3&embed=1&setting=1"
          className="h-[360px] w-1/2 min-w-[320px]"
          loading="lazy"
        />
      </div>
    ),
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Algorithmic Feedback Loops
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            监测迭代训练中的偏见放大。当模型使用自身的预测作为标签时，性别比例预测会逐渐偏离真实基准，展示出少数类塌缩或偏见生成的演变轨迹。
          </motion.p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border/20 rounded-lg bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  {faq.embed}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          
          
        </motion.div>
      </div>
    </section>
  )
}
