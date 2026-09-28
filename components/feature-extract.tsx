import React, { useState, useEffect } from 'react';

const imagePaths = ["/19.png", "/2.png", "/28.png"];

const extractCases = [
  {
    imgIdx: 0,
    tags: [["Gender", "Woman"], ["Expression", "Smiling"], ["Hair", "Long"], ["Attire", "Casual"]]
  },
  {
    imgIdx: 1,
    tags: [["Gender", "Man"], ["Expression", "Neutral"], ["Hair", "Short"], ["Attire", "Formal"]]
  },
  {
    imgIdx: 2,
    tags: [["Gender", "Woman"], ["Expression", "Serious"], ["Hair", "Medium"], ["Attire", "Medical"]]
  }
];

export const FeatureExtract = () => {
  const [extractIdx, setExtractIdx] = useState(0);
  const [visibleTags, setVisibleTags] = useState<number[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    const runCycle = () => {
      setIsScanning(true);
      setVisibleTags([]);
      
      const currentCase = extractCases[extractIdx];
      
      currentCase.tags.forEach((_, i) => {
        setTimeout(() => {
          setVisibleTags(prev => [...prev, i]);
        }, 800 + i * 400);
      });
      
      setTimeout(() => {
        setIsScanning(false);
        setExtractIdx(prev => (prev + 1) % extractCases.length);
      }, 5000);
    };
    
    runCycle();
    const mainInterval = setInterval(runCycle, 5500);
    
    return () => {
      clearInterval(mainInterval);
      setIsScanning(false);
    };
  }, [extractIdx]);

  const currentCase = extractCases[extractIdx];

  return (
    <div className="w-full h-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-6xl w-full">
        
        <div className="order-2 md:order-1">
          <h2 className="text-5xl md:text-7xl mb-6 font-bold text-white">
            AI：从图像中抽取属性
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-12 text-white/80">
            将每张图自动转成结构化属性标签（如性别、表情、职业、肤色等）
          </p>
          
          <div className="flex flex-wrap gap-4 min-h-[150px] content-start">
            {currentCase.tags.map((tag, i) => (
              <div 
                key={`${extractIdx}-${i}`} 
                className={`px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white transform transition-all duration-700 text-lg ${
                  visibleTags.includes(i) 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-4 scale-95'
                }`}
              >
                <span className="text-white/60 mr-2">{tag[0]}:</span>
                <span className="font-semibold text-[#2979FF]">{tag[1]}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`order-1 md:order-2 relative w-full aspect-square max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-opacity duration-500 ${
          isScanning ? 'opacity-100' : 'opacity-40'
        }`}>
          
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ 
              backgroundImage: `url(${imagePaths[currentCase.imgIdx % imagePaths.length]})`,
              filter: isScanning ? 'none' : 'grayscale(1) brightness(0.6)'
            }}
          />
          
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Scanning Line */}
          {isScanning && (
             <div className="absolute top-0 left-0 w-full h-1 bg-[#2979FF] shadow-[0_0_15px_#2979FF] animate-[scan_2s_linear_infinite]"></div>
          )}
          
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-2 py-1 rounded text-[8px] font-mono text-[#2979FF]">
            STATUS: ANALYZING_VISUAL_TENSORS...
          </div>
          
          <div className="absolute bottom-4 left-4 text-[8px] font-mono text-white/30 tracking-widest uppercase">
            Frame ID: 0x{Math.random().toString(16).slice(2, 6).toUpperCase()}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};
