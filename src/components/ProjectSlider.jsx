import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { Star, Code2, ArrowUpRight, Github, Terminal } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center py-40">
      <Motion.div
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-2 border-accent-gold/10 border-t-accent-gold rounded-full"
      />
      <span className="mt-10 text-accent-gold font-black tracking-[0.5em] text-[10px] animate-pulse uppercase">
        Accès aux archives système...
      </span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
      {projects.map((project, index) => (
        <Motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group"
        >
          <div className="glass-card-gold h-full p-8 flex flex-col group-hover:-translate-y-3 transition-all duration-500 border-white/5">
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-bg-dark transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                <Code2 size={32} strokeWidth={1.5} />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] text-accent-gold text-xs font-black border border-white/5">
                <Star size={14} fill="currentColor" />
                {project.stars}
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Terminal size={14} className="text-accent-gold/40" />
                <span className="text-[10px] font-black text-secondary/60 uppercase tracking-widest">Repository {index + 1}</span>
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tight group-hover:text-accent-gold transition-colors font-orbitron uppercase leading-tight">
                {project.name.replace(/-/g, ' ')}
              </h3>
              <p className="text-secondary/70 text-sm leading-relaxed line-clamp-3 font-medium">
                {project.description || "Un projet ambitieux développé avec précision au sein de l'écosystème KERNEL FORGE pour repousser les limites technologiques."}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10 mt-auto">
              {project.topics.length > 0 ? project.topics.slice(0, 3).map(topic => (
                <span key={topic} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase text-accent-chrome tracking-widest">
                  {topic}
                </span>
              )) : (
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase text-accent-chrome tracking-widest">
                  Engineering
                </span>
              )}
              {project.language && (
                <span className="px-3 py-1 rounded-lg bg-accent-gold/10 border border-accent-gold/20 text-[9px] font-black uppercase text-accent-gold tracking-widest">
                  {project.language}
                </span>
              )}
            </div>

            {/* Footer Action */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between pt-6 border-t border-white/5 group/btn"
            >
              <div className="flex items-center gap-3">
                <Github size={18} className="text-secondary group-hover/btn:text-accent-gold transition-colors" />
                <span className="text-[11px] font-black tracking-[0.2em] uppercase group-hover/btn:text-white transition-colors">
                  Initialiser le code source
                </span>
              </div>
              <ArrowUpRight size={20} className="text-accent-gold opacity-40 group-hover/btn:opacity-100 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-all" />
            </a>
          </div>
        </Motion.div>
      ))}
    </div>
  );
};

export default ProjectSlider;
