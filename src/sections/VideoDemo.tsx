import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ShieldCheck } from 'lucide-react'

// Vidéo de démonstration hébergée sur Google Drive (partage « tout le monde avec le lien »).
// Format d'embed Drive : /preview dans une iframe.
const VIDEO_EMBED = 'https://drive.google.com/file/d/1aPw00e-ICEX8Kuhil6Eyzk2Z5mLDTejl/preview'

export default function VideoDemo() {
  // L'iframe tierce (Drive) n'est chargée qu'au clic : zéro impact sur le
  // chargement initial / les Core Web Vitals tant que l'utilisateur ne lance pas.
  const [playing, setPlaying] = useState(false)

  return (
    <section id="demo" className="bg-white py-20 sm:py-28 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">Démo en vidéo</p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-5">
            Voyez le cockpit en action
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Découvrez comment Proprely réunit clients, sites, agents, planning, devis et preuve de passage dans un seul écran — conçu avec des dirigeants de sociétés de nettoyage, pour leur quotidien réel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-[0_20px_60px_rgba(2,6,23,0.18)] bg-slate-900"
        >
          {playing ? (
            <iframe
              src={`${VIDEO_EMBED}?autoplay=1`}
              title="Démonstration Proprely — logiciel de gestion pour société de nettoyage"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Lire la vidéo de démonstration Proprely"
              className="group absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 cursor-pointer"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.15] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:22px_22px]"
              />
              <span className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
              <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white/15 backdrop-blur border border-white/30 group-hover:scale-110 group-hover:bg-white/20 transition-[transform,background-color] duration-200 ease-[var(--ease-out)] shadow-lg shadow-black/20">
                <Play size={30} className="text-white ml-1" fill="currentColor" />
              </span>
              <span className="relative text-white font-black text-lg sm:text-xl tracking-tight">Voir la démonstration</span>
              <span className="relative text-blue-100/90 text-sm font-medium">Quelques minutes · sans inscription</span>
            </button>
          )}
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-6 text-sm text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-emerald-500" />
            Conçu en France · Hébergement européen RGPD
          </span>
          <span className="hidden sm:inline text-slate-300">·</span>
          <span>Bêta privée gratuite</span>
        </div>
      </div>
    </section>
  )
}
