import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, Mail, Heart, Terminal } from 'lucide-react';
import { PROFILE } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-border bg-panel/50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left — Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Terminal className="w-5 h-5 text-neon-green" />
            <div>
              <p className="text-sm font-bold text-gray-300">
                {PROFILE.name}
              </p>
              <p className="text-[10px] text-muted">{PROFILE.title}</p>
            </div>
          </motion.div>

          {/* Center — Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-4"
          >
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface border border-border text-muted hover:border-neon-green/40 hover:text-neon-green transition-all duration-200"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface border border-border text-muted hover:border-neon-blue/40 hover:text-neon-blue transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PROFILE.links.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface border border-border text-muted hover:border-neon-amber/40 hover:text-neon-amber transition-all duration-200"
              aria-label="LeetCode"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="p-2 rounded-lg bg-surface border border-border text-muted hover:border-neon-purple/40 hover:text-neon-purple transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right — Meta */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-[10px] text-muted flex items-center gap-1 justify-center md:justify-end">
              Built with <Heart className="w-3 h-3 text-neon-red" /> React +
              TypeScript + Framer Motion
            </p>
            <p className="text-[10px] text-muted/60 mt-1">
              &copy; {new Date().getFullYear()} {PROFILE.name} — All systems
              operational
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
