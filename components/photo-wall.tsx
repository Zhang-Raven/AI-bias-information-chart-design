"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const PHOTOS = Array.from({ length: 38 }, (_, i) => `/${i + 1}.png`)

export function PhotoWall() {
  const [grid, setGrid] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 })
  const [activePhotos, setActivePhotos] = useState<Map<string, string>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateGrid = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      const cellSize = 80 // Adjust for density
      const cols = Math.ceil(width / cellSize)
      const rows = Math.ceil(height / cellSize)
      setGrid({ rows, cols })
    }

    calculateGrid()
    window.addEventListener("resize", calculateGrid)
    return () => window.removeEventListener("resize", calculateGrid)
  }, [])

  useEffect(() => {
    if (grid.rows === 0 || grid.cols === 0) return

    const interval = setInterval(() => {
      const totalCells = grid.rows * grid.cols
      const updatesCount = 4 // Update multiple cells per tick for speed
      
      setActivePhotos(prev => {
        const next = new Map(prev)
        for(let i=0; i<updatesCount; i++) {
            const randomCellIndex = Math.floor(Math.random() * totalCells)
            const row = Math.floor(randomCellIndex / grid.cols)
            const col = randomCellIndex % grid.cols
            const key = `${row}-${col}`
            
            // High probability to add a photo
            if (Math.random() > 0.1) { 
                const randomPhoto = PHOTOS[Math.floor(Math.random() * PHOTOS.length)]
                next.set(key, randomPhoto)
            } else {
                next.delete(key)
            }
        }
        return next
      })
    }, 50) // Fast interval

    return () => clearInterval(interval)
  }, [grid])

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div 
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: grid.rows * grid.cols }).map((_, i) => {
          const row = Math.floor(i / grid.cols)
          const col = i % grid.cols
          const key = `${row}-${col}`
          const photo = activePhotos.get(key)

          return (
            <div key={key} className="relative w-full h-full overflow-hidden">
              <AnimatePresence mode="popLayout">
                {photo && (
                  <motion.div
                    key={`${key}-${photo}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }} 
                    className="absolute inset-0"
                  >
                    <Image
                      src={photo}
                      alt=""
                      fill
                      className="object-cover blur-[1px]"
                      sizes="150px"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
