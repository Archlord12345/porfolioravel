import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ExternalLink, FolderGit2, MapPin, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import avatar from '../photo/ravel.png';
import Hero3D from '../components/Hero3D';
import { fetchProfile } from '../utils/github';
import { profileData } from '../data/profile';

const HomePage = ({ navigate }) => {
  const MotionDiv = motion.div;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile().then(setProfile);
  }, []);

  const mergedProfile = useMemo(() => ({
    ...profileData,
    bio: profile?.bio || profileData.bio,
    followers: profile?.followers ?? profileData.followers,
    following: profile?.following ?? profileData.following,
    repos: profile?.publicRepos ?? profileData.repos,
    profileUrl: profile?.profileUrl || `https://github.com/${profileData.username}`,
    location: profile?.location || profileData.location,
  }), [profile]);

  return (
    <section className="relative min-h-[82vh] flex flex-col items-center justify-center overflow-hidden">
      <Hero3D />
      <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.3 }} className="absolute inset-0 -z-10 pointer-events-none">
        <div className="w-[760px] h-[760px] bg-accent-gold/10 blur-[120px] rounded-full mx-auto" />
      </MotionDiv>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-3xl p-[2px] bg-gradient-to-br from-accent-gold via-accent-chrome to-accent-gold mx-auto mb-8">
          <div className="w-full h-full rounded-[calc(1.5rem-2px)] overflow-hidden bg-bg-dark">
            <img src={avatar} alt="Ravel" className="w-full h-full object-cover" />
          </div>
        </div>

        <p className="text-accent-gold text-xs tracking-[0.25em] mb-4 uppercase">{mergedProfile.title}</p>
        <h1 className="text-4xl md:text-7xl font-black mb-4 gold-gradient">{mergedProfile.fullName}</h1>
        <p className="text-secondary text-base md:text-xl mb-8 max-w-3xl mx-auto">{mergedProfile.bio}</p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <span className="glass-card px-4 py-2 text-xs flex items-center gap-2"><FolderGit2 size={14} className="text-accent-gold" /> {mergedProfile.repos} repos</span>
          <span className="glass-card px-4 py-2 text-xs flex items-center gap-2"><Users size={14} className="text-accent-gold" /> {mergedProfile.followers} abonnés</span>
          <span className="glass-card px-4 py-2 text-xs flex items-center gap-2"><Users size={14} className="text-accent-gold" /> {mergedProfile.following} abonnements</span>
          <span className="glass-card px-4 py-2 text-xs flex items-center gap-2"><Star size={14} className="text-accent-gold" /> {mergedProfile.stars} étoiles</span>
          <span className="glass-card px-4 py-2 text-xs flex items-center gap-2"><MapPin size={14} className="text-accent-gold" /> {mergedProfile.location}</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={() => navigate('#/projects')} className="px-8 py-3 bg-accent-gold text-bg-dark font-black rounded-xl">Voir mes projets</button>
          <a href={mergedProfile.profileUrl} target="_blank" rel="noreferrer" className="glass-card px-8 py-3 font-bold flex items-center gap-2">GitHub <ExternalLink size={16} /></a>
        </div>

        <div className="glass-card p-4 max-w-3xl mx-auto text-left">
          <p className="text-xs uppercase tracking-[0.22em] text-accent-gold mb-2">Organisation</p>
          <p className="font-semibold">{mergedProfile.organization}</p>
        </div>
      </div>

      <button onClick={() => navigate('#/about')} className="absolute bottom-4 text-accent-gold opacity-70" aria-label="Descendre">
        <ChevronDown size={30} />
      </button>
    </section>
  );
};

export default HomePage;
