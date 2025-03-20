import React from 'react';
import { Github, ExternalLink, Database, Server, Code } from 'lucide-react';

const projects = [
  {
    title: 'Raseel Clinical System',
    description: 'A comprehensive clinical system for managing patient-doctor interactions, featuring authentication, appointment booking, and medical record management.',
    tech: ['Flask', 'Elasticsearch', 'Bootstrap', 'MySQL'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/AhmedShehab1/Raseel_Clinical_System',
    highlights: [
      'Role-based access control',
      'Elasticsearch-powered search',
      'Mobile-first architecture'
    ]
  },
  {
    title: 'Airbnb Clone',
    description: 'A full-stack clone of Airbnb with user authentication, search functionality, and booking features.',
    tech: ['Python', 'Flask', 'MySQL', 'jQuery'],
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/AhmedShehab1/AirBnB_clone_v4'
  },
  {
    title: 'File Manager API',
    description: 'A backend-focused application implementing authentication, file management, and image processing.',
    tech: ['Node.js', 'MongoDB', 'Redis', 'Docker'],
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/AhmedShehab1/alx-files_manager'
  },
  {
    title: 'Redis Clone',
    description: 'A lightweight Redis clone in Python, implementing core commands using OOP for extensibility.',
    tech: ['Python', 'OOP'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/AhmedShehab1/Redis_Clone'
  },
  {
    title: 'LittleLemon Restaurant',
    description: 'A dynamic web app for restaurant reservations using Django and DRF.',
    tech: ['Django', 'DRF', 'Docker', 'Swagger'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    github: 'https://github.com/MazenAtlam/LittleLemon',
    highlights: [
      'Menu browsing & booking system',
      'Djoser-based authentication',
      'Docker containerization'
    ]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">Featured Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                
                {project.highlights && (
                  <ul className="mb-4 space-y-1">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Code className="w-4 h-4 text-blue-600" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <Github className="w-5 h-5" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;