import React, { useEffect, useState, useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import { ChevronDown, ExternalLink, MapPin, Github, Briefcase, Sparkles, ArrowRight } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import SkillsTree from '../components/SkillsTree';
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
      <Hero3D />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center"
        >
          {/* Avatar Container */}
          <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-12 group">
            <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-3xl group-hover:bg-accent-gold/40 transition-colors duration-1000 animate-pulse" />
            <div className="relative w-full h-full p-1.5 rounded-full bg-gradient-to-tr from-accent-gold via-white/20 to-accent-gold shadow-2xl overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden bg-bg-dark border-4 border-bg-dark/50">
                <img
                  src={avatar}
                  alt={mergedProfile.fullName}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="absolute -bottom-4 right-4 bg-gradient-to-br from-accent-gold to-[#f9f295] text-bg-dark p-4 rounded-2xl shadow-2xl border border-white/20 transform group-hover:rotate-12 transition-transform duration-500">
              <Briefcase size={28} />
            </div>
          </div>

          <Motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-[1px] w-8 bg-accent-gold/40" />
            <p className="text-accent-gold font-black tracking-[0.5em] uppercase text-xs md:text-sm text-shadow-gold">
              {mergedProfile.title}
            </p>
            <div className="h-[1px] w-8 bg-accent-gold/40" />
          </Motion.div>

          <Motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-6xl md:text-9xl font-black mb-8 gold-gradient leading-none tracking-tighter"
          >
            {mergedProfile.fullName.split(' ').map((word, i) => (
              <span key={i} className="block md:inline mr-4 last:mr-0">{word}</span>
            ))}
          </Motion.h1>

          <Motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl mx-auto text-secondary text-lg md:text-2xl mb-14 leading-relaxed font-medium"
          >
            {mergedProfile.bio}
          </Motion.p>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-8"
          >
            <button
              onClick={() => navigate('#/projects')}
              className="btn-gold group flex items-center gap-4 text-lg"
            >
              Voir mes projets
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={mergedProfile.links.find(l => l.label === 'GitHub')?.url}
              target="_blank"
              rel="noreferrer"
              className="btn-outline flex items-center gap-4 text-lg"
            >
              <Github size={22} />
              GitHub
            </a>
          </Motion.div>
        </Motion.div>

        <Motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-accent-gold/30 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Scroll</span>
            <ChevronDown size={32} />
          </div>
        </Motion.div>
      </section>

      {/* Skills Section with distinct glass transition */}
      <section className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark to-bg-dark pointer-events-none" />
        <div className="relative py-10">
          <SkillsTree />
        </div>
      </section>

      {/* Social & Connect Section */}
      <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-black gold-gradient uppercase mb-4">Connectons-nous</h2>
              <p className="text-secondary text-lg">Suivez mon parcours à travers mes différents réseaux.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
               {mergedProfile.links.map((link) => (
                 <a
                   key={link.label}
                   href={link.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="glass-card px-6 py-4 flex items-center gap-3 hover:text-accent-gold hover:border-accent-gold/30 transition-all duration-300"
                 >
                   <span className="text-xs font-black uppercase tracking-widest">{link.label}</span>
                   <ExternalLink size={16} className="opacity-40" />
                 </a>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                className="glass-card-gold p-10 group"
              >
                <stat.icon className="mb-6 text-accent-gold/40 group-hover:text-accent-gold transition-colors" size={32} strokeWidth={1.5} />
                <p className="text-4xl font-black text-white mb-2 font-orbitron">{stat.value}</p>
                <p className="text-xs font-black text-accent-gold/60 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-[10px] text-secondary/60 uppercase">{stat.desc}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
