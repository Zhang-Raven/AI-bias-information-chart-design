import React, { useState, useEffect } from 'react';
import { PhotoWall } from './photo-wall';

export const FeatureData = () => {
  const [imagesCounter, setImagesCounter] = useState(0);

  useEffect(() => {
    const end = 1281500;
    const duration = 2000;
    const start = performance.now();
    
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setImagesCounter(Math.floor((1 - Math.pow(2, -10 * progress)) * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center overflow-hidden rounded-xl">
      {/* Background PhotoWall */}
      <div className="absolute inset-0 opacity-50">
        <PhotoWall />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h2 className="text-5xl md:text-7xl mb-6 font-bold text-white">图像生成</h2>
        <p className="text-base md:text-lg mb-16 text-white/80">
          使用文生图模型，基于一套受控提示词生成图像样本
        </p>
        
        <div className="bg-black/40 border border-white/10 p-6 rounded-2xl mb-16 flex flex-col md:flex-row items-center gap-6 justify-center backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#2979FF] font-bold tracking-widest uppercase border border-[#2979FF]/30 px-2 py-0.5 rounded">
              Prompt
            </span>
            <span className="text-white/90 font-mono text-sm">
              man · natural_light · medium_skinned
            </span>
          </div>
          
          <div className="h-px w-10 bg-white/10 hidden md:block"></div>
          
          <div className="text-center md:text-left">
            <div className="text-5xl md:text-7xl font-black tracking-tighter inline-block mr-2 text-white">
              {imagesCounter.toLocaleString()}+
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#2979FF] font-bold">
              Samples
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
