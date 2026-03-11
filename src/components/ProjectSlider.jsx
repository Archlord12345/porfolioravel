import React, { useEffect, useState } from 'react';
import { fetchTopRepos } from '../utils/github';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Code2, Cpu, Globe } from 'lucide-react';

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
            <div className="w-16 h-16 border-4 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
            <span className="mt-6 text-accent-gold font-orbitron tracking-[0.5em] text-xs">DECODING REPOSITORIES...</span>
        </div>
    );

    return (
        <section className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                <div>
                    <h2 className="text-4xl md:text-6xl font-black mb-4 gold-gradient">CORE SYSTEMS</h2>
                    <p className="text-secondary max-w-md">Selected prototypes and production-ready modules from my GitHub.</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 glass-card text-xs font-bold font-orbitron text-accent-gold">
                        {projects.length} PROJECTS SYNCED
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative"
                    >
                        {/* Hover Glow */}
                        <div className="absolute inset-x-0 -bottom-1 h-0 group-hover:h-full bg-accent-gold/5 blur-2xl transition-all duration-500 rounded-3xl" />

                        <div className="glass-card p-8 h-full flex flex-col border-white/5 group-hover:border-accent-gold/30 group-hover:bg-white/[0.08] transition-all relative z-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-accent-gold group-hover:scale-110 transition-transform">
                                    <Code2 size={24} />
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-gold/10 text-accent-gold text-xs font-bold border border-accent-gold/20">
                                    <Star size={12} fill="currentColor" />
                                    {project.stars}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-accent-gold transition-colors">
                                {project.name.replace(/-/g, ' ')}
                            </h3>

                            <p className="text-secondary/80 text-sm leading-relaxed mb-10 flex-grow font-light">
                                {project.description || "A deep-dive into autonomous architectures and high-performance engineering."}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-10">
                                {project.topics.slice(0, 3).map(topic => (
                                    <span key={topic} className="text-[9px] font-black px-3 py-1 rounded-md bg-white/5 text-accent-chrome border border-white/10 uppercase tracking-widest">
                                        {topic}
                                    </span>
                                ))}
                                {project.language && (
                                    <span className="text-[9px] font-black px-3 py-1 rounded-md bg-accent-gold/5 text-accent-gold border border-accent-gold/20 uppercase tracking-widest">
                                        {project.language}
                                    </span>
                                )}
                            </div>

                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between group/link py-3 border-t border-white/5 hover:text-accent-gold transition-colors"
                            >
                                <span className="text-xs font-black tracking-[0.2em]">INITIALIZE SOURCE</span>
                                <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default ProjectSlider;
