import React from 'react';
import { motion as Motion } from 'framer-motion';
import { profileData } from '../data/profile';
import { Cpu, Globe, Box, Settings, Zap, Terminal } from 'lucide-react';

const icons = {
  "IA & AUTOMATION": Cpu,
  "FRONTEND & DESIGN": Globe,
  "3D & VISUALS": Box,
  "BACKEND & CLOUD": Settings,
};

const SkillsTree = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 20 }
    }
  };

  return (
    <div id="skills-section" className="py-12 sm:py-16 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
        <div className="max-w-2xl">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 sm:gap-4 text-accent-gold mb-3 sm:mb-4"
          >
            <Zap size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
            <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase">Ecosystème Technique</span>
          </Motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black gold-gradient uppercase leading-none">
            Arbre de <br />Compétences
          </h2>
        </div>
        <p className="text-secondary max-w-sm text-left md:text-right text-sm sm:text-base font-medium leading-relaxed">
          Une architecture modulaire de savoir-faire, structurée pour l'innovation continue et l'excellence logicielle.
        </p>
      </div>

      <Motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
      >
        {profileData.skillsHierarchy.map((group, idx) => {
          const Icon = icons[group.category] || Terminal;
          return (
            <Motion.div
              key={group.category}
              variants={cardVariants}
              className="glass-card-gold p-6 sm:p-8 md:p-10 group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-gold/5 rounded-full blur-3xl group-hover:bg-accent-gold/10 transition-colors duration-700" />

              <div className="flex items-start gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 flex items-center justify-center text-accent-gold group-hover:scale-110 group-hover:border-accent-gold/40 transition-all duration-700 shrink-0">
                  <Icon size={32} className="sm:w-9 sm:h-9 md:w-10 md:h-10" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <span className="text-[9px] sm:text-[10px] font-black text-accent-gold/60 tracking-widest uppercase">Node 0{idx + 1}</span>
                    <div className="h-[1px] w-4 sm:w-8 bg-accent-gold/20" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-widest uppercase mb-1 sm:mb-2 break-words">{group.category}</h3>
                  <p className="text-secondary text-xs sm:text-sm font-medium">{group.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 relative z-10">
                {group.skills.map((skill) => (
                  <Motion.span
                    key={skill}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      borderColor: 'rgba(212, 175, 55, 0.4)',
                      color: '#d4af37'
                    }}
                    className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5 text-[10px] sm:text-[11px] md:text-[12px] font-bold text-accent-chrome tracking-widest uppercase transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </Motion.span>
                ))}
              </div>

              <div className="absolute top-1/2 -right-4 w-8 h-[1px] bg-accent-gold/10 hidden xl:block group-even:hidden" />
            </Motion.div>
          );
        })}
      </Motion.div>
    </div>
  );
};

export default SkillsTree;
