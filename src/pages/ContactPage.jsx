import React from 'react';
import { Mail, Github, Link as LinkIcon } from 'lucide-react';
import { profileData } from '../data/profile';

const ContactPage = () => (
  <section className="max-w-5xl mx-auto py-10">
    <h2 className="text-4xl md:text-6xl font-black mb-8 gold-gradient">Contact</h2>
    <div className="glass-card p-8 md:p-10 space-y-6">
      <p className="text-secondary">Disponible pour collaborer sur des projets web, IA, automation et communautés tech étudiantes.</p>

      <div className="flex flex-wrap gap-4">
        <a href={`mailto:${profileData.email}`} className="px-6 py-3 bg-accent-gold text-bg-dark font-bold rounded-xl inline-flex items-center gap-2">
          <Mail size={16} /> {profileData.email}
        </a>
        <a href={`https://github.com/${profileData.username}`} target="_blank" rel="noreferrer" className="glass-card px-6 py-3 inline-flex items-center gap-2 hover:text-accent-gold">
          <Github size={16} /> GitHub
        </a>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent-gold mb-3">Liens importants</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {profileData.links.map((item) => (
            <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="glass-card px-4 py-3 text-sm inline-flex items-center gap-2 hover:text-accent-gold">
              <LinkIcon size={14} /> {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ContactPage;
