import React from 'react';
import Typewriter from 'typewriter-effect';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import heroImage from '../assets/hero-img.jpg';

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="relative h-full w-full">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-blue-500 overflow-hidden">
            <img
              src={heroImage}
              alt="Ahmed Shehab"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">Ahmed Shehab</h1>
          <div className="text-3xl text-blue-400 mb-4">
            <Typewriter
              options={{
                strings: ['Backend Developer', 'Full-Stack Developer', 'Software Engineer'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <p className="text-xl text-gray-300 mb-8">Building Scalable & Efficient Systems</p>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a 
            href="https://github.com/AhmedShehab1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform"
          >
            <Github className="w-8 h-8" />
          </a>
          <a 
            href="https://linkedin.com/in/ahmed-shehab-engineering" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform"
          >
            <Linkedin className="w-8 h-8" />
          </a>
          <a 
            href="mailto:info@ahmedshehab.tech"
            className="transform hover:scale-110 transition-transform"
          >
            <Mail className="w-8 h-8" />
          </a>
          <a 
            href="https://leetcode.com/u/Ahmed_Abdelghafar/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform"
          >
            <Code2 className="w-8 h-8" />
          </a>
        </div>

        <div className="flex gap-4 justify-center">
          <a
            href="#projects"
            className="px-8 py-3 bg-blue-600 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors"
          >
            Let's Connect
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 animate-bounce">
        <a href="#about" className="text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;