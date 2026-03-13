import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Award, ShieldCheck, Cpu, Code, Workflow, Terminal, BadgeCheck } from 'lucide-react';
import { profileData } from '../data/profile';

const iconMap = {
  Workflow: Workflow,
  Cpu: Cpu,
  Code: Code,
  ShieldCheck: ShieldCheck,
};

const Certifications = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {profileData.certifications.map((cert, index) => {
        const Icon = iconMap[cert.icon] || Award;
        return (
          <Motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="glass-card-gold p-6 sm:p-8 flex flex-col group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/0 via-accent-gold/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 flex items-center justify-center text-accent-gold mb-6 sm:mb-8 group-hover:bg-accent-gold group-hover:text-bg-dark transition-all duration-500 shadow-xl border border-accent-gold/20">
              <Icon size={28} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <BadgeCheck size={12} className="sm:w-3.5 sm:h-3.5 text-accent-gold" />
                <span className="text-[9px] sm:text-[10px] font-black text-accent-gold tracking-[0.15em] sm:tracking-[0.2em] uppercase">Vérifié</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-black mb-1 sm:mb-2 text-white font-orbitron leading-tight min-h-[2.5rem] sm:min-h-[3rem] line-clamp-2">{cert.title}</h3>
              <p className="text-secondary font-bold mb-4 sm:mb-6 text-[10px] sm:text-xs uppercase tracking-widest">{cert.issuer}</p>
            </div>

            <div className="mt-auto pt-4 sm:pt-6 border-t border-white/5 w-full flex justify-between items-center relative z-10">
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[9px] text-accent-gold/40 font-black uppercase tracking-widest">Émis en</span>
                <span className="text-[10px] sm:text-xs text-white font-bold">{cert.date}</span>
              </div>
              <Terminal size={16} className="sm:w-[18px] sm:h-[18px] text-accent-gold/30 group-hover:text-accent-gold transition-colors" />
            </div>

            <div className="absolute -bottom-2 -right-2 text-6xl sm:text-8xl font-black text-white/[0.02] pointer-events-none">
              0{index + 1}
            </div>
          </Motion.div>
        );
      })}
    </div>
  );
};

export default Certifications;
