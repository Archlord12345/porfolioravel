import React from 'react';
import { motion as Motion } from 'framer-motion';
import { profileData } from '../data/profile';
import Certifications from '../components/Certifications';
import Parcours from '../components/Parcours';
import { Award, User, Target, Zap, History } from 'lucide-react';

const AboutPage = () => (
  <section className="max-w-6xl mx-auto py-12 px-6">
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-20 text-center"
    >
      <h2 className="text-4xl md:text-6xl font-black mb-4 gold-gradient uppercase tracking-tighter">Présentation</h2>
      <p className="text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
        Découvrez mon parcours académique, mes expériences professionnelles et ma vision du développement.
      </p>
    </Motion.div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
      <Motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 glass-card p-10 space-y-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold">
            <User size={24} />
          </div>
          <h3 className="text-2xl font-black font-orbitron uppercase tracking-widest">Qui suis-je ?</h3>
        </div>
        <p className="text-secondary text-lg leading-relaxed">
          Je suis <span className="text-white font-bold">{profileData.fullName}</span>, un développeur passionné par l'innovation logicielle et l'intelligence artificielle. Actuellement étudiant à l'Université de Yaoundé I, je consacre mon temps à explorer les frontières du développement Fullstack et de l'automatisation.
        </p>
        <p className="text-secondary text-lg leading-relaxed">
          Mon approche combine rigueur technique et créativité visuelle. À travers <span className="text-accent-gold font-bold">KERNEL FORGE</span>, je cherche à bâtir une communauté d'excellence technologique.
        </p>
      </Motion.div>

      <Motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-card p-10 bg-accent-gold/[0.03] border-accent-gold/10"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold">
            <Target size={24} />
          </div>
          <h3 className="text-2xl font-black font-orbitron uppercase tracking-widest">Focus</h3>
        </div>
        <ul className="space-y-4">
          {profileData.highlights.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-secondary">
              <Zap size={18} className="text-accent-gold mt-1 shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </Motion.div>
    </div>

    {/* Section Parcours */}
    <div className="mb-24">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold">
          <History size={24} />
        </div>
        <h3 className="text-3xl font-black font-orbitron uppercase tracking-widest gold-gradient">Parcours académique & Expérience</h3>
      </div>
      <Parcours />
    </div>

    <div className="mb-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold">
          <Award size={24} />
        </div>
        <h3 className="text-3xl font-black font-orbitron uppercase tracking-widest gold-gradient">Certifications</h3>
      </div>
      <Certifications />
    </div>
  </section>
);

export default AboutPage;
