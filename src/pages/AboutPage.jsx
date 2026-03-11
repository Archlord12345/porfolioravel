import React from 'react';
import { profileData } from '../data/profile';

const AboutPage = () => (
  <section className="max-w-5xl mx-auto py-10">
    <h2 className="text-4xl md:text-6xl font-black mb-8 gold-gradient">À propos</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-8 space-y-5 text-secondary leading-relaxed">
        <p>
          Je suis <span className="text-white font-semibold">{profileData.fullName}</span>, étudiant en informatique
          et développeur fullstack.
        </p>
        <p>
          Je construis des applications web modernes et je développe aussi des workflows IA avec <span className="text-white">n8n</span>.
        </p>
        <p>
          Je suis aussi le créateur du collectif étudiant <span className="text-accent-gold">KERNEL FORGE</span>.
        </p>
      </div>

      <div className="glass-card p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-gold mb-4">Réalisations</p>
        <ul className="space-y-3 text-secondary list-disc list-inside">
          {profileData.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default AboutPage;
