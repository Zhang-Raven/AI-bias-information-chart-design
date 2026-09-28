import React, { useState, useEffect } from 'react';
import { RULE_DATA } from './s1-data';

export const FeatureLift = () => {
  const [logicIdx, setLogicIdx] = useState(0);
  const [drawAxis, setDrawAxis] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Mock lift values
  const getLift = (idx: number) => parseFloat((1.5 + (idx % 5) * 0.5).toFixed(1));

  useEffect(() => {
    setIsActive(true);
    setDrawAxis(true);
    const firstTimer = setTimeout(() => setShowResult(true), 1300);

    const interval = setInterval(() => {
      setDrawAxis(false);
      setShowResult(false);

      setTimeout(() => {
        setLogicIdx((prev) => (prev + 1) % RULE_DATA.rules.length);
        
        setTimeout(() => {
          setDrawAxis(true);
          setTimeout(() => setShowResult(true), 1300);
        }, 50);
      }, 600);
    }, 6500);

    return () => {
      clearInterval(interval);
      clearTimeout(firstTimer);
    };
  }, []);

  const currentRule = RULE_DATA.rules[logicIdx];
  const liftValue = getLift(logicIdx);

  return (
    <div className="w-full h-full min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-5xl px-6 mx-auto">
        
        <div className="flex-1 flex flex-col items-center justify-center pt-10 pb-8 w-full">
          <h2 className="text-4xl md:text-6xl mb-8 md:mb-12 text-center font-bold text-white">
            Lift：偏差放大的倍数
          </h2>
          
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-2xl border-l-[#2979FF]/40 border-l-8 text-left max-w-2xl relative z-10">
            <div className="text-xl md:text-2xl font-mono mb-4 tracking-tighter text-[#2979FF]">
              Lift = P(B|A) / P(B)
            </div>
            <p className="text-sm md:text-lg text-white/80 leading-relaxed font-light">
              <strong className="text-white font-bold">Lift &gt; 1</strong> 
              {' '}表示前件 A 的出现，使得后件 B 的生成概率相比全局基准被显著放大。这是量化模型"刻板倾向"的核心指标。
            </p>
          </div>
        </div>
        
        <div className="flex-1 w-full flex flex-col items-center justify-start pb-16">
          
          <div className="relative h-64 md:h-80 w-full max-w-3xl mx-auto flex flex-col items-center justify-center mb-8">
            <div className="relative w-full h-32 flex items-end px-4 mt-8 md:mt-12">
              
              <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20"></div>
              
              <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 w-full">
                {[1, 2, 5, 10].map((v, i) => {
                  const pos = [10, 25, 55, 90][i];
                  return (
                    <div 
                      key={v} 
                      className="absolute bottom-0 h-6 w-[1.5px] bg-white/40" 
                      style={{ left: `${pos}%` }}
                    >
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-mono opacity-60 tracking-tighter font-bold text-white">
                        {v}x
                      </span>
                    </div>
                  );
                })}
              </div>

              <div 
                className="absolute bottom-0 w-0.5 bg-gradient-to-t from-[#2979FF] to-white transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)" 
                style={{ left: `${Math.min(95, 10 + (liftValue / 11) * 80)}%`, height: '100px' }}
              >
                <div className="absolute -top-20 md:-top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="font-black text-white text-5xl md:text-7xl italic tracking-tighter drop-shadow-[0_0_20px_rgba(41,121,255,0.9)] leading-none">
                    {liftValue}
                  </div>
                  <div className="text-[9px] md:text-[10px] text-[#2979FF] font-bold uppercase tracking-[0.3em] mt-2 whitespace-nowrap bg-black/40 px-2 py-0.5 rounded-sm">
                    Magnification
                  </div>
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#2979FF] blur-3xl opacity-80"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] z-10"></div>
              </div>
            </div>
          </div>

          <div className={`w-full flex flex-col items-center gap-4 transition-all duration-1000 delay-[1400ms] ${
            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="flex gap-2 flex-wrap justify-center text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium px-4 text-center">
              Antecedents: {currentRule.antecedents.map(a => `${a[0]}:${a[1]}`).join(' + ')}
            </div>
            
            <div className="text-[10px] md:text-xs font-bold text-[#2979FF] uppercase tracking-[0.4em] border-b border-[#2979FF]/20 pb-2">
              &darr; Significantly Amplifies &darr;
            </div>
            
            <div className="text-sm md:text-lg font-black text-white uppercase tracking-widest bg-white/5 px-4 md:px-6 py-2 rounded-full border border-white/10 shadow-lg">
              Consequence: <span className="text-[#2979FF]">{currentRule.consequents[0][1]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
