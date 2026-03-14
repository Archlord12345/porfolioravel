import React from 'react';
import { motion as Motion } from 'framer-motion';
import { GraduationCap, Briefcase, Book, Calendar, MapPin } from 'lucide-react';
import { profileData } from '../data/profile';

const iconMap = {
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  Book: Book,
};

const Parcours = () => {
  const allParcours = [
    ...profileData.experience.map(item => ({ ...item, type: 'experience' })),
    ...profileData.formation.map(item => ({ ...item, type: 'formation' }))
  ];

  return (
    <div className="space-y-12 relative before:absolute before:inset-0 before:left-8 before:w-[2px] before:bg-gradient-to-b before:from-accent-gold/50 before:via-white/5 before:to-transparent">
      {allParcours.map((item, idx) => {
        const Icon = iconMap[item.icon] || Book;
        return (
          <Motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-20 group"
          >
            {/* Timeline Dot & Icon */}
            <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl bg-bg-dark border border-white/10 flex items-center justify-center text-accent-gold group-hover:border-accent-gold/50 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 z-10">
              <Icon size={24} />
            </div>

            {/* Content Card */}
            <div className="glass-card-gold p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-orbitron">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-accent-gold/80 text-sm font-bold mt-1">
                    {item.type === 'experience' ? <Briefcase size={14} /> : <MapPin size={14} />}
                    <span>{item.company || item.institution}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black text-accent-chrome uppercase tracking-widest whitespace-nowrap">
                  <Calendar size={14} className="text-accent-gold" />
                  {item.period}
                </div>
              </div>

              <p className="text-secondary leading-relaxed text-sm sm:text-base font-medium">
                {item.description}
              </p>
            </div>
          </Motion.div>
        );
      })}
    </div>
  );
};

export default Parcours;
