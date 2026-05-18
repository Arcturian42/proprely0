type Variant = 'wave' | 'diagonal' | 'curve'

type Props = {
  variant?: Variant
  flip?: boolean
  topColor?: string
  bottomColor?: string
  className?: string
}

const paths: Record<Variant, string> = {
  wave:
    'M0,40 C240,90 480,0 720,30 C960,60 1200,100 1440,50 L1440,120 L0,120 Z',
  diagonal: 'M0,80 L1440,20 L1440,120 L0,120 Z',
  curve: 'M0,60 Q720,120 1440,40 L1440,120 L0,120 Z',
}

export default function SectionDivider({
  variant = 'wave',
  flip = false,
  topColor = 'transparent',
  bottomColor = '#ffffff',
  className = '',
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{ background: topColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className={`block w-full h-[40px] sm:h-[60px] ${flip ? 'rotate-180' : ''}`}
      >
        <path d={paths[variant]} fill={bottomColor} />
      </svg>
    </div>
  )
}
