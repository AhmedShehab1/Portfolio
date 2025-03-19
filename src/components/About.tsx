import React from 'react';
import { Code2, Database, Server, Shield, Book, Award } from 'lucide-react';

const technologies = {
  'Programming Languages': ['Python', 'JavaScript'],
  'Frameworks & Libraries': ['Django', 'Flask', 'Node.js', 'Frappe', 'Bootstrap', 'jQuery'],
  'DevOps & Tools': ['Nginx', 'Docker', 'HAProxy', 'Gunicorn', 'Git'],
  'Databases': ['MySQL', 'MongoDB', 'Redis', 'Elasticsearch']
};

const certifications = [
  'Meta Backend Developer Professional Certificate',
  'MongoDB Certified Developer',
  'ALX SE Graduate',
  'SQL Certificate - HackerRank',
  'English Certificate - EF SET'
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 dark:text-white">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Background</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              I'm a Backend Developer with a unique background in Biomedical Engineering from Cairo University.
              Through the ALX Software Engineering Program at Holberton School, I've developed expertise in
              building scalable systems and efficient backend solutions.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 dark:text-white">
                <Code2 className="w-5 h-5 text-blue-600" />
                <span>Clean Code</span>
              </div>
              <div className="flex items-center gap-2 dark:text-white">
                <Database className="w-5 h-5 text-blue-600" />
                <span>Database Design</span>
              </div>
              <div className="flex items-center gap-2 dark:text-white">
                <Server className="w-5 h-5 text-blue-600" />
                <span>System Architecture</span>
              </div>
              <div className="flex items-center gap-2 dark:text-white">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Security First</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-4 dark:text-white">Tech Stack</h3>
            {Object.entries(technologies).map(([category, techs]) => (
              <div key={category} className="mb-6">
                <h4 className="text-lg font-medium mb-2 dark:text-gray-300">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-8 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 dark:text-white">
            <Award className="w-6 h-6 text-blue-600" />
            Certifications & Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Book className="w-4 h-4 text-blue-600" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;