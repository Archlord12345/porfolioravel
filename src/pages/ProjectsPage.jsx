import React from 'react';
import ProjectSlider from '../components/ProjectSlider';

const ProjectsPage = () => (
  <section className="max-w-7xl mx-auto py-10">
    <div className="mb-8">
      <h2 className="text-4xl md:text-6xl font-black mb-3 gold-gradient">Projets</h2>
      <p className="text-secondary">Une sélection de dépôts GitHub et expérimentations publiées.</p>
    </div>
    <ProjectSlider />
  </section>
);

export default ProjectsPage;
