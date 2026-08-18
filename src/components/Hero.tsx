import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

export const Hero: React.FC<HeroProps> = ({
  subtitle = "Actualités, technologies, idées et ressources sélectionnées pour notre communauté.",
  badgeText = "DIGITAL JOURNAL",
}) => {
  return (
    <section id="hero-section" className="pt-10 sm:pt-16 lg:pt-20 pb-8 sm:pb-12 text-center max-w-6xl 2xl:max-w-7xl mx-auto px-4">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="inline-flex items-center justify-center mb-6 sm:mb-8"
      >
        <span 
          id="hero-badge"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700 bg-white/80 dark:bg-stone-900/80 shadow-2xs backdrop-blur-xs"
        >
          <Sparkles className="w-4 h-4 text-orange-500" />
          {badgeText}
        </span>
      </motion.div>

      {/* Main Title with large responsive typography and orange italic 'derniers' */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        id="hero-main-title"
        className="font-serif-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-black tracking-tight text-stone-950 dark:text-stone-50 leading-[1.08] sm:leading-[1.1] max-w-5xl mx-auto"
      >
        Les <span className="text-[#f97316] italic font-serif-title">derniers</span> articles de<br className="hidden sm:inline" />{' '}
        <span>RAMO BLOG</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        id="hero-subtitle"
        className="mt-5 sm:mt-8 text-lg sm:text-xl md:text-2xl text-stone-600 dark:text-stone-300 font-normal max-w-3xl lg:max-w-4xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </section>
  );
};
