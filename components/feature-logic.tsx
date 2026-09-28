import React, { useState, useEffect } from 'react';
import { RULE_DATA } from './s1-data';

export const FeatureLogic = () => {
  const [logicIdx, setLogicIdx] = useState(0);
  const [isLogicTransitioning, setIsLogicTransitioning] = useState(false);
  const [drawAxis, setDrawAxis] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Mock lift values since they are missing in RULE_DATA snippet
  const getLift = (idx: number) => (1.5 + (idx % 5) * 0.5).toFixed(1);

  useEffect(() => {
    setDrawAxis(true);
    const firstTimer = setTimeout(() => setShowResult(true), 1300);

    const interval = setInterval(() => {
      setIsLogicTransitioning(true);
      setDrawAxis(false);
      setShowResult(false);

      setTimeout(() => {
        setLogicIdx((prev) => (prev + 1) % RULE_DATA.rules.length);
        setIsLogicTransitioning(false);
        
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
      <div className="flex flex-col items-center justify-start text-center max-w-5xl w-full px-4 mx-auto h-full">
        
        <h2 className="text-5xl md:text-7xl mb-6 font-bold text-white">
          挖掘关联规律：A &rarr; B
        </h2>
        <p className="text-base md:text-lg mb-20 text-white/80">
          当 antecedents（前件）出现时，consequence（后件）更容易被生成
        </p>
        
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full relative">
          
          {/* Antecedents A */}
          <div className="overflow-visible min-h-[120px] flex items-center w-full px-4">
            <div className={`flex flex-wrap justify-center gap-x-8 gap-y-6 w-full transition-all duration-500 ${
              isLogicTransitioning ? 'opacity-0 -translate-x-10' : 'opacity-100 translate-x-0'
            }`}>
              {currentRule.antecedents.map((item, i) => (
                <div key={`${logicIdx}-A-${i}`} className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-xl scale-110 text-white">
                  <span className="text-white/60 mr-2">{item[0]}:</span>
                  <span className="font-semibold">{item[1]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Flow Line */}
          <div className={`w-0.5 h-24 bg-gradient-to-b from-white/20 via-[#2979FF] to-white/20 mx-auto transition-all duration-1000 ${drawAxis ? 'h-24 opacity-100' : 'h-0 opacity-0'}`}></div>

          {/* Consequence B & Lift */}
          <div className="overflow-visible min-h-[180px] flex items-center relative w-full justify-center">
            <div 
              className={`relative flex flex-col items-center transition-all duration-700 ${
                showResult ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              <div className="bg-[#2979FF] text-white text-[12px] px-6 py-2 rounded-full font-black shadow-[0_0_20px_rgba(41,121,255,0.5)] animate-bounce flex items-center gap-2 whitespace-nowrap mb-6">
                <span className="opacity-70 text-[10px] font-normal uppercase tracking-wider">
                  Bias Magnified
                </span>
                LIFT &times;{liftValue}
              </div>
              
              <div className="px-8 py-3 rounded-full border border-[#2979FF]/60 bg-[#2979FF]/20 scale-125 shadow-[#2979FF]/15 shadow-2xl whitespace-nowrap text-xl text-white">
                <span className="text-white/60 mr-2">{currentRule.consequents[0][0]}:</span>
                <span className="font-semibold text-[#2979FF]">{currentRule.consequents[0][1]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
