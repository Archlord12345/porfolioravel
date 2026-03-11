import React from 'react';
import Hero3D from './components/Hero3D';
import ProjectSlider from './components/ProjectSlider';
import { motion } from 'framer-motion';
import avatar from './photo/ravel.png';
import { ChevronDown, Mail, Github, Globe, Terminal } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-screen selection:bg-accent-gold/30 selection:text-white">
      <Hero3D />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center backdrop-blur-sm bg-bg-dark/20">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-accent-gold flex items-center justify-center font-black text-bg-dark text-xl group-hover:rotate-12 transition-transform">
            R
          </div>
          <span className="font-orbitron font-bold tracking-tighter text-xl hidden md:block">NGHOMSI.</span>
        </motion.div>

        <div className="flex gap-4">
          <a href="https://github.com/Archlord12345" target="_blank" className="p-2 glass-card hover:text-accent-gold transition-colors">
            <Github size={20} />
          </a>
          <button className="px-6 py-2 glass-card text-sm font-bold tracking-widest hover:bg-accent-gold hover:text-bg-dark transition-all">
            HAVE A PROJECT?
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none"
        >
          <div className="w-[800px] h-[800px] bg-accent-gold/5 blur-[120px] rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="relative mb-12 flex flex-col items-center"
        >
          {/* Main Avatar Display */}
          <div className="relative group">
            <div className="absolute inset-0 bg-accent-gold/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl p-[2px] bg-gradient-to-br from-accent-gold via-accent-chrome to-accent-gold rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <div className="w-full h-full rounded-[calc(1.5rem-2px)] overflow-hidden bg-bg-dark">
                <img src={avatar} alt="Ravel" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
              </div>
            </div>

            {/* Design Accents */}
            <div className="absolute -top-4 -right-4 w-12 h-12 glass-card flex items-center justify-center text-accent-gold animate-bounce">
              <Terminal size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-block px-4 py-1 glass-card text-[10px] tracking-[0.4em] text-accent-gold mb-6 border-accent-gold/20 uppercase">
            Fullstack Alchemist • AI Architect
          </div>

          <h1 className="text-6xl md:text-9xl font-black mb-8 gold-gradient drop-shadow-2xl leading-tight">
            RAVEL<br className="md:hidden" /> NGHOMSI
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-secondary px-4 mb-12 leading-relaxed opacity-80 mix-blend-lighten">
            Building intelligent workflows and immersive ecosystems.
            Creator of <span className="text-accent-gold font-bold">KERNEL FORGE</span>.
            Bridging the gap between human intuition and machine efficiency.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-4 bg-accent-gold text-bg-dark font-black tracking-widest text-sm rounded-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
            >
              EXPLORE PROTOYPES
            </button>
            <button className="px-10 py-4 glass-card text-sm font-bold tracking-widest hover:border-accent-gold transition-colors">
              GET IN TOUCH
            </button>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-accent-gold opacity-50 cursor-pointer"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Projects Section */}
      <div id="projects" className="relative z-10 pt-32 pb-40 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark/80 to-bg-dark pointer-events-none" />
        <ProjectSlider />
      </div>

      {/* Bottom CTA */}
      <section className="relative z-10 py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-accent-gold/5 -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 gold-gradient">READY TO FORGE?</h2>
          <p className="text-secondary mb-12 text-lg">Let's collaborate on your next groundbreaking AI or Web project.</p>
          <div className="flex justify-center gap-6">
            <a href="mailto:ravel@example.com" className="flex items-center gap-2 text-accent-gold font-bold hover:gap-4 transition-all uppercase tracking-widest">
              Send an owl <Mail size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 px-10 flex flex-col md:flex-row justify-between items-center gap-8 text-secondary/40 text-[10px] tracking-[0.5em] uppercase">
        <div>© 2026 RAVEL NGHOMSI • ARCHITECT OF THE DIGITAL VOID</div>
        <div className="flex gap-10">
          <span className="hover:text-accent-gold transition-colors cursor-pointer">LEGALS</span>
          <span className="hover:text-accent-gold transition-colors cursor-pointer">COLOPHON</span>
        </div>
      </footer>

      {/* Global Decor */}
      <div className="fixed top-0 right-1/4 w-[1px] h-screen bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-[1px] h-screen bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
}

export default App;
