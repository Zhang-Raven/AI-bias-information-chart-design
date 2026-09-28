
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Visualizer from './s1-visualizer';
import { ShapeType } from './s1-types';
import { soundManager } from './s1-sound-manager';
import { RULE_DATA } from './s1-data';

const S1: React.FC = () => {
  const [currentShape, setCurrentShape] = useState<ShapeType>('sphere');
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique terms from rules
  const uniqueTerms = useMemo(() => {
    const terms = new Set<string>();
    RULE_DATA.rules.forEach(rule => {
      rule.antecedents.forEach(([attr, val]) => terms.add(`${attr}:${val}`));
      rule.consequents.forEach(([attr, val]) => terms.add(`${attr}:${val}`));
    });
    return Array.from(terms).sort();
  }, []);

  // Identify terms that appear as consequents
  const consequentTerms = useMemo(() => {
    const results = new Set<string>();
    RULE_DATA.rules.forEach(rule => {
      rule.consequents.forEach(([attr, val]) => results.add(`${attr}:${val}`));
    });
    return results;
  }, []);

  useEffect(() => {
    // Artificial delay to show the "connecting" state
    const timer = setTimeout(() => {
      setIsLoading(false);
      soundManager.playBling();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleShapeChange = (shape: ShapeType) => {
    setCurrentShape(shape);
    soundManager.playBling();
  };

  return (
    <div className="relative w-full h-screen bg-[#050510] text-white overflow-hidden select-none">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050510] transition-opacity duration-500">
          <div className="mb-4 text-sm tracking-[0.2em] font-light animate-pulse text-[#6AB3FF]">
            MAPPING AI KNOWLEDGE GRAPH...
          </div>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#2979FF] w-full animate-progress shadow-[0_0_10px_#2979FF]" />
          </div>
        </div>
      )}

      {/* 3D Visualizer */}
      {!isLoading && (
        <div className="absolute inset-0 z-0">
          <Visualizer 
            currentShape={currentShape} 
            terms={uniqueTerms} 
            consequentTerms={consequentTerms}
          />
        </div>
      )}

      {/* Menu Bar - Removed as per request */}
      
      {/* UI Overlay */}
      {!isLoading && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
          <div className="flex gap-6 px-6 py-2 bg-black/40 backdrop-blur-sm rounded-full border border-white/10">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2979FF] shadow-[0_0_8px_#2979FF]"></div>
              <span className="text-[9px] uppercase tracking-widest text-white/50">Outcome</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.3)] border border-dashed border-black/40"></div>
              <span className="text-[9px] uppercase tracking-widest text-white/50">Base Input</span>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 1.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default S1;


