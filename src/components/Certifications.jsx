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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            className="glass-card-gold p-8 flex flex-col group relative overflow-hidden"
          >
            {/* Holographic effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/0 via-accent-gold/5 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-gold/10 to-accent-gold/5 flex items-center justify-center text-accent-gold mb-8 group-hover:bg-accent-gold group-hover:text-bg-dark transition-all duration-500 shadow-xl border border-accent-gold/20">
              <Icon size={32} strokeWidth={1.5} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck size={14} className="text-accent-gold" />
                <span className="text-[10px] font-black text-accent-gold tracking-[0.2em] uppercase">Vérifié</span>
              </div>
              <h3 className="text-xl font-black mb-2 text-white font-orbitron leading-tight min-h-[3rem] line-clamp-2">{cert.title}</h3>
              <p className="text-secondary font-bold mb-6 text-xs uppercase tracking-widest">{cert.issuer}</p>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 w-full flex justify-between items-center relative z-10">
              <div className="flex flex-col">
                <span className="text-[9px] text-accent-gold/40 font-black uppercase tracking-widest">Émis en</span>
                <span className="text-xs text-white font-bold">{cert.date}</span>
              </div>
              <Terminal size={18} className="text-accent-gold/30 group-hover:text-accent-gold transition-colors" />
            </div>

            {/* Subtle number indicator */}
            <div className="absolute -bottom-2 -right-2 text-8xl font-black text-white/[0.02] pointer-events-none">
              0{index + 1}
            </div>
          </Motion.div>
        );
      })}
    </div>
  );
};

export default Certifications;
