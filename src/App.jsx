import React from 'react';
import { Github, FileText } from 'lucide-react';
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
  { label: 'Présentation', route: '#/about' },
  { label: 'Projets', route: '#/projects' },
  { label: 'Contact', route: '#/contact' },
];

function App() {
  const [route, navigate] = useHashRoute();
  const CurrentPage = ROUTES[route] || HomePage;

  return (
    <div className="relative min-h-screen selection:bg-accent-gold/30 selection:text-white">
      <nav className="fixed top-0 w-full z-50 px-3 sm:px-4 md:px-6 py-3 md:py-4 flex justify-between items-center backdrop-blur-md bg-bg-dark/80 border-b border-white/10 shadow-lg">
        <button onClick={() => navigate('#/')} className="flex items-center gap-2 group touch-manipulation" aria-label="Aller à l'accueil">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-accent-gold flex items-center justify-center font-black text-bg-dark text-lg md:text-xl group-hover:rotate-12 transition-transform">
            R
          </div>
          <span className="font-orbitron font-bold tracking-tighter text-base md:text-xl hidden sm:block uppercase">RAVEL NGHOMSI</span>
        </button>

        <div className="flex gap-1.5 sm:gap-2 items-center text-[9px] sm:text-[10px] md:text-sm tracking-widest font-bold">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg md:rounded-xl border transition-all duration-300 touch-manipulation ${
                route === item.route
                  ? 'border-accent-gold/40 text-accent-gold bg-accent-gold/10 shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                  : 'border-white/10 bg-white/5 hover:text-accent-gold hover:border-white/20 text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="h-6 w-[1px] bg-white/10 mx-1 hidden md:block" />

          <a
            href="https://li-olivier.fr/CV_LI_Olivier.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-lg md:rounded-xl border border-accent-gold/40 text-accent-gold bg-accent-gold/5 hover:bg-accent-gold/20 transition-all duration-300 touch-manipulation"
          >
            <FileText size={16} className="hidden sm:block" />
            <span>CV</span>
          </a>

          <a
            href="https://github.com/Archlord12345"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 sm:p-2 glass-card hover:text-accent-gold transition-colors touch-manipulation"
            aria-label="Profil GitHub"
          >
            <Github size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
        </div>
      </nav>

      <main className="pt-20 sm:pt-24 md:pt-28 px-3 sm:px-4 md:px-6 pb-16 md:pb-20">
        <CurrentPage navigate={navigate} />
      </main>
    </div>
  );
}

export default App;
