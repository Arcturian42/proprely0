import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-400 origin-left pointer-events-none"
    />
  )
}
