# Codebase: Ravel 3D Portfolio

Ce fichier contient l'intégralité du code source du projet **Ravel 3D Portfolio**, un écosystème numérique immersif mettant en avant les compétences de Ravel Nghomsi.

---

## Configuration & Racine

### package.json
```json
{
  "name": "porfolioravel",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.5.0",
    "@types/three": "^0.183.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.35.2",
    "lucide-react": "^0.577.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "tailwind-merge": "^3.5.0",
    "three": "^0.183.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@tailwindcss/postcss": "^4.2.1",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "autoprefixer": "^10.4.27",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "postcss": "^8.5.8",
    "tailwindcss": "^4.2.1",
    "vite": "^8.0.0-beta.13"
  }
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
})
```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: {
                    gold: '#d4af37',
                    chrome: '#e5e4e2',
                },
                bg: {
                    dark: '#050505',
                },
                secondary: '#a0a0a0',
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
```

---

## Core Application

### src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### src/App.jsx
```javascript
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
```

### src/index.css
```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&family=Orbitron:wght@400;500;600;700;800;900&display=swap');

@theme {
  --color-accent-gold: #d4af37;
  --color-accent-gold-bright: #f9f295;
  --color-accent-chrome: #e5e4e2;
  --color-bg-dark: #050505;
  --color-bg-card: #0a0a0a;
  --color-secondary: #c5c5c5;

  --font-orbitron: "Orbitron", sans-serif;
  --font-inter: "Inter", sans-serif;
}

