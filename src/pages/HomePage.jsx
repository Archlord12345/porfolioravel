import React, { useEffect, useState, useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronDown, ExternalLink, MapPin, Github, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import SkillsTree from '../components/SkillsTree';
import TechSpline from '../components/TechSpline';
import { TechIconsGrid, TechBadgesSection } from '../components/TechIcons';
import { fetchProfile } from '../utils/github';
import { profileData } from '../data/profile';
import avatar from '../photo/ravel.png';

const HomePage = ({ navigate }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);

  const mergedProfile = useMemo(() => ({
    ...profileData,
    bio: profile?.bio || profileData.bio,
    followers: profile?.followers ?? profileData.followers,
    repos: profile?.publicRepos ?? profileData.repos,
    location: profile?.location || profileData.location,
  }), [profile]);

  return (
    <div className="relative w-full">
      <Hero3D skills={profileData.skillsHierarchy} navigate={navigate} />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative overflow-hidden pointer-events-none">
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-7xl mx-auto mt-20"
        >
          {/* Profile Photo */}
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent-gold to-yellow-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={avatar}
                alt={mergedProfile.fullName}
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-accent-gold/50 object-cover shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              />
            </div>
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-4"
          >
            <div className="h-[1px] w-4 sm:w-8 bg-accent-gold/40" />
            <p className="text-accent-gold font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase text-[9px] sm:text-xs md:text-sm text-shadow-gold text-center leading-tight">
              {mergedProfile.title}
            </p>
            <div className="h-[1px] w-4 sm:w-8 bg-accent-gold/40" />
          </Motion.div>

          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 sm:mb-8 gold-gradient leading-tight tracking-tight px-2 sm:px-4 max-w-full"
          >
            {mergedProfile.fullName}
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto text-secondary text-sm sm:text-lg md:text-xl lg:text-2xl mb-10 sm:mb-14 leading-relaxed font-medium px-4"
          >
            {mergedProfile.bio}
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 px-4 pointer-events-auto"
          >
            <button
              onClick={() => navigate('#/projects')}
              className="btn-gold group flex items-center justify-center gap-3 sm:gap-4 text-base sm:text-lg touch-manipulation"
            >
              Voir mes projets
              <ArrowRight size={20} className="sm:w-[22px] sm:h-[22px] group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={mergedProfile.links.find(l => l.label === 'GitHub')?.url}
              target="_blank"
              rel="noreferrer"
              className="btn-outline flex items-center justify-center gap-3 sm:gap-4 text-base sm:text-lg touch-manipulation"
            >
              <Github size={20} className="sm:w-[22px] sm:h-[22px]" />
              GitHub
            </a>
          </Motion.div>
        </Motion.div>

        <Motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 text-accent-gold/30 cursor-pointer touch-manipulation hidden sm:flex pointer-events-auto"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Scroll</span>
            <ChevronDown size={28} className="sm:w-8 sm:h-8" />
          </div>
        </Motion.div>
      </section>

      {/* Tech Spline Visualization */}
      <section className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gold-gradient uppercase mb-3 sm:mb-4">
              Univers Technologique
            </h2>
            <p className="text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Explorer l'écosystème dynamique de mes compétences techniques
            </p>
          </Motion.div>
          <TechSpline />
        </div>
      </section>

      {/* Tech Icons Grid */}
      <section className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase mb-2 font-orbitron">
              Domaines de Compétence
            </h3>
            <div className="h-1 w-20 bg-accent-gold rounded-full" />
          </Motion.div>
          <TechIconsGrid />
        </div>
      </section>

      {/* Skills Section with distinct glass transition */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark to-bg-dark pointer-events-none" />
        <div className="relative py-10">
          <SkillsTree />
        </div>
      </section>

      {/* Tech Badges Float */}
      <section className="relative z-10 py-12 sm:py-16 md:py-24 px-4 sm:px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase mb-2 font-orbitron">
              Stack Technologique
            </h3>
            <p className="text-secondary text-sm sm:text-base">Technologies et outils que j'utilise quotidiennement</p>
          </Motion.div>
          <TechBadgesSection />
        </div>
      </section>

      {/* Social & Connect Section */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 sm:mb-16 md:mb-20 gap-8 sm:gap-10">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black gold-gradient uppercase mb-3 sm:mb-4">Connectons-nous</h2>
              <p className="text-secondary text-sm sm:text-base md:text-lg">Suivez mon parcours à travers mes différents réseaux.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
               {mergedProfile.links.map((link) => (
                 <a
                   key={link.label}
                   href={link.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="glass-card px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center gap-2 sm:gap-3 hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-300 touch-manipulation"
                 >
                   <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{link.label}</span>
                   <ExternalLink size={14} className="sm:w-4 sm:h-4 opacity-40" />
                 </a>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { label: 'Projets GitHub', value: mergedProfile.repos, icon: Github, desc: 'Dépôts actifs' },
              { label: 'Contributions', value: '500+', icon: Sparkles, desc: 'Année 2024' },
              { label: 'Suiveurs', value: mergedProfile.followers, icon: Briefcase, desc: 'GitHub Network' },
              { label: 'Localisation', value: 'Yaoundé', icon: MapPin, desc: 'Cameroun' },
            ].map((stat, i) => (
              <Motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card-gold p-6 sm:p-8 md:p-10 group"
              >
                <stat.icon className="mb-4 sm:mb-6 text-accent-gold/40 group-hover:text-accent-gold transition-colors" size={28} strokeWidth={1.5} />
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 sm:mb-2 font-orbitron">{stat.value}</p>
                <p className="text-[10px] sm:text-xs font-black text-accent-gold/60 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-[9px] sm:text-[10px] text-secondary/60 uppercase">{stat.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
