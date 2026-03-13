import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Star, Code as Code2, ArrowUpRight, Github, Terminal } from 'lucide-react';
import { fetchTopRepos } from '../utils/github';

const ProjectSlider = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopRepos().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 sm:py-32 md:py-40">
      <Motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-accent-gold/10 border-t-accent-gold rounded-full"
      />
      <span className="mt-6 sm:mt-10 text-accent-gold font-black tracking-[0.4em] sm:tracking-[0.5em] text-[9px] sm:text-[10px] animate-pulse uppercase">
        Accès aux archives système...
      </span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6">
      {projects.map((project, index) => (
        <Motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group"
        >
          <div className="glass-card-gold h-full p-6 sm:p-8 flex flex-col group-hover:-translate-y-3 transition-all duration-500 border-white/5">
            <div className="flex justify-between items-start mb-8 sm:mb-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-bg-dark transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <Code2 size={28} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-white/[0.03] text-accent-gold text-[10px] sm:text-xs font-black border border-white/5">
                <Star size={12} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                {project.stars}
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <Terminal size={12} className="sm:w-3.5 sm:h-3.5 text-accent-gold/40" />
                <span className="text-[9px] sm:text-[10px] font-black text-secondary/60 uppercase tracking-widest">Repository {index + 1}</span>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-3 sm:mb-4 tracking-tight group-hover:text-accent-gold transition-colors font-orbitron uppercase leading-tight">
                {project.name.replace(/-/g, ' ')}
              </h3>
              <p className="text-secondary/70 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium">
                {project.description || "Un projet ambitieux développé avec précision au sein de l'écosystème KERNEL FORGE pour repousser les limites technologiques."}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-8 sm:mb-10 mt-auto">
              {project.topics.length > 0 ? project.topics.slice(0, 3).map(topic => (
                <span key={topic} className="px-2.5 sm:px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[8px] sm:text-[9px] font-black uppercase text-accent-chrome tracking-widest">
                  {topic}
                </span>
              )) : (
                <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[8px] sm:text-[9px] font-black uppercase text-accent-chrome tracking-widest">
                  Engineering
                </span>
              )}
              {project.language && (
                <span className="px-2.5 sm:px-3 py-1 rounded-lg bg-accent-gold/10 border border-accent-gold/20 text-[8px] sm:text-[9px] font-black uppercase text-accent-gold tracking-widest">
                  {project.language}
                </span>
              )}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between pt-4 sm:pt-6 border-t border-white/5 group/btn touch-manipulation"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Github size={16} className="sm:w-[18px] sm:h-[18px] text-secondary group-hover/btn:text-accent-gold transition-colors" />
                <span className="text-[10px] sm:text-[11px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase group-hover/btn:text-white transition-colors">
                  Initialiser le code source
                </span>
              </div>
              <ArrowUpRight size={18} className="sm:w-5 sm:h-5 text-accent-gold opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
            </a>
          </div>
        </Motion.div>
      ))}
    </div>
  );
};

export default ProjectSlider;
