import { type ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function TiltCard({ children, className = '', intensity = 5 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateY = useSpring(x, { stiffness: 220, damping: 22 })
  const rotateX = useSpring(y, { stiffness: 220, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!wrapperRef.current) return
    const rect = wrapperRef.current.getBoundingClientRect()
    const offsetX = ((e.clientX - rect.left) / rect.width - 0.5) * intensity * 2
    const offsetY = ((e.clientY - rect.top) / rect.height - 0.5) * -intensity * 2
    x.set(offsetX)
    y.set(offsetY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
