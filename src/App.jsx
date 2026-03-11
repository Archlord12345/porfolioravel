import React from 'react';
import { Github } from 'lucide-react';
import { useHashRoute } from './utils/useHashRoute';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

const ROUTES = {
  '#/': HomePage,
  '#/about': AboutPage,
  '#/projects': ProjectsPage,
  '#/contact': ContactPage,
};

const navItems = [
  { label: 'Accueil', route: '#/' },
  { label: 'À propos', route: '#/about' },
  { label: 'Projets', route: '#/projects' },
  { label: 'Contact', route: '#/contact' },
];

function App() {
  const [route, navigate] = useHashRoute();
  const CurrentPage = ROUTES[route] || HomePage;

  return (
    <div className="relative min-h-screen selection:bg-accent-gold/30 selection:text-white">
      <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 flex justify-between items-center backdrop-blur-md bg-bg-dark/50 border-b border-white/10">
        <button onClick={() => navigate('#/')} className="flex items-center gap-2 group" aria-label="Aller à l'accueil">
          <div className="w-10 h-10 rounded-lg bg-accent-gold flex items-center justify-center font-black text-bg-dark text-xl group-hover:rotate-12 transition-transform">
            R
          </div>
          <span className="font-orbitron font-bold tracking-tighter text-xl hidden md:block">RAVEL</span>
        </button>

        <div className="flex gap-2 items-center text-[10px] md:text-sm tracking-widest font-bold">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`px-3 py-2 rounded-xl border transition-colors ${route === item.route ? 'border-accent-gold/40 text-accent-gold bg-accent-gold/10' : 'border-white/10 bg-white/5 hover:text-accent-gold'}`}
            >
              {item.label}
            </button>
          ))}
          <a href="https://github.com/Archlord12345" target="_blank" rel="noopener noreferrer" className="p-2 glass-card hover:text-accent-gold transition-colors" aria-label="Profil GitHub">
            <Github size={18} />
          </a>
        </div>
      </nav>

      <main className="pt-24 md:pt-28 px-4 md:px-6 pb-20">
        <CurrentPage navigate={navigate} />
      </main>
    </div>
  );
}

export default App;