@layer base {
  :root {
    --bg-dark: #050505;
    --accent-gold: #d4af37;
    --accent-gold-rgb: 212, 175, 55;
    --accent-chrome: #e5e4e2;
    --text-primary: #ffffff;
    --text-secondary: #c5c5c5;
  }

  * {
    -webkit-tap-highlight-color: transparent;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg-dark text-white font-inter antialiased overflow-x-hidden selection:bg-accent-gold/30 selection:text-white;
    background-image:
      radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.03) 0%, transparent 40%);
    min-height: 100vh;
    min-height: 100dvh;
  }

  h1, h2, h3, h4, .font-heading {
    @apply font-orbitron tracking-tighter;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

@layer components {
  .glass-card {
    @apply relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-3xl transition-all duration-700 hover:bg-white/[0.04] hover:border-white/10;
  }

  .glass-card-gold {
    @apply relative overflow-hidden bg-white/[0.02] backdrop-blur-3xl border border-accent-gold/10 rounded-3xl transition-all duration-700 hover:bg-white/[0.04] hover:border-accent-gold/30 hover:shadow-[0_0_50px_-20px_rgba(212,175,55,0.2)];
  }

  .gold-gradient {
    background: linear-gradient(135deg, #d4af37 0%, #f9f295 50%, #d4af37 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0 2px 10px rgba(212, 175, 55, 0.2));
  }

  .btn-gold {
    @apply relative px-8 py-3 bg-gradient-to-r from-accent-gold to-[#f9f295] text-bg-dark font-black rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] active:scale-95;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.3);
  }

  .btn-outline {
    @apply px-8 py-3 border border-accent-gold/40 text-accent-gold font-bold rounded-2xl transition-all duration-300 backdrop-blur-sm hover:bg-accent-gold/10 hover:border-accent-gold hover:scale-[1.02] active:scale-95;
  }
}
```

---

## Données & Utilitaires

### src/data/profile.js
```javascript
export const profileData = {
  fullName: 'NGHOMSI FEUKOUO RAVEL',
  username: 'Archlord12345',
  title: 'Architecte Logiciel & Ingénieur IA • Fullstack Specialist',
  bio: "Expert en automatisation intelligente et architectures immersives. Fondateur de KERNEL FORGE, je repousse les limites du développement Fullstack en intégrant l'IA générative et la 3D interactive pour créer des écosystèmes numériques d'exception.",
  email: 'ravel.nghomsi@facsciences-uy1.cm',
  location: 'Yaoundé, Cameroun',
  skillsHierarchy: [
    {
      category: "IA & AUTOMATION",
      description: "Agents intelligents et workflows autonomes",
      skills: ["n8n Mastery", "LangChain", "Google GenKit", "Prompt Engineering", "OpenAI API", "Flowise"]
    },
    {
      category: "FRONTEND & DESIGN",
      description: "Interfaces haut de gamme et immersives",
      skills: ["React 18", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Responsive UI/UX"]
    },
    {
      category: "3D & VISUALS",
      description: "Expériences interactives spatiales",
      skills: ["Three.js", "React Three Fiber", "Spline Design", "3D Modeling", "Blender", "Shaders (GLSL)"]
    },
    {
      category: "BACKEND & CLOUD",
      description: "Infrastructures robustes et déploiement",
      skills: ["Node.js", "Express", "Firebase", "PostgreSQL", "Docker", "Vercel / Netlify", "Git / GitHub Actions"]
    }
  ],
  // ... (suite dans profile.js)
};
```

### src/utils/github.js
```javascript
const GITHUB_USERNAME = 'Archlord12345';
const GITHUB_HEADERS = { Accept: 'application/vnd.github+json' };

export const fetchTopRepos = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=12`, {
            headers: GITHUB_HEADERS,
        });
        const data = await response.json();
        return data.filter(repo => !repo.fork || repo.stargazers_count > 0).map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            language: repo.language,
            stars: repo.stargazers_count,
            topics: repo.topics || [],
        }));
    } catch (error) { return []; }
};

export const fetchProfile = async () => {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers: GITHUB_HEADERS });
        const data = await response.json();
        return {
            name: data.name || GITHUB_USERNAME,
            bio: data.bio,
            profileUrl: data.html_url,
            publicRepos: data.public_repos,
            followers: data.followers,
            location: data.location,
        };
    } catch (error) { return null; }
};
```

### src/utils/useHashRoute.js
```javascript
import { useEffect, useState } from 'react';

const DEFAULT_ROUTE = '#/';
const getRoute = () => window.location.hash || DEFAULT_ROUTE;

export const useHashRoute = () => {
  const [route, setRoute] = useState(getRoute);
  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  const navigate = (nextRoute) => {
    if (nextRoute !== route) window.location.hash = nextRoute;
  };
  return [route, navigate];
};
```

---

## Pages

### src/pages/HomePage.jsx
```javascript
import React, { useEffect, useState, useMemo } from 'react';
import { motion as Motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import SkillsTree from '../components/SkillsTree';
import TechSpline from '../components/TechSpline';
import { TechIconsGrid, TechBadgesSection } from '../components/TechIcons';
import { fetchProfile } from '../utils/github';
import { profileData } from '../data/profile';
import avatar from '../photo/ravel.png';

const HomePage = ({ navigate }) => {
  const [profile, setProfile] = useState(null);
  useEffect(() => { fetchProfile().then(setProfile); }, []);

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
      {/* ... structure Hero, Tech Universe, Skills ... */}
    </div>
  );
};

export default HomePage;
```

---

## Composants 3D & Immersifs

### src/components/Hero3D.jsx
```javascript
import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, Stars, PerspectiveCamera, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import avatar from '../photo/ravel.png';

const Sun = () => {
  const meshRef = useRef();
  const texture = useTexture(avatar);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
    const t = state.clock.getElapsedTime();
    const scale = 3 + Math.sin(t * 0.5) * 0.1;
    meshRef.current.scale.set(scale, scale, scale);
  });
  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} emissive="#d4af37" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// ... Planet and Meteorite components ...

const Hero3D = ({ skills, navigate }) => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050505]">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 15, 25]} />
        <Suspense fallback={null}>
          <Stars factor={6} />
          <SolarSystem skills={skills} navigate={navigate} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;
```

---

## Composants UI (Sélection)

### src/components/ui/button.tsx
```typescript
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:ring-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline: "border border-border bg-background hover:bg-muted",
        gold: "bg-accent-gold text-bg-dark hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]",
      }
    }
  }
)
```
