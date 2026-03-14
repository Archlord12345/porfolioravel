import React from 'react';
import { Code as Code2, Cpu, Bot, Zap, Database, Globe, Layers, Terminal, GitBranch, Smartphone } from 'lucide-react';

const TechIconsGrid = () => {
  const icons = [
    { Icon: Code2, label: 'Code', color: '#00ff88' },
    { Icon: Cpu, label: 'AI/ML', color: '#d4af37' },
    { Icon: Bot, label: 'Robotics', color: '#0088ff' },
    { Icon: Zap, label: 'Performance', color: '#ffff00' },
    { Icon: Database, label: 'Database', color: '#ff0088' },
    { Icon: Globe, label: 'Web', color: '#00ddff' },
    { Icon: Layers, label: 'Stack', color: '#d4af37' },
    { Icon: Terminal, label: 'CLI', color: '#00ff88' },
    { Icon: GitBranch, label: 'Version Control', color: '#0088ff' },
    { Icon: Smartphone, label: 'Mobile', color: '#ff9900' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
      {icons.map((item, idx) => {
        const Icon = item.Icon;
        return (
          <div
            key={idx}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-300 group cursor-default"
          >
            <div
              className="p-3 rounded-lg bg-white/[0.05] group-hover:bg-white/10 transition-all duration-300"
              style={{
                boxShadow: `0 0 15px ${item.color}22`,
              }}
            >
              <Icon
                size={24}
                style={{ color: item.color }}
                className="group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-secondary text-center uppercase tracking-widest">
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const FloatingTechBadge = ({ tech, index }) => {
  const colors = ['#d4af37', '#00ff88', '#0088ff', '#ff0088', '#ffff00', '#00ddff'];
  const color = colors[index % colors.length];

  return (
    <div
      className="absolute px-4 py-2 rounded-full bg-white/[0.05] border text-[11px] font-bold uppercase tracking-widest backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:scale-110 cursor-default"
      style={{
        borderColor: `${color}40`,
        color: color,
        animation: `float-${index} 6s ease-in-out infinite`,
      }}
    >
      {tech}
    </div>
  );
};

const TechBadgesSection = () => {
  const technologies = [
    'React',
    'Three.js',
    'Node.js',
    'Python',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'Git',
    'AWS',
  ];

  return (
    <>
      <style>{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(10px); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-25px) translateX(-15px); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-18px) translateX(20px); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-22px) translateX(-10px); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(15px); } }
        @keyframes float-5 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-24px) translateX(-20px); } }
        @keyframes float-6 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-19px) translateX(12px); } }
        @keyframes float-7 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-23px) translateX(-18px); } }
        @keyframes float-8 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-21px) translateX(18px); } }
        @keyframes float-9 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-25px) translateX(-12px); } }
        @keyframes float-10 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(16px); } }
        @keyframes float-11 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-22px) translateX(-14px); } }
      `}</style>

      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-8 flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-accent-gold via-transparent to-accent-gold" />

        <div className="relative w-full h-full flex items-center justify-center">
          {technologies.map((tech, idx) => (
            <FloatingTechBadge key={tech} tech={tech} index={idx} />
          ))}
        </div>
      </div>
    </>
  );
};

export { TechIconsGrid, TechBadgesSection };
